<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // ดึงรายการเบิกทั้งหมด
        $query = "SELECT b.*, u.username, e.name as equipment_name 
                  FROM borrow_requests b
                  LEFT JOIN users u ON b.user_id = u.id
                  LEFT JOIN equipment e ON b.equipment_id = e.id
                  ORDER BY b.id DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($items);
        break;

    case 'POST':
        // เพิ่มรายการเบิกใหม่
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->user_id) && !empty($data->equipment_id) && !empty($data->quantity)) {
            $query = "INSERT INTO borrow_requests (user_id, equipment_id, quantity, status, created_at) 
                      VALUES (:user_id, :equipment_id, :quantity, :status, NOW())";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':user_id', $data->user_id);
            $stmt->bindParam(':equipment_id', $data->equipment_id);
            $stmt->bindParam(':quantity', $data->quantity);
            $status = $data->status ?? 'pending';
            $stmt->bindParam(':status', $status);

            if ($stmt->execute()) {
                echo json_encode(["message" => "เพิ่มรายการเบิกเรียบร้อยแล้ว"]);
            } else {
                echo json_encode(["message" => "ไม่สามารถเพิ่มรายการได้"]);
            }
        }
        break;

    case 'PUT':
        // แก้ไขรายการเบิก
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->id)) {
            $query = "UPDATE borrow_requests 
                      SET equipment_id = :equipment_id, quantity = :quantity, status = :status 
                      WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':equipment_id', $data->equipment_id);
            $stmt->bindParam(':quantity', $data->quantity);
            $stmt->bindParam(':status', $data->status);
            $stmt->bindParam(':id', $data->id);

            if ($stmt->execute()) {
                echo json_encode(["message" => "อัปเดตรายการเรียบร้อยแล้ว"]);
            } else {
                echo json_encode(["message" => "ไม่สามารถแก้ไขรายการได้"]);
            }
        }
        break;

    case 'DELETE':
        // ลบรายการเบิก
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->id)) {
            $query = "DELETE FROM borrow_requests WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $data->id);

            if ($stmt->execute()) {
                echo json_encode(["message" => "ลบรายการเรียบร้อยแล้ว"]);
            } else {
                echo json_encode(["message" => "ไม่สามารถลบรายการได้"]);
            }
        }
        break;
}
?>