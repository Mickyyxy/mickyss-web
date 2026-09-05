<?php
// api/admin/category.php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM categories ORDER BY id ASC");
    echo json_encode(["success" => true, "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
} else if ($method === 'POST') {
    $input = json_decode(file_get_contents("php://input"));
    if (!empty($input->name)) {
        $stmt = $db->prepare("INSERT INTO categories (name) VALUES (:name)");
        $stmt->bindParam(':name', $input->name);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "เพิ่มหมวดหมู่สำเร็จ"]);
            exit();
        }
    }
    echo json_encode(["success" => false, "message" => "เกิดข้อผิดพลาด"]);
}
?>