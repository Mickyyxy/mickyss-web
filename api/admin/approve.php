<?php
// api/admin/approve.php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->request_id) && !empty($data->status)) { // status: 'approved' or 'rejected'
    $db->beginTransaction();
    try {
        $stmt = $db->prepare("UPDATE borrow_requests SET status = :status WHERE id = :id");
        $stmt->bindParam(":status", $data->status);
        $stmt->bindParam(":id", $data->request_id);
        $stmt->execute();

        // ตัดสต็อกอุปกรณ์กรณีอนุมัติ
        if($data->status === 'approved') {
            $updateStock = $db->prepare("UPDATE equipment SET quantity = quantity - 1 WHERE id = (SELECT equipment_id FROM borrow_requests WHERE id = :id)");
            $updateStock->bindParam(":id", $data->request_id);
            $updateStock->execute();
        }

        $db->commit();
        echo json_encode(["status" => true, "message" => "อัปเดตสถานะเรียบร้อยแล้ว"]);
    } catch (Exception $e) {
        $db->rollBack();
        http_response_code(500);
        echo json_encode(["status" => false, "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "ข้อมูลไม่ครบถ้วน"]);
}
?>