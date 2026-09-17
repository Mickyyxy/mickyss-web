<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/database.php';
$db = $conn;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $tables = $db->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
    if (!in_array('borrow_requests', $tables, true)) {
        echo json_encode(['status' => 'success', 'data' => []], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $columns = [];
    $columnStmt = $db->query('SHOW COLUMNS FROM borrow_requests');
    foreach ($columnStmt->fetchAll(PDO::FETCH_ASSOC) as $column) {
        $columns[$column['Field']] = true;
    }

    $quantityExpr = isset($columns['quantity']) ? 'COALESCE(b.quantity, 1)' : '1';
    $createdExpr = isset($columns['created_at']) ? 'b.created_at' : 'NULL';
    $purposeExpr = isset($columns['purpose']) ? 'b.purpose' : 'NULL';
    $equipmentIdExpr = isset($columns['equipment_id']) ? 'b.equipment_id' : 'NULL';

    $equipmentTable = null;
    if (in_array('equipment', $tables, true)) {
        $equipmentTable = 'equipment';
    } elseif (in_array('equipments', $tables, true)) {
        $equipmentTable = 'equipments';
    }

    $userJoin = in_array('users', $tables, true)
        ? 'LEFT JOIN users u ON u.id = b.user_id'
        : '';
    $userNameExpr = in_array('users', $tables, true)
        ? "COALESCE(u.name, u.username, '')"
        : "''";
    $equipmentJoin = ($equipmentTable && isset($columns['equipment_id']))
        ? "LEFT JOIN {$equipmentTable} e ON e.id = b.equipment_id"
        : '';
    $itemNameExpr = ($equipmentTable && isset($columns['equipment_id']))
        ? "COALESCE(e.name, 'พัสดุ/อุปกรณ์')"
        : "'พัสดุ/อุปกรณ์'";

    $sql = "
        SELECT
            b.id,
            b.user_id,
            $userNameExpr AS user_name,
            $equipmentIdExpr AS equipment_id,
            $itemNameExpr AS item_name,
            $quantityExpr AS quantity,
            b.status,
            $purposeExpr AS purpose,
            $createdExpr AS created_at
        FROM borrow_requests b
        $userJoin
        $equipmentJoin
        ORDER BY b.id DESC
    ";

    $rows = $db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['status' => 'success', 'data' => $rows], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'ไม่สามารถโหลดประวัติการเบิกสำหรับผู้ดูแลได้',
        'detail' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
