<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once "../config/database.php";

$userId = $_GET['user_id'] ?? null;

if (!$userId) {
    echo json_encode(["status" => "error", "message" => "ไม่พบรหัสผู้ใช้"]);
    exit;
}

$stmt = $conn->prepare("SELECT id, item_name, quantity, status, created_at FROM requisition_history WHERE user_id = ? ORDER BY created_at DESC");
$stmt->execute([$userId]);
$history = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["status" => "success", "data" => $history]);
?>