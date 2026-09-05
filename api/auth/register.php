<?php
// api/auth/register.php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    $checkQuery = "SELECT id FROM users WHERE email = :email LIMIT 1";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(":email", $data->email);
    $checkStmt->execute();

    if($checkStmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "อีเมลนี้ถูกใช้งานแล้ว"]);
        exit();
    }

    $query = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, 'user')";
    $stmt = $db->prepare($query);

    $password_hash = password_hash($data->password, PASSWORD_BCRYPT);

    $stmt->bindParam(":name", $data->name);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":password", $password_hash);

    if($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["status" => true, "message" => "สมัครสมาชิกสำเร็จ"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => false, "message" => "เกิดข้อผิดพลาดในการลงทะเบียน"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "ข้อมูลไม่ครบถ้วน"]);
}
?>