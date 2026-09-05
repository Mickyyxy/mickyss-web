<?php
// api/admin/users.php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$stmt = $db->query("SELECT id, name, email, phone, role, created_at FROM users ORDER BY id DESC");
echo json_encode(["success" => true, "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
?>