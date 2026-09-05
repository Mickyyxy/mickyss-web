# ระบบบริหารจัดการยืม-คืนอุปกรณ์ (Equipment Management System)

ระบบเว็บแอปพลิเคชันสำหรับการบริหารจัดการอุปกรณ์ อนุมัติการยืม-คืน และจัดการผู้ใช้งาน

## คุณสมบัติเด่น (Features)

*   **ระบบยืนยันตัวตน (Authentication):** รองรับการเข้าสู่ระบบและสมัครสมาชิก
*   **สำหรับผู้ใช้งานทั่วไป (User Section):**
    *   ตรวจสอบรายการอุปกรณ์และยืมอุปกรณ์
    *   ดูประวัติการยืม-คืนอุปกรณ์
    *   จัดการข้อมูลส่วนตัว[cite: 1]
*   **สำหรับผู้ดูแลระบบ (Admin Section):**
    *   หน้า Dashboard สรุปภาพรวมระบบ[cite: 1]
    *   อนุมัติคำขอยืม-คืน[cite: 1]
    *   จัดการข้อมูลอุปกรณ์และหมวดหมู่[cite: 1]
    *   จัดการข้อมูลผู้ใช้งาน[cite: 1]

## โครงสร้างระบบ (Tech Stack)

*   **Frontend:** React, Vite, Tailwind CSS / Lucide React[cite: 1]
*   **Backend:** PHP (RESTful API)[cite: 1]
*   **Database:** MySQL[cite: 1]
*   **Containerization:** Docker[cite: 1]

## การติดตั้งและรันระบบผ่าน Docker

1. Clone Repository นี้ลงเครื่อง local:
   ```bash
* git clone <URL_REPOSITORY_GITHUB>
* cd <ชื่อโฟลเดอร์โปรเจกต์>
## สั่งรันบริการผ่าน Docker Compose:

## Bash
* docker-compose up -d
* เข้าใช้งานระบบผ่านเบราว์เซอร์:

## URL: http://localhost:8080

## โครงสร้างไฟล์ API (API Endpoints)
* /api/auth/login.php - เข้าสู่ระบบ[cite: 1]
* /api/auth/register.php - สมัครสมาชิก[cite: 1]
* /api/user/borrow.php - ทำรายการยืมอุปกรณ์[cite: 1]
* /api/admin/approve.php - อนุมัติการยืมอุปกรณ์[cite: 1]
* /api/admin/equipment.php - จัดการข้อมูลอุปกรณ์[cite: 1]