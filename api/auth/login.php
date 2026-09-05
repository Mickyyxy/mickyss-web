<?php
// api/auth/login.php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->password)) {
    $query = "SELECT id, name, email, password, role FROM users WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $data->email);
    $stmt->execute();

    if($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if(password_verify($data->password, $row['password'])) {
            unset($row['password']);
            http_response_code(200);
            echo json_encode([
                "status" => true,
                "message" => "เข้าสู่ระบบสำเร็จ",
                "user" => $row
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["status" => false, "message" => "รหัสผ่านไม่ถูกต้อง"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["status" => false, "message" => "ไม่พบบัญชีผู้ใช้นี้"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "โปรดกรอกข้อมูลให้ครบถ้วน"]);
}
?>