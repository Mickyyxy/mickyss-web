<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");

require_once "../config/database.php";

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);
$userId = $_GET['user_id'] ?? $data['user_id'] ?? null;

if (!$userId) {
    echo json_encode(["status" => "error", "message" => "ไม่พบข้อมูลผู้ใช้"]);
    exit;
}

if ($method === 'GET') {
    $stmt = $conn->prepare("SELECT id, username, name, phone, department, role FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "data" => $user]);
} elseif ($method === 'POST') {
    $name       = trim($data['name'] ?? '');
    $phone      = trim($data['phone'] ?? '');
    $department = trim($data['department'] ?? '');
    $password   = trim($data['password'] ?? '');

    if (!empty($password)) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE users SET name = ?, phone = ?, department = ?, password = ? WHERE id = ?");
        $stmt->execute([$name, $phone, $department, $hashedPassword, $userId]);
    } else {
        $stmt = $conn->prepare("UPDATE users SET name = ?, phone = ?, department = ? WHERE id = ?");
        $stmt->execute([$name, $phone, $department, $userId]);
    }

    echo json_encode(["status" => "success", "message" => "อัปเดตข้อมูลเรียบร้อยแล้ว"]);
}
?>