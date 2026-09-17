<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../config/database.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$userId = $_GET['user_id'] ?? null;

if ($userId === null || $userId === '') {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ไม่พบรหัสผู้ใช้"], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    // ระบบเดิมใช้ requisition_history แต่รายการเบิกจริงของ API ถูกบันทึกไว้ใน borrow_requests
    // จึงอ่านจาก borrow_requests เป็นหลัก และรองรับทั้ง equipment / equipments
    $tableStmt = $conn->query("SHOW TABLES");
    $tables = $tableStmt->fetchAll(PDO::FETCH_COLUMN);

    if (!in_array('borrow_requests', $tables, true)) {
        echo json_encode([
            "status" => "success",
            "data" => [],
            "message" => "ยังไม่พบตารางรายการเบิก"
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $equipmentTable = null;
    if (in_array('equipment', $tables, true)) {
        $equipmentTable = 'equipment';
    } elseif (in_array('equipments', $tables, true)) {
        $equipmentTable = 'equipments';
    }

    // ตรวจสอบคอลัมน์ที่มีอยู่จริง เพื่อให้ endpoint ใช้ได้กับฐานข้อมูลรุ่นเดิม/รุ่นใหม่
    $columns = [];
    $columnStmt = $conn->query("SHOW COLUMNS FROM borrow_requests");
    foreach ($columnStmt->fetchAll(PDO::FETCH_ASSOC) as $column) {
        $columns[$column['Field']] = true;
    }

    $quantityExpr = isset($columns['quantity']) ? "COALESCE(b.quantity, 1)" : "1";
    $purposeExpr = isset($columns['purpose']) ? "b.purpose" : "NULL";
    $createdExpr = isset($columns['created_at']) ? "b.created_at" : "NULL";
    $startExpr = isset($columns['start_date']) ? "b.start_date" : "NULL";
    $endExpr = isset($columns['end_date']) ? "b.end_date" : "NULL";
    $equipmentIdExpr = isset($columns['equipment_id']) ? "b.equipment_id" : "NULL";
    $itemNameExpr = ($equipmentTable && isset($columns['equipment_id'])) ? "e.name" : "NULL";
    $equipmentJoin = ($equipmentTable && isset($columns['equipment_id']))
        ? "LEFT JOIN {$equipmentTable} e ON e.id = b.equipment_id"
        : "";

    $sql = "
        SELECT
            b.id,
            b.user_id,
            $equipmentIdExpr AS equipment_id,
            $quantityExpr AS quantity,
            b.status,
            $createdExpr AS created_at,
            $startExpr AS start_date,
            $endExpr AS end_date,
            $purposeExpr AS purpose,
            $itemNameExpr AS item_name
        FROM borrow_requests b
        $equipmentJoin
        WHERE b.user_id = ?
        ORDER BY b.id DESC
    ";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$userId]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $history = array_map(function ($row) {
        $date = $row['created_at'] ?: $row['start_date'] ?: $row['end_date'];

        return [
            "id" => $row['id'],
            "user_id" => $row['user_id'],
            "equipment_id" => $row['equipment_id'],
            "item_name" => $row['item_name'] ?: "พัสดุ/อุปกรณ์",
            "quantity" => (int)($row['quantity'] ?: 1),
            "status" => $row['status'] ?: "pending",
            "purpose" => $row['purpose'] ?: "",
            "created_at" => $row['created_at'],
            "date" => $date,
            "start_date" => $row['start_date'],
            "end_date" => $row['end_date']
        ];
    }, $rows);

    echo json_encode([
        "status" => "success",
        "data" => $history
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "ไม่สามารถดึงประวัติการเบิกได้",
        "detail" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
