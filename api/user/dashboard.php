<?php
// api/user/dashboard.php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT e.id, e.name, e.quantity as available_quantity, c.name as category_name 
          FROM equipments e 
          LEFT JOIN categories c ON e.category_id = c.id";
$stmt = $db->prepare($query);
$stmt->execute();

echo json_encode(["success" => true, "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
?>