<?php
// api/auth/logout.php
require_once '../config/database.php';
echo json_encode(["success" => true, "message" => "ออกจากระบบสำเร็จ"]);
?>