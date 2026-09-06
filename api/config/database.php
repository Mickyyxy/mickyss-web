<?php
// api/config/database.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class Database {
    private $host;
    private $port;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        // ดึงค่าจาก Environment Variables หากมี ถ้าไม่มีให้ใช้ค่า Default ของ Aiven
        $this->host = getenv('DB_HOST') ?: "mysql-ad1c1c5-mxckyr1-62ff.l.aivencloud.com";
        $this->port = getenv('DB_PORT') ?: "19408";
        $this->db_name = getenv('DB_NAME') ?: "defaultdb";
        $this->username = getenv('DB_USER') ?: "avnadmin";
        $this->password = getenv('DB_PASS') ?: "AVNS_UKv-67h3TnFLwPz-9F1";
    }

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name . ";charset=utf8mb4";
            
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::MYSQL_ATTR_SSL_CA => true,
                PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
            ];

            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            $this->conn->exec("set names utf8mb4");

        } catch(PDOException $exception) {
            http_response_code(500);
            echo json_encode(["status" => false, "message" => "Connection error: " . $exception->getMessage()]);
            exit();
        }
        return $this->conn;
    }
}

// ประกาศตัวแปร $conn สำหรับไฟล์ที่เรียกใช้โดยตรง
$database = new Database();
$conn = $database->getConnection();
?>