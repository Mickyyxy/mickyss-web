# ระบบบริหารจัดการยืม-คืนอุปกรณ์ (Equipment Management System)

ระบบเว็บแอปพลิเคชันสำหรับการบริหารจัดการอุปกรณ์ อนุมัติการยืม-คืน และจัดการผู้ใช้งาน

## คุณสมบัติเด่น (Features)

* **ระบบยืนยันตัวตน (Authentication):** รองรับการเข้าสู่ระบบและสมัครสมาชิก
* **สำหรับผู้ใช้งานทั่วไป (User Section):**
  * ตรวจสอบรายการอุปกรณ์และยืมอุปกรณ์
  * ดูประวัติการยืม-คืนอุปกรณ์
  * จัดการข้อมูลส่วนตัว
* **สำหรับผู้ดูแลระบบ (Admin Section):**
  * หน้า Dashboard สรุปภาพรวมระบบ
  * อนุมัติคำขอยืม-คืน
  * จัดการข้อมูลอุปกรณ์และหมวดหมู่
  * จัดการข้อมูลผู้ใช้งาน

## โครงสร้างระบบ (Tech Stack)

* **Frontend:** React (Vite), Tailwind CSS, Lucide React
* **Backend:** PHP (RESTful API)
* **Database:** MySQL (รองรับทั้ง Local XAMPP และ Cloud Aiven MySQL)

---

## ขั้นตอนการติดตั้งและการรันระบบอย่างละเอียด (Setup Guide)

### 1. สิ่งที่ต้องเตรียมก่อนติดตั้ง (Prerequisites)
1. **Node.js** (เวอร์ชัน 18 ขึ้นไป) -> [ดาวน์โหลดที่นี่](https://nodejs.org/)
2. **XAMPP** (สำหรับรัน Apache และ MySQL) -> [ดาวน์โหลดที่นี่](https://www.apachefriends.org/)
3. **Git** -> [ดาวน์โหลดที่นี่](https://git-scm.com/)

---

### 2. ดาวน์โหลดโปรเจกต์ (Clone Repository)
เปิด **Command Prompt / Terminal** ในโฟลเดอร์ `C:\xampp\htdocs\` แล้วรันคำสั่ง:
```bash
git clone <URL_REPOSITORY_GITHUB>
cd Mickyss1
