<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

require_once '../config/database.php'; // ปรับตาม path จริงของคุณ

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // ดึงรายการอุปกรณ์ พร้อมแสดงจำนวนคงเหลือ (Total - Borrowed)
        $query = "SELECT e.id, e.name, e.category_id, e.total_quantity,
                  (e.total_quantity - IFNULL(SUM(CASE WHEN b.status = 'approved' THEN b.amount ELSE 0 END), 0)) AS remaining_quantity
                  FROM equipments e
                  LEFT JOIN borrows b ON e.id = b.equipment_id
                  GROUP BY e.id";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["status" => "success", "data" => $data]);
        break;

    case 'POST':
        // เพิ่มรายการอุปกรณ์/เบิกใหม่
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO equipments (name, category_id, total_quantity) VALUES (:name, :category_id, :total_quantity)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':name', $data->name);
        $stmt->bindParam(':category_id', $data->category_id);
        $stmt->bindParam(':total_quantity', $data->total_quantity);
        if($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "เพิ่มรายการสำเร็จ"]);
        }
        break;

    case 'PUT':
        // แก้ไขรายการ
        $data = json_decode(file_get_contents("php://input"));
        $query = "UPDATE equipments SET name = :name, category_id = :category_id, total_quantity = :total_quantity WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $data->id);
        $stmt->bindParam(':name', $data->name);
        $stmt->bindParam(':category_id', $data->category_id);
        $stmt->bindParam(':total_quantity', $data->total_quantity);
        if($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "อัปเดตรายการสำเร็จ"]);
        }
        break;

    case 'DELETE':
        // ลบรายการ
        $id = $_GET['id'] ?? null;
        if($id) {
            $query = "DELETE FROM equipments WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            if($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "ลบรายการสำเร็จ"]);
            }
        }
        break;
}
?>