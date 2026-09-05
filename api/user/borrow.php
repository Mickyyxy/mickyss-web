<?php
// api/user/borrow.php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->user_id) && !empty($data->equipment_id) && !empty($data->start_date) && !empty($data->end_date)) {
    // ตรวจสอบจำนวนอุปกรณ์คงเหลือ
    $checkStmt = $db->prepare("SELECT quantity FROM equipment WHERE id = :id");
    $checkStmt->bindParam(":id", $data->equipment_id);
    $checkStmt->execute();
    $equip = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if(!$equip || $equip['quantity'] < 1) {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "อุปกรณ์ไม่เพียงพอ"]);
        exit();
    }

    $query = "INSERT INTO borrow_requests (user_id, equipment_id, start_date, end_date, status) VALUES (:user_id, :equipment_id, :start_date, :end_date, 'pending')";
    $stmt = $db->prepare($query);

    $stmt->bindParam(":user_id", $data->user_id);
    $stmt->bindParam(":equipment_id", $data->equipment_id);
    $stmt->bindParam(":start_date", $data->start_date);
    $stmt->bindParam(":end_date", $data->end_date);

    if($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["status" => true, "message" => "ส่งคำขอยืมอุปกรณ์เรียบร้อยแล้ว"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => false, "message" => "เกิดข้อผิดพลาดในการส่งคำขอ"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "ข้อมูลไม่ครบถ้วน"]);
}
?>