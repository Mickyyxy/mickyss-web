# ระบบบริหารจัดการการเบิกครุภัณฑ์ของวิทยาลัย
(The college's equipment requisition management system.)

คู่มือการติดตั้งและออกแบบสถาปัตยกรรมระบบบริหารจัดการการเบิกครุภัณฑ์และพัสดุของวิทยาลัย (College Equipment & Materials Requisition Management System) เพื่อให้เจ้าหน้าที่ อาจารย์ และผู้ดูแลระบบเข้าใจง่าย ใช้งานได้ทันที

1. ภาพรวมของระบบ (System Overview)ระบบนี้ถูกพัฒนาขึ้นเพื่อเปลี่ยนผ่านการเบิกพัสดุ/ครุภัณฑ์จากระบบกระดาษแบบเดิมมาสู่ Web Application ที่มีความทันสมัย ใช้งานง่าย มีอินเทอร์เฟซในรูปแบบ E-Commerce / TikTok Shop Style🌟 คุณสมบัติเด่น (Key Features):ฐานข้อมูลพัสดุมากกว่า 200 รายการ: รองรับการจัดหมวดหมู่อัตโนมัติ 7 หมวดหมู่หลัก (กาวและเทป, อุปกรณ์สำนักงาน, กระดาษและสมุด, เครื่องเขียนและหมึก, แม่บ้านและความสะอาด, ไฟฟ้าและไอที, งานทั่วไป)ระบบจัดกลุ่มสินค้าย่อยอัตโนมัติ (Smart Product Variants): ยุบรวมสินค้าประเภทเดียวกันที่มีหลายขนาด/รุ่น/สี ให้อยู่ในการ์ดสินค้าเดียว พร้อมปุ่มเลือกขนาดเพื่อความสะอาดตาการใช้งานแบบ
   
2.  สิทธิ์ผู้ใช้งาน (Roles & Permissions):อาจารย์ / ผู้ขอเบิก (Teacher/User): ค้นหาพัสดุ, เลือกตัวเลือก/จำนวน, ใส่ลงตะกร้า, กำหนดวัตถุประสงค์ และกดส่งคำขอเบิกเจ้าหน้าที่พัสดุ (Admin): อนุมัติ/ปฏิเสธคำขอเบิก (ระบบตัดสต็อกอัตโนมัติ), จัดการคลังสินค้า (เพิ่ม/แก้ไข/ลบ/แนบรูป), จัดการข้อมูลผู้ใช้งาน/เปลี่ยนรหัสผ่าน, ปรับเปลี่ยนตราสัญลักษณ์ประจำวิทยาลัย (College Logo)พิมพ์ใบเบิกพัสดุมาตรฐาน (Printable Requisition Form / PDF): พิมพ์ใบขอเบิกพัสดุที่มีรูปแบบถูกต้องตามระเบียบงานสารบรรณ/พัสดุของวิทยาลัย พร้อมช่องลงนามผู้ขอเบิกและผู้จ่ายพัสดุ2. โครงสร้างโปรเจกต์ (Project Structure)Plaintextcollege-inventory-system/
   
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx            # โค้ดหลักระบบบริหารจัดการเบิกครุภัณฑ์-พัสดุ
│   ├── main.jsx           # Entry point ของ React + Vite
│   └── index.css          # Styling & Global Fonts
├── index.html             # HTML Template (Google Fonts Prompt)
├── package.json           # Dependencies & Scripts
└── vite.config.js         # Vite Configuration

3. ความต้องการของระบบ (System Requirements)ก่อนเริ่มการติดตั้ง โปรดตรวจสอบว่าเครื่องคอมพิวเตอร์ของคุณติดตั้งซอฟต์แวร์ดังต่อไปนี้:Node.js: เวอร์ชัน 18.0.0 ขึ้นไป (แนะนำ v20.x LTS)Package Manager: npm (ติดตั้งมาพร้อม Node.js) หรือ pnpm / yarnWeb Browser: Google Chrome, Microsoft Edge, Safari หรือ Firefox4. ขั้นตอนการติดตั้งอย่างละเอียด (Step-by-Step Installation)

## ขั้นตอนที่ 1: สร้างโปรเจกต์ React ด้วย Viteเปิด Terminal / Command Prompt แล้วรันคำสั่งดังต่อไปนี้:Bash# สร้างโปรเจกต์ React ด้วย Vite
npm create vite@latest college-inventory-system -- --template react

# เข้าสู่โฟลเดอร์โปรเจกต์
cd college-inventory-system

# ขั้นตอนที่ 2: ติดตั้ง DependenciesBashnpm install

# ขั้นตอนที่ 3: ตั้งค่า ฟอนต์ภาษาไทย (Font Prompt)เปิดไฟล์ index.html แล้วนำโค้ดดึงฟอนต์ Google Fonts Prompt ไปวางในส่วน <head>:HTML<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

# ขั้นตอนที่ 4: นำโค้ด App.jsx ไปใช้งานเปิดไฟล์ src/App.jsx แล้วนำเนื้อหาโค้ดระบบทั้งหมดวางทดแทนไฟล์เดิมขั้นตอนที่ 5: เริ่มต้นใช้งานระบบ (Development Mode)Bashnpm run dev
ระบบจะแสดง URL บนหน้าจอ เช่น http://localhost:5173/ สามารถเปิดใช้งานผ่าน Web Browser ได้ทันที!5. บัญชีผู้ใช้งานเริ่มต้น (Default Login Accounts)สิทธิ์การใช้งาน (Role)รหัสประจำตัว (User Code)รหัสผ่าน (Password)หน้าที่และความสามารถเจ้าหน้าที่พัสดุ (Admin)A-0001adminpasswordอนุมัติคำขอ, ตัดสต็อก, จัดการคลังสินค้า, เพิ่ม/ลบผู้ใช้อาจารย์ / ผู้ขอเบิก (User)A1 (หรือรหัสที่เพิ่มใหม่)(เว้นว่างไว้)ค้นหาพัสดุ, เพิ่มใส่ตะกร้า, ส่งคำขอเบิก, ดูประวัติการเบิก6. การ Build และ Deployment สำหรับใช้งานจริง (Production)เมื่อต้องการนำระบบขึ้นไปติดตั้งใช้งานจริงบน Web Server (เช่น Nginx, Apache, Vercel, Netlify):Bash# รันคำสั่งสร้างไฟล์ Production Bundle
npm run build

ระบบจะสร้างโฟลเดอร์ dist/ ซึ่งบรรจุไฟล์ HTML/JS/CSS สแตติก สามารถนำไฟล์ภายในโฟลเดอร์นี้ไปอัปโหลดขึ้น Web Server ได้ทันที7. คำแนะนำสำหรับการตั้งค่าพิมพ์ใบเบิก (Print Settings Guidelines)เมื่อกดปุ่ม "สั่งพิมพ์เอกสาร / บันทึก PDF" ระบบจะจัดรูปแบบใบเบิกให้อยู่ในขนาด A4 โดยอัตโนมัติ สำหรับการพิมพ์ที่ได้คุณภาพสูงสุด แนะนำให้ตั้งค่าในเบราว์เซอร์ดังนี้:Paper Size (ขนาดกระดาษ): A4Margins (ระยะขอบ): Default หรือ NoneBackground Graphics (กราฟิกพื้นหลัง): ✅ เปิดใช้งาน (Checked)
