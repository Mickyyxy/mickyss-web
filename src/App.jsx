import React, { useState } from 'react';

// ==========================================
// RAW DATA: 200 ITEMS WITH STANDARDIZED VARIANT NAMES
// ==========================================
const initialInventory = [
  { id: 1, code: "พ101-01", name: "กระดาษกาวย่นม้วนใหญ่ (48*24)", category: "กาวและเทป", price: 36.66, stock: 15, icon: "🎞️", image: "" },
  { id: 2, code: "พ101-02", name: "กระดาษกาวย่นม้วนใหญ่ (36*24)", category: "กาวและเทป", price: 28.33, stock: 20, icon: "🎞️", image: "" },
  { id: 3, code: "พ102-01", name: "เทปใส (1/2 นิ้ว*36)", category: "กาวและเทป", price: 19, stock: 50, icon: "🎞️", image: "" },
  { id: 4, code: "พ102-02", name: "เทปใส (1นิ้ว 24*36)", category: "กาวและเทป", price: 33.33, stock: 30, icon: "🎞️", image: "" },
  { id: 5, code: "พ102-03", name: "เทปใส (OPP สีใส 2 นิ้ว 48*100)", category: "กาวและเทป", price: 35, stock: 40, icon: "🎞️", image: "" },
  { id: 6, code: "พ102-04", name: "เทปกาวสองหน้า (18*20 แบบบาง)", category: "กาวและเทป", price: 18, stock: 25, icon: "🎞️", image: "" },
  { id: 7, code: "พ102-05", name: "เทปโฟมกาวสองหน้า (21*3 แบบหนา)", category: "กาวและเทป", price: 145, stock: 10, icon: "🎞️", image: "" },
  { id: 8, code: "พ102-06", name: "เทปผ้ากาวม้วนใหญ่ (สี 36*9)", category: "กาวและเทป", price: 27, stock: 18, icon: "🎞️", image: "" },
  { id: 9, code: "พ102-07", name: "Label (A-1 ป้ายติดผนึก)", category: "กาวและเทป", price: 32, stock: 100, icon: "🏷️", image: "" },
  { id: 10, code: "พ102-08", name: "Label (A-15 ป้ายสติ๊กเกอร์)", category: "กาวและเทป", price: 32, stock: 100, icon: "🏷️", image: "" },
  { id: 11, code: "พ102-09", name: "ตาไก่พลาสติกติดแฟ้ม", category: "อุปกรณ์สำนักงาน", price: 19, stock: 60, icon: "📌", image: "" },
  { id: 12, code: "พ103-01", name: "แฟ้มโชว์เอกสารTOTO (A4 No.310)", category: "อุปกรณ์สำนักงาน", price: 28, stock: 35, icon: "📁", image: "" },
  { id: 13, code: "พ103-02", name: "แฟ้มกระดุม (A4)", category: "อุปกรณ์สำนักงาน", price: 8.75, stock: 80, icon: "📁", image: "" },
  { id: 14, code: "พ103-03", name: "แฟ้มซอง (สีขาว F4)", category: "อุปกรณ์สำนักงาน", price: 4.58, stock: 120, icon: "📁", image: "" },
  { id: 15, code: "พ104-01", name: "สติกเกอร์ (กระดาษขาวเนื้อด้าน A4)", category: "กาวและเทป", price: 105, stock: 15, icon: "🏷️", image: "" },
  { id: 16, code: "พ104-02", name: "สติกเกอร์ (พีวีซีใส A4)", category: "กาวและเทป", price: 2.1, stock: 200, icon: "🏷️", image: "" },
  { id: 17, code: "พ104-03", name: "สติกเกอร์ (สีเขียวอ่อน)", category: "กาวและเทป", price: 0, stock: 50, icon: "🏷️", image: "" },
  { id: 18, code: "พ104-04", name: "สติกเกอร์ (สีม่วง)", category: "กาวและเทป", price: 0, stock: 50, icon: "🏷️", image: "" },
  { id: 19, code: "พ104-05", name: "สติกเกอร์ (สีชมพู)", category: "กาวและเทป", price: 0, stock: 50, icon: "🏷️", image: "" },
  { id: 20, code: "พ104-06", name: "สติกเกอร์ (สีเขียวเรืองแสง)", category: "กาวและเทป", price: 0, stock: 50, icon: "🏷️", image: "" },
  { id: 21, code: "พ104-07", name: "สติกเกอร์ (สีฟ้า)", category: "กาวและเทป", price: 0, stock: 50, icon: "🏷️", image: "" },
  { id: 22, code: "พ105-01", name: "ลวดเย็บกระดาษ (T3-10 MB)", category: "อุปกรณ์สำนักงาน", price: 3.78, stock: 40, icon: "📎", image: "" },
  { id: 23, code: "พ105-02", name: "ลวดเย็บกระดาษ (1217FA-H)", category: "อุปกรณ์สำนักงาน", price: 17.5, stock: 30, icon: "📎", image: "" },
  { id: 24, code: "พ105-03", name: "ลวดเย็บกระดาษ (No.35-1M)", category: "อุปกรณ์สำนักงาน", price: 14.58, stock: 45, icon: "📎", image: "" },
  { id: 25, code: "พ105-04", name: "ลวดเย็บกระดาษ (1210 FA-H/ML)", category: "อุปกรณ์สำนักงาน", price: 13, stock: 25, icon: "📎", image: "" },
  { id: 26, code: "พ105-05", name: "ลวดเย็บกระดาษ (No.10-1M)", category: "อุปกรณ์สำนักงาน", price: 8.2, stock: 100, icon: "📎", image: "" },
  { id: 27, code: "พ105-06", name: "ลวดเสียบกระดาษกลม (No.1)", category: "อุปกรณ์สำนักงาน", price: 9.1, stock: 80, icon: "📎", image: "" },
  { id: 28, code: "พ105-07", name: "คลิปดำ (No.413-109MM)", category: "อุปกรณ์สำนักงาน", price: 3.5, stock: 60, icon: "📎", image: "" },
  { id: 29, code: "พ105-08", name: "คลิปดำ (No.E111-10MM)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 60, icon: "📎", image: "" },
  { id: 30, code: "พ105-09", name: "คลิปดำ (No.112-19MM)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 60, icon: "📎", image: "" },
  { id: 31, code: "พ105-10", name: "คลิปดำ (No.412-32MM)", category: "อุปกรณ์สำนักงาน", price: 2.25, stock: 60, icon: "📎", image: "" },
  { id: 32, code: "พ105-11", name: "คลิปดำ (No.414-108)", category: "อุปกรณ์สำนักงาน", price: 5.41, stock: 60, icon: "📎", image: "" },
  { id: 33, code: "พ105-12", name: "คลิปดำ (No.109)", category: "อุปกรณ์สำนักงาน", price: 3.91, stock: 60, icon: "📎", image: "" },
  { id: 34, code: "พ105-13", name: "คลิปดำ (H-108)", category: "อุปกรณ์สำนักงาน", price: 5.41, stock: 60, icon: "📎", image: "" },
  { id: 35, code: "พ105-14", name: "เครื่องเย็บกระดาษ (No.LE-45F)", category: "อุปกรณ์สำนักงาน", price: 390, stock: 5, icon: "✂️", image: "" },
  { id: 36, code: "พ105-15", name: "เครื่องเย็บกระดาษ (HD-10D)", category: "อุปกรณ์สำนักงาน", price: 175, stock: 12, icon: "✂️", image: "" },
  { id: 37, code: "พ105-16", name: "เครื่องยิงบอร์ด (TG-D)", category: "อุปกรณ์สำนักงาน", price: 1525, stock: 3, icon: "✂️", image: "" },
  { id: 38, code: "พ105-17", name: "เครื่องเจาะกระดาษ (No.100XL)", category: "อุปกรณ์สำนักงาน", price: 260, stock: 8, icon: "✂️", image: "" },
  { id: 39, code: "พ105-18", name: "เครื่องเจาะกระดาษ (DP-480)", category: "อุปกรณ์สำนักงาน", price: 78, stock: 10, icon: "✂️", image: "" },
  { id: 40, code: "พ105-19", name: "เครื่องเจาะกระดาษ (No.30N)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 5, icon: "✂️", image: "" },
  { id: 41, code: "พ105-20", name: "กาวแท่ง UHU", category: "กาวและเทป", price: 86.66, stock: 24, icon: "🧪", image: "" },
  { id: 42, code: "พ105-21", name: "กาวน้ำ TOA", category: "กาวและเทป", price: 14.58, stock: 30, icon: "🧪", image: "" },
  { id: 43, code: "พ105-22", name: "แท่นประทับตรา (สีน้ำเงิน No.2)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 10, icon: "📌", image: "" },
  { id: 44, code: "พ105-23", name: "แท่นประทับตรา (สีแดง No.2)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 10, icon: "📌", image: "" },
  { id: 45, code: "พ105-24", name: "ที่กั้นหนังสือ", category: "อุปกรณ์สำนักงาน", price: 0, stock: 15, icon: "📚", image: "" },
  { id: 46, code: "พ105-25", name: "ครีมนับธนบัตร", category: "อุปกรณ์สำนักงาน", price: 0, stock: 20, icon: "🧴", image: "" },
  { id: 47, code: "พ105-26", name: "ฟิวเจอร์บอร์ด", category: "อุปกรณ์สำนักงาน", price: 0, stock: 40, icon: "📐", image: "" },
  { id: 48, code: "พ105-27", name: "คลิบบอร์ดใส (A5)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 25, icon: "📋", image: "" },
  { id: 49, code: "พ105-28", name: "คลิบบอร์ดใส (F4)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 25, icon: "📋", image: "" },
  { id: 50, code: "พ105-29", name: "คลิบบอร์ดใส (A4)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 30, icon: "📋", image: "" },
  { id: 51, code: "พ105-30", name: "คลิบบอร์ดใส (R11)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 20, icon: "📋", image: "" },
  { id: 52, code: "พ105-31", name: "เหล็กเสียบบิล", category: "อุปกรณ์สำนักงาน", price: 0, stock: 15, icon: "📌", image: "" },
  { id: 53, code: "พ105-32", name: "ตรายางวันที่", category: "อุปกรณ์สำนักงาน", price: 0, stock: 8, icon: "🗓️", image: "" },
  { id: 54, code: "พ105-33", name: "ใบมีดคัตเตอร์ (ใหญ่ No.1845)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 50, icon: "🔪", image: "" },
  { id: 55, code: "พ105-34", name: "ใบมีดคัตเตอร์ (เล็ก ASB-10)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 50, icon: "🔪", image: "" },
  { id: 56, code: "พ105-35", name: "ใบมีดคัตเตอร์ (ปลายแหลม No.930)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 30, icon: "🔪", image: "" },
  { id: 57, code: "พ105-36", name: "มีดคัตเตอร์ (ใหญ่ No.R-1801)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 20, icon: "🔪", image: "" },
  { id: 58, code: "พ105-37", name: "มีดคัตเตอร์ (เล็ก NM-40)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 20, icon: "🔪", image: "" },
  { id: 59, code: "พ105-38", name: "เครื่องเหลาดินสอใหญ่ H-620", category: "อุปกรณ์สำนักงาน", price: 0, stock: 6, icon: "✏️", image: "" },
  { id: 60, code: "พ105-39", name: "แปรงลบกระดาน", category: "อุปกรณ์สำนักงาน", price: 0, stock: 30, icon: "🧹", image: "" },
  { id: 61, code: "พ105-40", name: "กรรไกร Size7", category: "อุปกรณ์สำนักงาน", price: 0, stock: 25, icon: "✂️", image: "" },
  { id: 62, code: "พ105-41", name: "ลิ้นแฟ้มพลาสติก (ORCA)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 100, icon: "📁", image: "" },
  { id: 63, code: "พ105-42", name: "ลิ้นแฟ้มพลาสติก (TRL-44P25)", category: "อุปกรณ์สำนักงาน", price: 0, stock: 100, icon: "📁", image: "" },
  { id: 64, code: "พ106-01", name: "กระดาษแฟ็ก 21*30", category: "กระดาษและสมุด", price: 0, stock: 10, icon: "📄", image: "" },
  { id: 65, code: "พ106-02", name: "กระดาษถ่ายเอกสาร (A4)", category: "กระดาษและสมุด", price: 82, stock: 150, icon: "📄", image: "" },
  { id: 66, code: "พ106-03", name: "กระดาษการ์ดสี A4 (สีชมพู)", category: "กระดาษและสมุด", price: 97, stock: 20, icon: "📄", image: "" },
  { id: 67, code: "พ106-04", name: "กระดาษการ์ดสี A4 (สีฟ้า)", category: "กระดาษและสมุด", price: 97, stock: 20, icon: "📄", image: "" },
  { id: 68, code: "พ106-05", name: "กระดาษการ์ดสี A4 (สีเหลือง)", category: "กระดาษและสมุด", price: 97, stock: 20, icon: "📄", image: "" },
  { id: 69, code: "พ106-06", name: "กระดาษการ์ดสี A4 (สีเขียว)", category: "กระดาษและสมุด", price: 97, stock: 20, icon: "📄", image: "" },
  { id: 70, code: "พ106-07", name: "กระดาษการ์ดสี A4 (สีครีม)", category: "กระดาษและสมุด", price: 97, stock: 20, icon: "📄", image: "" },
  { id: 71, code: "พ106-08", name: "กระดาษถ่ายเอกสาร (F4)", category: "กระดาษและสมุด", price: 155, stock: 40, icon: "📄", image: "" },
  { id: 72, code: "พ106-09", name: "กระดาษการ์ด F4 (สีฟ้า)", category: "กระดาษและสมุด", price: 140, stock: 15, icon: "📄", image: "" },
  { id: 73, code: "พ106-10", name: "กระดาษการ์ด F4 (สีชมพู)", category: "กระดาษและสมุด", price: 140, stock: 15, icon: "📄", image: "" },
  { id: 74, code: "พ106-11", name: "กระดาษการ์ด F4 (สีเขียว)", category: "กระดาษและสมุด", price: 140, stock: 15, icon: "📄", image: "" },
  { id: 75, code: "พ106-12", name: "กระดาษการ์ด F4 (สีเหลือง)", category: "กระดาษและสมุด", price: 140, stock: 15, icon: "📄", image: "" },
  { id: 76, code: "พ106-13", name: "กระดาษถ่ายเอกสาร (B4 ทำรบ.)", category: "กระดาษและสมุด", price: 0, stock: 10, icon: "📄", image: "" },
  { id: 77, code: "พ106-14", name: "กระดาษถ่ายเอกสาร (A5)", category: "กระดาษและสมุด", price: 0, stock: 30, icon: "📄", image: "" },
  { id: 78, code: "พ106-15", name: "กระดาษฟูลสแก้ป No.34", category: "กระดาษและสมุด", price: 250, stock: 12, icon: "📄", image: "" },
  { id: 79, code: "พ106-16", name: "กระดาษถ่ายเอกสารหัววท. (A4)", category: "กระดาษและสมุด", price: 750, stock: 25, icon: "📄", image: "" },
  { id: 80, code: "พ106-17", name: "กระดาษถ่ายเอกสารหัววท. (A5)", category: "กระดาษและสมุด", price: 0, stock: 15, icon: "📄", image: "" },
  { id: 81, code: "พ106-18", name: "กระดาษคำตอบ", category: "กระดาษและสมุด", price: 60, stock: 200, icon: "📝", image: "" },
  { id: 82, code: "พ106-19", name: "กระดาษ ต.2.ก.", category: "กระดาษและสมุด", price: 55, stock: 50, icon: "📝", image: "" },
  { id: 83, code: "พ106-20", name: "กระดาษไข JP-10M", category: "กระดาษและสมุด", price: 2996, stock: 4, icon: "📄", image: "" },
  { id: 84, code: "พ106-21", name: "กระดาษพิมพ์ภาพถ่ายแบบมันวาว A4", category: "กระดาษและสมุด", price: 0, stock: 10, icon: "🖼️", image: "" },
  { id: 85, code: "พ106-22", name: "กระดาษโรเนียว (K32)", category: "กระดาษและสมุด", price: 0, stock: 8, icon: "📄", image: "" },
  { id: 86, code: "พ106-23", name: "กระดาษโรเนียว (A85)", category: "กระดาษและสมุด", price: 0, stock: 8, icon: "📄", image: "" },
  { id: 87, code: "พ106-24", name: "กระดาษทำเกียรติบัตร", category: "กระดาษและสมุด", price: 550, stock: 15, icon: "📜", image: "" },
  { id: 88, code: "พ106-25", name: "กระดาษขาว 120G A4", category: "กระดาษและสมุด", price: 140, stock: 20, icon: "📄", image: "" },
  { id: 89, code: "พ106-26", name: "สมุดทะเบียน (ส่ง)", category: "กระดาษและสมุด", price: 50, stock: 10, icon: "📖", image: "" },
  { id: 90, code: "พ106-27", name: "สมุดทะเบียน (รับ)", category: "กระดาษและสมุด", price: 50, stock: 10, icon: "📖", image: "" },
  { id: 91, code: "พ106-28", name: "สมุดบันทึก5/50 (21*34)", category: "กระดาษและสมุด", price: 55, stock: 15, icon: "📖", image: "" },
  { id: 92, code: "พ106-29", name: "สมุดหมายเหตุรายวัน", category: "กระดาษและสมุด", price: 70, stock: 5, icon: "📖", image: "" },
  { id: 93, code: "พ106-30", name: "สมุดเสนอเซ็น", category: "กระดาษและสมุด", price: 155, stock: 8, icon: "📖", image: "" },
  { id: 94, code: "พ106-31", name: "บิลเงินสด No.3", category: "กระดาษและสมุด", price: 0, stock: 30, icon: "🧾", image: "" },
  { id: 95, code: "พ107-01", name: "ปากกาไวท์บอร์ดสีน้ำเงิน (ปากตัด)", category: "เครื่องเขียนและหมึก", price: 18, stock: 60, icon: "🖊️", image: "" },
  { id: 96, code: "พ107-02", name: "ปากกาไวท์บอร์ดสีน้ำเงิน (ปากแหลม)", category: "เครื่องเขียนและหมึก", price: 18, stock: 60, icon: "🖊️", image: "" },
  { id: 97, code: "พ107-03", name: "ปากกาเมจิกด้ามเล็กสีดำ", category: "เครื่องเขียนและหมึก", price: 0, stock: 40, icon: "🖊️", image: "" },
  { id: 98, code: "พ107-04", name: "ปากกาไฮไลท์ (เน้นข้อความ)", category: "เครื่องเขียนและหมึก", price: 0, stock: 50, icon: "🖊️", image: "" },
  { id: 99, code: "พ107-05", name: "ปากกาดำหมึกซึม", category: "เครื่องเขียนและหมึก", price: 32, stock: 30, icon: "🖊️", image: "" },
  { id: 100, code: "พ107-06", name: "ปากกาหมึกเจลสีดำ BL80", category: "เครื่องเขียนและหมึก", price: 0, stock: 40, icon: "🖊️", image: "" },
  { id: 101, code: "พ107-07", name: "ปากกายูนิบอล UB-157", category: "เครื่องเขียนและหมึก", price: 0, stock: 40, icon: "🖊️", image: "" },
  { id: 102, code: "พ107-08", name: "ปากกาลบคำผิด (ลิควิด)", category: "เครื่องเขียนและหมึก", price: 42.5, stock: 35, icon: "✏️", image: "" },
  { id: 103, code: "พ107-09", name: "ปากกาลูกลื่นสีน้ำเงิน", category: "เครื่องเขียนและหมึก", price: 0, stock: 120, icon: "🖊️", image: "" },
  { id: 104, code: "พ108-01", name: "น้ำหมึกเติมปากกาไวท์บอร์ด (สีน้ำเงิน)", category: "เครื่องเขียนและหมึก", price: 55, stock: 20, icon: "🧪", image: "" },
  { id: 105, code: "พ108-02", name: "น้ำหมึกเติมปากกาไวท์บอร์ด (สีแดง)", category: "เครื่องเขียนและหมึก", price: 55, stock: 15, icon: "🧪", image: "" },
  { id: 106, code: "พ108-03", name: "หมึกเติมแท่นประทับตรา (สีน้ำเงิน)", category: "เครื่องเขียนและหมึก", price: 0, stock: 10, icon: "🧪", image: "" },
  { id: 107, code: "พ108-04", name: "หมึกเติมแท่นประทับตรา (สีแดง)", category: "เครื่องเขียนและหมึก", price: 0, stock: 10, icon: "🧪", image: "" },
  { id: 108, code: "พ108-05", name: "หมึกเติมแท่นประทับตรา (สีดำ)", category: "เครื่องเขียนและหมึก", price: 0, stock: 10, icon: "🧪", image: "" },
  { id: 109, code: "พ108-06", name: "DRUM (2355)", category: "เครื่องเขียนและหมึก", price: 0, stock: 3, icon: "🖨️", image: "" },
  { id: 110, code: "พ108-07", name: "DRUM (2455)", category: "เครื่องเขียนและหมึก", price: 0, stock: 3, icon: "🖨️", image: "" },
  { id: 111, code: "พ108-08", name: "หมึก 85A CB435A", category: "เครื่องเขียนและหมึก", price: 650, stock: 8, icon: "🖨️", image: "" },
  { id: 112, code: "พ108-09", name: "หมึก OKI C310dn/C510dn (สีดำ)", category: "เครื่องเขียนและหมึก", price: 1290, stock: 5, icon: "🖨️", image: "" },
  { id: 113, code: "พ108-10", name: "หมึก OKI C310dn/C510dn (สีรวม)", category: "เครื่องเขียนและหมึก", price: 2290, stock: 4, icon: "🖨️", image: "" },
  { id: 114, code: "พ108-11", name: "หมึก OKI B412/B512", category: "เครื่องเขียนและหมึก", price: 3700, stock: 3, icon: "🖨️", image: "" },
  { id: 115, code: "พ108-12", name: "หมึก Canon 054 (BK,C,M,Y ห้องผู้จัดการ)", category: "เครื่องเขียนและหมึก", price: 2890, stock: 2, icon: "🖨️", image: "" },
  { id: 116, code: "พ108-13", name: "หมึก Brother (TN2380 บัญชี)", category: "เครื่องเขียนและหมึก", price: 750, stock: 6, icon: "🖨️", image: "" },
  { id: 117, code: "พ108-14", name: "หมึก Brother (TN 2480 ฝ่ายวิชาการ)", category: "เครื่องเขียนและหมึก", price: 790, stock: 6, icon: "🖨️", image: "" },
  { id: 118, code: "พ108-15", name: "หมึก OKI ES5112/ES5162 (ฝ่ายทั่วไป)", category: "เครื่องเขียนและหมึก", price: 4300, stock: 2, icon: "🖨️", image: "" },
  { id: 119, code: "พ108-16", name: "หมึก RICOH (JP-12)", category: "เครื่องเขียนและหมึก", price: 2940, stock: 3, icon: "🖨️", image: "" },
  { id: 120, code: "พ108-17", name: "หมึก RICOH (MP2501S)", category: "เครื่องเขียนและหมึก", price: 535, stock: 5, icon: "🖨️", image: "" },
  { id: 121, code: "พ108-18", name: "หมึกดำ LION", category: "เครื่องเขียนและหมึก", price: 0, stock: 10, icon: "🧪", image: "" },
  { id: 122, code: "พ108-19", name: "หมึก Canon 071 (Original)", category: "เครื่องเขียนและหมึก", price: 1980, stock: 4, icon: "🖨️", image: "" },
  { id: 123, code: "พ108-20", name: "หมึก Canon 071 (รุ่นธรรมดา)", category: "เครื่องเขียนและหมึก", price: 790, stock: 8, icon: "🖨️", image: "" },
  { id: 124, code: "พ108-21", name: "หมึก Canon 325", category: "เครื่องเขียนและหมึก", price: 2000, stock: 5, icon: "🖨️", image: "" },
  { id: 125, code: "พ109-01", name: "เทปลบ Excel-lift-off (ขนาดใหญ่)", category: "กาวและเทป", price: 190, stock: 12, icon: "🎞️", image: "" },
  { id: 126, code: "พ109-02", name: "เทปลบ Excel-lift-off (ขนาดเล็ก)", category: "กาวและเทป", price: 190, stock: 12, icon: "🎞️", image: "" },
  { id: 127, code: "พ110-01", name: "เชือกฟาง", category: "งานทั่วไป", price: 45, stock: 20, icon: "🧶", image: "" },
  { id: 128, code: "พ110-02", name: "เชือกขาวแดง", category: "งานทั่วไป", price: 40, stock: 20, icon: "🧶", image: "" },
  { id: 129, code: "พ110-03", name: "แสตมป์", category: "งานทั่วไป", price: 0, stock: 100, icon: "✉️", image: "" },
  { id: 130, code: "พ111-01", name: "ซองน้ำตาลหัว วท. (A4)", category: "กระดาษและสมุด", price: 4, stock: 150, icon: "✉️", image: "" },
  { id: 131, code: "พ111-02", name: "ซองขยายข้างใส่ข้อสอบ", category: "กระดาษและสมุด", price: 0, stock: 80, icon: "✉️", image: "" },
  { id: 132, code: "พ111-03", name: "ซองน้ำตาลหัว วท. (F4)", category: "กระดาษและสมุด", price: 0, stock: 100, icon: "✉️", image: "" },
  { id: 133, code: "พ111-04", name: "ซองขาวเบอร์9/100", category: "กระดาษและสมุด", price: 0, stock: 200, icon: "✉️", image: "" },
  { id: 134, code: "พ111-05", name: "ซองจดหมายหัว วท. 125AA", category: "กระดาษและสมุด", price: 1.8, stock: 300, icon: "✉️", image: "" },
  { id: 135, code: "พ111-06", name: "ซองถนอมเอกสาร 11 รู A4", category: "กระดาษและสมุด", price: 13.4, stock: 90, icon: "📁", image: "" },
  { id: 136, code: "พ112-01", name: "ถ่านแมงกานีส (AAA R03NT/2SL)", category: "ไฟฟ้าและไอที", price: 28.66, stock: 40, icon: "🔋", image: "" },
  { id: 137, code: "พ112-02", name: "ถ่านแมงกานีส (AA R6NT/4SL)", category: "ไฟฟ้าและไอที", price: 57.33, stock: 40, icon: "🔋", image: "" },
  { id: 138, code: "พ112-03", name: "ถ่านแมงกานีส (C R14Nt/2SL)", category: "ไฟฟ้าและไอที", price: 31.8, stock: 20, icon: "🔋", image: "" },
  { id: 139, code: "พ112-04", name: "ถ่านแมงกานีส (AA R6GT/4SL)", category: "ไฟฟ้าและไอที", price: 0, stock: 30, icon: "🔋", image: "" },
  { id: 140, code: "พ112-05", name: "ถ่านอัลคาไลน์ (AA LR6T/4B)", category: "ไฟฟ้าและไอที", price: 0, stock: 30, icon: "🔋", image: "" },
  { id: 141, code: "พ113-01", name: "ผงซักฟอก", category: "แม่บ้านและความสะอาด", price: 35, stock: 25, icon: "🧹", image: "" },
  { id: 142, code: "พ113-02", name: "ถังขยะมีฝาปิดใบใหญ่", category: "แม่บ้านและความสะอาด", price: 270, stock: 8, icon: "🗑️", image: "" },
  { id: 143, code: "พ113-03", name: "ลูกเหม็นก้อนใหญ่", category: "แม่บ้านและความสะอาด", price: 0, stock: 15, icon: "🧼", image: "" },
  { id: 144, code: "พ113-04", name: "อะไหร่ผ้าถูพื้น+ไม้ถูพื้น", category: "แม่บ้านและความสะอาด", price: 182, stock: 10, icon: "🧹", image: "" },
  { id: 145, code: "พ113-05", name: "น้ำยาล้างห้องน้ำ", category: "แม่บ้านและความสะอาด", price: 38, stock: 30, icon: "🧴", image: "" },
  { id: 146, code: "พ113-06", name: "น้ำยาล้างจาน", category: "แม่บ้านและความสะอาด", price: 13.66, stock: 40, icon: "🧴", image: "" },
  { id: 147, code: "พ113-07", name: "น้ำยาเช็ดกระจก", category: "แม่บ้านและความสะอาด", price: 115, stock: 15, icon: "🧴", image: "" },
  { id: 148, code: "พ113-08", name: "น้ำยาทำความสะอาดฆ่าเชื้อ", category: "แม่บ้านและความสะอาด", price: 155, stock: 12, icon: "🧴", image: "" },
  { id: 149, code: "พ113-09", name: "สบู่เหลวล้างมือ", category: "แม่บ้านและความสะอาด", price: 109, stock: 20, icon: "🧴", image: "" },
  { id: 150, code: "พ113-10", name: "น้ำยาเช็ดเฟอร์นิเจอร์", category: "แม่บ้านและความสะอาด", price: 0, stock: 10, icon: "🧴", image: "" },
  { id: 151, code: "พ113-11", name: "ไม้ปัดฝุ่นขนไก่", category: "แม่บ้านและความสะอาด", price: 0, stock: 15, icon: "🧹", image: "" },
  { id: 152, code: "พ113-12", name: "ไม้กวาดก้านมะพร้าว", category: "แม่บ้านและความสะอาด", price: 27, stock: 20, icon: "🧹", image: "" },
  { id: 153, code: "พ113-13", name: "ไม้กวาดน้ำด้ามยาว", category: "แม่บ้านและความสะอาด", price: 275, stock: 8, icon: "🧹", image: "" },
  { id: 154, code: "พ113-14", name: "ไม้กวาดอีซีคลีน", category: "แม่บ้านและความสะอาด", price: 0, stock: 10, icon: "🧹", image: "" },
  { id: 155, code: "พ113-15", name: "แปรงล้างห้องน้ำ", category: "แม่บ้านและความสะอาด", price: 30, stock: 15, icon: "🧹", image: "" },
  { id: 156, code: "พ113-16", name: "แปรงขัดพื้นด้ามยาว", category: "แม่บ้านและความสะอาด", price: 87, stock: 10, icon: "🧹", image: "" },
  { id: 157, code: "พ113-17", name: "ที่โกยขยะ", category: "แม่บ้านและความสะอาด", price: 90, stock: 15, icon: "🧹", image: "" },
  { id: 158, code: "พ113-18", name: "สเปร์ปรับอากาศ", category: "แม่บ้านและความสะอาด", price: 54, stock: 18, icon: "🧴", image: "" },
  { id: 159, code: "พ113-19", name: "สก๊อตช์ไบตร์ใหญ่", category: "แม่บ้านและความสะอาด", price: 12, stock: 50, icon: "🧽", image: "" },
  { id: 160, code: "พ113-20", name: "ถุงดำ (32*40)", category: "แม่บ้านและความสะอาด", price: 35, stock: 40, icon: "🗑️", image: "" },
  { id: 161, code: "พ113-21", name: "ถุงดำ (30*40)", category: "แม่บ้านและความสะอาด", price: 35, stock: 40, icon: "🗑️", image: "" },
  { id: 162, code: "พ113-22", name: "ถุงดำ (20*24)", category: "แม่บ้านและความสะอาด", price: 27.83, stock: 50, icon: "🗑️", image: "" },
  { id: 163, code: "พ113-23", name: "ถุงดำ (18*21)", category: "แม่บ้านและความสะอาด", price: 0, stock: 50, icon: "🗑️", image: "" },
  { id: 164, code: "พ113-24", name: "ถุงมือส้ม", category: "แม่บ้านและความสะอาด", price: 26.67, stock: 30, icon: "🧤", image: "" },
  { id: 165, code: "พ113-25", name: "ถังน้ำใบเล็กมีหู", category: "แม่บ้านและความสะอาด", price: 35, stock: 15, icon: "🪣", image: "" },
  { id: 166, code: "พ113-26", name: "ขันน้ำไม่มีด้ามจับ", category: "แม่บ้านและความสะอาด", price: 22, stock: 20, icon: "🪣", image: "" },
  { id: 167, code: "พ113-27", name: "ไม้กวาดดอกหญ้า", category: "แม่บ้านและความสะอาด", price: 42, stock: 25, icon: "🧹", image: "" },
  { id: 168, code: "พ113-28", name: "ถังขยะในห้องน้ำ", category: "แม่บ้านและความสะอาด", price: 214, stock: 10, icon: "🗑️", image: "" },
  { id: 169, code: "พ113-29", name: "รองเท้าบูท", category: "แม่บ้านและความสะอาด", price: 140, stock: 8, icon: "👢", image: "" },
  { id: 170, code: "พ113-30", name: "สเปร์ปรับอากาศเดทตอล", category: "แม่บ้านและความสะอาด", price: 140, stock: 12, icon: "🧴", image: "" },
  { id: 171, code: "พ113-31", name: "ไบกอน สเปรย์กำจัดยุง", category: "แม่บ้านและความสะอาด", price: 0, stock: 15, icon: "🧴", image: "" },
  { id: 172, code: "พ113-32", name: "กระบอกฉีดน้ำ", category: "แม่บ้านและความสะอาด", price: 0, stock: 20, icon: "🧴", image: "" },
  { id: 173, code: "พ113-33", name: "ไม้ม็อบฝุ่น 24 นิ้ว", category: "แม่บ้านและความสะอาด", price: 0, stock: 8, icon: "🧹", image: "" },
  { id: 174, code: "พ113-34", name: "เกลดเซ็นท์เต็ดเจล", category: "แม่บ้านและความสะอาด", price: 0, stock: 15, icon: "🧴", image: "" },
  { id: 175, code: "พ113-35", name: "ฝอยเหล็ก", category: "แม่บ้านและความสะอาด", price: 0, stock: 30, icon: "🧽", image: "" },
  { id: 176, code: "พ114-01", name: "หลอดไฟ (ขนาดเล็ก)", category: "ไฟฟ้าและไอที", price: 33, stock: 25, icon: "💡", image: "" },
  { id: 177, code: "พ114-02", name: "หลอดไฟ (ขนาดยาว)", category: "ไฟฟ้าและไอที", price: 0, stock: 20, icon: "💡", image: "" },
  { id: 178, code: "พ114-03", name: "ที่ตั้งบูท", category: "งานทั่วไป", price: 0, stock: 4, icon: "🎪", image: "" },
  { id: 179, code: "พ114-04", name: "ปลั๊กไฟ (ยาว 5 เมตร)", category: "ไฟฟ้าและไอที", price: 195, stock: 10, icon: "🔌", image: "" },
  { id: 180, code: "พ114-05", name: "ปลั๊กไฟ (ยาว 3 เมตร)", category: "ไฟฟ้าและไอที", price: 177, stock: 12, icon: "🔌", image: "" },
  { id: 181, code: "พ114-06", name: "โทรศัพท์ไร้สาย", category: "ไฟฟ้าและไอที", price: 1812, stock: 3, icon: "📞", image: "" },
  { id: 182, code: "พ114-07", name: "แผ่น CD-R52X", category: "ไฟฟ้าและไอที", price: 0, stock: 50, icon: "💿", image: "" },
  { id: 183, code: "พ114-08", name: "แผ่น DVD-R16X", category: "ไฟฟ้าและไอที", price: 0, stock: 50, icon: "💿", image: "" },
  { id: 184, code: "พ114-09", name: "ซองใส่แผ่น CD-DVD", category: "ไฟฟ้าและไอที", price: 0, stock: 100, icon: "📁", image: "" },
  { id: 185, code: "พ115-01", name: "สายเคเบิ้ลไทร์ (6 นิ้ว)", category: "งานทั่วไป", price: 0.3, stock: 500, icon: "🔗", image: "" },
  { id: 186, code: "พ115-02", name: "สายเคเบิ้ลไทร์ (12 นิ้ว)", category: "งานทั่วไป", price: 0.65, stock: 300, icon: "🔗", image: "" },
  { id: 187, code: "พ115-03", name: "สายเคเบิ้ลไทร์ (14 นิ้ว)", category: "งานทั่วไป", price: 0.7, stock: 300, icon: "🔗", image: "" },
  { id: 188, code: "พ115-04", name: "น้ำยาทำความสะอาดกระดานไวท์บอร์ด", category: "แม่บ้านและความสะอาด", price: 0, stock: 12, icon: "🧴", image: "" },
  { id: 189, code: "พ115-05", name: "ธงชาติ (120*180 ซม.)", category: "งานทั่วไป", price: 110, stock: 5, icon: "🚩", image: "" },
  { id: 190, code: "พ115-06", name: "ธงชาติ (4*110 ซม.)", category: "งานทั่วไป", price: 0, stock: 10, icon: "🚩", image: "" },
  { id: 191, code: "พ115-07", name: "โบว์รางวัล (สีชมพู)", category: "งานทั่วไป", price: 0, stock: 30, icon: "🎗️", image: "" },
  { id: 192, code: "พ115-08", name: "โบว์รางวัล (สีน้ำเงิน)", category: "งานทั่วไป", price: 0, stock: 30, icon: "🎗️", image: "" },
  { id: 193, code: "พ115-09", name: "เป็กทองเหลือง 2 ขา", category: "อุปกรณ์สำนักงาน", price: 0, stock: 40, icon: "📌", image: "" },
  { id: 194, code: "พ115-10", name: "นาฬิกาแขวน", category: "งานทั่วไป", price: 0, stock: 6, icon: "⏰", image: "" },
  { id: 195, code: "พ115-11", name: "พลาสติกเคลือบบัตร", category: "กระดาษและสมุด", price: 0, stock: 25, icon: "📄", image: "" },
  { id: 196, code: "พ115-12", name: "เหล็กเจาะข้อสอบ", category: "อุปกรณ์สำนักงาน", price: 15, stock: 10, icon: "📌", image: "" },
  { id: 197, code: "พ115-13", name: "ปกอะซิเตรทสีใส A4 (แผ่นใสปกรายงาน)", category: "กระดาษและสมุด", price: 0, stock: 40, icon: "📄", image: "" },
  { id: 198, code: "พ115-14", name: "สันรูด 17มม.", category: "อุปกรณ์สำนักงาน", price: 15, stock: 50, icon: "📁", image: "" },
  { id: 199, code: "พ115-15", name: "พวงกุญแจ BN-08", category: "งานทั่วไป", price: 135, stock: 15, icon: "🔑", image: "" },
  { id: 200, code: "พ115-16", name: "กระดาษโน๊ตกาว 50*15", category: "กระดาษและสมุด", price: 18, stock: 60, icon: "📝", image: "" },
];

const CATEGORIES_LIST = [
  'กาวและเทป',
  'อุปกรณ์สำนักงาน',
  'กระดาษและสมุด',
  'เครื่องเขียนและหมึก',
  'แม่บ้านและความสะอาด',
  'ไฟฟ้าและไอที',
  'งานทั่วไป'
];

const DEPARTMENTS = [
  "สาขาการบัญชี",
  "สาขาการตลาด",
  "สาขาภาษาต่างประเทศธุรกิจบริหาร",
  "สาขาภาษาและการจัดการธุรกิจระหว่างประเทศ",
  "สาขาโลจิสติกส์",
  "สาขาการจัดการโลจิสติกส์และซัพพลายเชน",
  "สาขาดิจิทัลกราฟิก",
  "สาขาเทคโนโลยีสารสนเทศ",
  "สาขาเทคโนโลยีธุรกิจดิจิทัล",
  "สาขาการท่องเที่ยว",
  "สาขาการจัดการธุรกิจค้าปลีก"
];

// Helper Function: ดึงข้อความในวงเล็บมารวมเป็นกลุ่มสินค้าเดียวกันแบบอัตโนมัติ
const groupInventoryByProduct = (items) => {
  const groups = {};

  items.forEach((item) => {
    let baseName = item.name.trim();
    let variantName = "รุ่นมาตรฐาน";

    const parenMatch = item.name.match(/^(.*?)\s*[\(（](.*?)[\)）]\s*(.*)$/);
    if (parenMatch) {
      const part1 = parenMatch[1].trim();
      const variant = parenMatch[2].trim();
      const part3 = parenMatch[3].trim();
      
      baseName = (part1 + (part3 ? " " + part3 : "")).trim();
      variantName = variant;
    }

    if (!groups[baseName]) {
      groups[baseName] = {
        baseName,
        category: item.category,
        icon: item.icon,
        image: item.image,
        variants: [],
      };
    }

    if (item.image && !groups[baseName].image) {
      groups[baseName].image = item.image;
    }

    groups[baseName].variants.push({
      ...item,
      variantName,
    });
  });

  return Object.values(groups);
};

// Helper สำหรับการแสดงผลตราวิทยาลัย
const renderCollegeLogo = (logo, size = '22px') => {
  if (!logo) return <span style={{ fontSize: size }}>🏛️</span>;
  if (logo.startsWith('http://') || logo.startsWith('https://') || logo.startsWith('data:image/')) {
    return (
      <img
        src={logo}
        alt="ตราวิทยาลัย"
        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }}
      />
    );
  }
  return <span style={{ fontSize: size }}>{logo}</span>;
};

// ==========================================
// ENHANCED VIBRANT UI STYLES
// ==========================================
const uiStyles = {
  fullScreenCenter: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f4f9',
    backgroundImage: `
      radial-gradient(circle at 15% 20%, rgba(56, 189, 248, 0.25) 0%, transparent 40%),
      radial-gradient(circle at 85% 80%, rgba(244, 114, 182, 0.25) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)
    `,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fullPageWrapper: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f8fafc',
    backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.08), transparent 50%)',
    color: '#334155',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  authBox: {
    width: '90%',
    maxWidth: '430px',
    background: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '28px',
    padding: '40px 36px',
    boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
    maxHeight: '92vh',
    overflowY: 'auto',
    animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  brandHeader: { textAlign: 'center', marginBottom: '28px' },
  largeLogo: {
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #0284c7 0%, #ec4899 100%)',
    color: '#ffffff',
    borderRadius: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    boxShadow: '0 12px 24px -6px rgba(236, 72, 153, 0.4)',
    overflow: 'hidden',
    padding: '4px'
  },
  authTitle: { margin: '16px 0 0 0', fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  authTabs: { display: 'flex', background: '#f1f5f9', padding: '5px', borderRadius: '16px', marginBottom: '24px' },
  authTabBtn: { flex: 1, padding: '10px', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' },
  formStack: { display: 'flex', flexDirection: 'column', gap: '18px' },
  label: { display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: '#ffffff',
    border: '1.5px solid #e2e8f0',
    borderRadius: '12px',
    color: '#0f172a',
    fontSize: '13px',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  submitBtn: {
    width: '100%',
    padding: '13px',
    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(2, 132, 199, 0.35)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  navbar: {
    height: '72px',
    padding: '0 32px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.03)',
    zIndex: 10,
    position: 'relative',
  },
  navLogo: {
    width: '44px',
    height: '44px',
    background: 'linear-gradient(135deg, #38bdf8 0%, #ec4899 100%)',
    color: '#ffffff',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)',
    overflow: 'hidden',
    padding: '3px'
  },
  navTitle: { margin: 0, fontSize: '18px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.3px' },
  navSubTitle: { fontSize: '12px', color: '#0284c7', fontWeight: '700' },
  navCartBtn: {
    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '0 16px',
    height: '44px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
    transition: 'all 0.2s ease',
  },
  burgerBtn: {
    background: '#ffffff',
    border: '1.5px solid #e2e8f0',
    color: '#0f172a',
    width: '44px',
    height: '44px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease',
    position: 'relative'
  },
  burgerMenu: {
    position: 'absolute',
    top: '56px',
    right: 0,
    width: '240px',
    background: '#ffffff',
    borderRadius: '20px',
    padding: '16px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    animation: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  menuItemBtn: {
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  },
  cartBadge: { background: '#ec4899', color: '#ffffff', borderRadius: '12px', padding: '2px 8px', fontSize: '11px', fontWeight: 'bold', boxShadow: '0 2px 6px rgba(236, 72, 153, 0.4)' },
  mainContainer: {
    flex: 1,
    padding: '28px 32px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  heroBanner: {
    padding: '24px 32px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #e0f2fe 0%, #fce7f3 50%, #f3e8ff 100%)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    marginBottom: '28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 10px 30px -10px rgba(56, 189, 248, 0.2)',
    flexWrap: 'wrap',
    gap: '16px'
  },
  searchInput: { flex: 1, minWidth: '260px', padding: '12px 20px', background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', color: '#0f172a', outline: 'none', fontSize: '13px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', transition: 'all 0.2s ease' },
  equipmentGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '22px' },
  equipmentCard: {
    background: '#ffffff',
    border: '1px solid #f1f5f9',
    borderRadius: '20px',
    padding: '22px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '260px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
    overflow: 'hidden'
  },
  codeBadge: { fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '4px 10px', borderRadius: '8px', fontWeight: '700' },
  cardFooter: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f8fafc' },
  qtyControl: { display: 'flex', alignItems: 'center', gap: '6px' },
  qtyBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#0f172a', width: '28px', height: '28px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
  primaryBtn: { background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '9px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)', transition: 'all 0.2s ease' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' },
  statCard: { background: '#ffffff', border: '1px solid #f1f5f9', padding: '22px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)', transition: 'all 0.2s ease' },
  iconBadge: { width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' },
  tabGroup: { display: 'flex', gap: '6px', background: '#f1f5f9', padding: '5px', borderRadius: '16px' },
  tabBtn: { padding: '9px 20px', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' },
  tableCard: { background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '28px', overflowX: 'auto', boxShadow: '0 6px 24px rgba(0,0,0,0.02)' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  thRow: { borderBottom: '2px solid #f1f5f9' },
  th: { padding: '14px 16px', color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' },
  tr: { borderBottom: '1px solid #f8fafc', transition: 'background-color 0.15s ease' },
  td: { padding: '16px', fontSize: '13px' },
  approveBtn: { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)' },
  rejectBtn: { background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 2px 8px rgba(244, 63, 94, 0.3)' },
  printBtn: { background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)' },
  editBtn: { background: '#f8fafc', color: '#475569', border: '1.5px solid #e2e8f0', padding: '7px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' },
  deleteBtn: { background: '#fff1f2', color: '#e11d48', border: '1.5px solid #fecdd3', padding: '7px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'fadeIn 0.2s ease' },
  modalContent: { width: '90%', maxWidth: '480px', background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '32px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)' },
  cartDrawer: { position: 'fixed', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: '420px', background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(16px)', height: '100%', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #e2e8f0', zIndex: 300, boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)' },
  drawerHeader: { padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' },
  toast: {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: '#ffffff',
    padding: '16px 24px',
    borderRadius: '16px',
    boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
    zIndex: 999,
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderLeft: '5px solid #ec4899',
    animation: 'slideUp 0.3s ease'
  }
};

// ==========================================
// HELPER COMPONENTS
// ==========================================
const StockBadge = ({ stock }) => {
  let bgColor = '#dcfce7';
  let textColor = '#15803d';
  let label = `คงเหลือ: ${stock}`;

  if (stock <= 0) {
    bgColor = '#fce7f3';
    textColor = '#be185d';
    label = 'สินค้าหมด';
  } else if (stock <= 10) {
    bgColor = '#fef3c7';
    textColor = '#b45309';
    label = `เหลือน้อย: ${stock}`;
  }

  return (
    <span style={{
      padding: '5px 12px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '800',
      backgroundColor: bgColor,
      color: textColor,
      display: 'inline-block'
    }}>
      {label}
    </span>
  );
};

const StatCard = ({ title, value, unit, icon, color = '#0284c7' }) => (
  <div style={uiStyles.statCard} className="hover-card">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: '700' }}>{title}</p>
        <h3 style={{ margin: '8px 0 0 0', fontSize: '28px', color: '#0f172a', fontWeight: '800' }}>
          {value} <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>{unit}</span>
        </h3>
      </div>
      <div style={{ ...uiStyles.iconBadge, background: '#f0f9ff', color: color }}>{icon}</div>
    </div>
  </div>
);

// การ์ดแสดงผลสินค้าพร้อมตัวเลือกขนาด/ชนิด สไตล์ TikTok Shop
const TikTokProductCard = ({ productGroup, cart, onAddToCart }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectQty, setSelectQty] = useState(1);

  const activeVariant = productGroup.variants[selectedVariantIndex] || productGroup.variants[0];
  const isOutOfStock = activeVariant.stock <= 0;

  const countInCart = cart
    .filter((c) => c.id === activeVariant.id)
    .reduce((sum, item) => sum + item.qty, 0);

  const handleIncrement = () => {
    if (selectQty < activeVariant.stock) {
      setSelectQty((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (selectQty > 1) {
      setSelectQty((prev) => prev - 1);
    }
  };

  const handleAdd = () => {
    onAddToCart(activeVariant, selectQty);
    setSelectQty(1);
  };

  const currentImage = activeVariant.image || productGroup.image;

  return (
    <div style={{ ...uiStyles.equipmentCard, opacity: isOutOfStock ? 0.75 : 1 }} className="hover-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {currentImage ? (
          <img
            src={currentImage}
            alt={productGroup.baseName}
            style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '14px', border: '1px solid #e2e8f0' }}
          />
        ) : (
          <span style={{ fontSize: '36px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>{productGroup.icon}</span>
        )}
        <span style={uiStyles.codeBadge}>{activeVariant.code}</span>
      </div>

      <div style={{ marginTop: '14px' }}>
        <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '14px', fontWeight: '700', lineHeight: '1.4' }}>
          {productGroup.baseName}
        </h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>
          <span style={{ fontWeight: '500' }}>{productGroup.category}</span>
          <StockBadge stock={activeVariant.stock} />
        </div>

        {productGroup.variants.length > 1 && (
          <div style={{ marginTop: '8px', marginBottom: '10px' }}>
            <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: '700', marginBottom: '6px' }}>
              ⚡ เลือกตัวเลือก / ขนาด:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {productGroup.variants.map((variant, idx) => {
                const isSelected = idx === selectedVariantIndex;
                return (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariantIndex(idx);
                      setSelectQty(1);
                    }}
                    style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      border: isSelected ? '1.5px solid #0284c7' : '1px solid #cbd5e1',
                      background: isSelected ? '#e0f2fe' : '#ffffff',
                      color: isSelected ? '#0284c7' : '#475569',
                      boxShadow: isSelected ? '0 2px 6px rgba(2, 132, 199, 0.2)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {variant.variantName}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div style={uiStyles.cardFooter}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            ราคา/หน่วย: <strong style={{ color: '#0f172a', fontSize: '13px' }}>{activeVariant.price > 0 ? `${activeVariant.price} ฿` : 'ไม่ระบุ'}</strong>
          </div>
          {countInCart > 0 && (
            <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: '700' }}>ในตะกร้า: {countInCart}</span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '8px' }}>
          <div style={uiStyles.qtyControl}>
            <button onClick={handleDecrement} disabled={isOutOfStock || selectQty <= 1} style={uiStyles.qtyBtn}>-</button>
            <input
              type="number"
              min="1"
              max={activeVariant.stock}
              value={isOutOfStock ? 0 : selectQty}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setSelectQty(Math.max(1, Math.min(activeVariant.stock, val)));
              }}
              disabled={isOutOfStock}
              style={{
                width: '45px',
                textAlign: 'center',
                padding: '4px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            />
            <button onClick={handleIncrement} disabled={isOutOfStock || selectQty >= activeVariant.stock} style={uiStyles.qtyBtn}>+</button>
          </div>

          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            style={{
              ...uiStyles.primaryBtn,
              flex: 1,
              background: isOutOfStock ? '#cbd5e1' : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
              boxShadow: isOutOfStock ? 'none' : uiStyles.primaryBtn.boxShadow
            }}
          >
            {isOutOfStock ? 'หมด' : `+ เพิ่มลงตะกร้า`}
          </button>
        </div>
      </div>
    </div>
  );
};

// คอมโพเนนต์สำหรับแสดงเอกสารสั่งพิมพ์ / ออก PDF
const PrintableReceipt = ({ request, onClose }) => {
  const formatThaiDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!request) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{ background: '#fff', color: '#000', width: '210mm', minHeight: '297mm', padding: '20mm', borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', overflowY: 'auto', maxHeight: '90vh' }} id="printableArea">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>ใบขอเบิกพัสดุ / วัสดุอุปกรณ์</h2>
          <p style={{ margin: '5px 0', fontSize: '14px', fontWeight: 'bold' }}>วิทยาลัยเทคโนโลยีอุดมศึกษาพณิชยการ</p>
          <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>เลขที่เอกสาร: REQ-{request.id}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '13px' }}>
          <div>
            <div><strong>ชื่อผู้ขอเบิก:</strong> {request.teacherName || request.fullname}</div>
            <div><strong>แผนกวิชา:</strong> {request.department || DEPARTMENTS[0]}</div>
            <div><strong>เบอร์โทรศัพท์:</strong> {request.phone || '-'}</div>
          </div>
          <div><strong>วันที่ขอเบิก:</strong> {formatThaiDate(request.date || request.created_at)}</div>
        </div>

        <div style={{ marginBottom: '20px', fontSize: '13px' }}>
          <strong>วัตถุประสงค์ในการนำไปใช้:</strong> {request.purpose || '-'}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', fontSize: '12px' }}>
          <thead>
            <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #000' }}>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center', width: '50px' }}>ลำดับ</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>รายการพัสดุ</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center', width: '80px' }}>จำนวน</th>
            </tr>
          </thead>
          <tbody>
            {request.items && request.items.length > 0 ? (
              request.items.map((it, idx) => (
                <tr key={idx}>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{idx + 1}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{it.name || it.equipment_name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{it.qty}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>1</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{request.equipment_name || 'พัสดุ'}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{request.qty || 1}</td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '60px', textAlign: 'center', fontSize: '12px' }}>
          <div>
            <p>ลงชื่อ......................................................ผู้ขอเบิก</p>
            <p>({request.teacherName || request.fullname})</p>
            <p>ตำแหน่ง: ครูประจำวิชา ({request.department || DEPARTMENTS[0]})</p>
          </div>
          <div>
            <p>ลงชื่อ......................................................ผู้จ่ายพัสดุ</p>
            <p>(เจ้าหน้าที่งานพัสดุ)</p>
            <p>วันที่ ........../..................../..........</p>
          </div>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }} className="no-print">
          <button onClick={() => window.print()} style={{ border: 'none', padding: '10px 20px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🖨️ สั่งพิมพ์เอกสาร / บันทึก PDF</button>
          <button onClick={onClose} style={{ border: '1px solid #ccc', padding: '10px 20px', background: '#fff', color: '#333', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>ปิดหน้าต่าง</button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [inventory, setInventory] = useState(initialInventory);
  
  // State ตราวิทยาลัย
  const [collegeLogo, setCollegeLogo] = useState('🏛️');
  const [logoInput, setLogoInput] = useState('');

  const [users, setUsers] = useState([
    { id: 'A1', password: '', name: 'อ.สมชาย ใจดี', role: 'teacher', phone: '081-999-8888', department: DEPARTMENTS[7] },
    { id: 'A-0001', password: 'adminpassword', name: 'เจ้าหน้าที่งานพัสดุ', role: 'admin', phone: '089-111-2222', department: 'งานพัสดุ' },
  ]);

  const [authMode, setAuthMode] = useState('login');
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regId, setRegId] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState('teacher');
  const [regPhone, setRegPhone] = useState('');
  const [regDept, setRegDept] = useState(DEPARTMENTS[0]);

  const [adminTab, setAdminTab] = useState('requests');
  const [editingUser, setEditingUser] = useState(null);
  const [originalUserId, setOriginalUserId] = useState('');
  
  const [editingItem, setEditingItem] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [purpose, setPurpose] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [search, setSearch] = useState('');

  const [notification, setNotification] = useState(null);
  const [selectedPrintRequest, setSelectedPrintRequest] = useState(null);

  const [requests, setRequests] = useState([
    {
      id: 101,
      teacherName: 'อ.สมชาย ใจดี',
      department: DEPARTMENTS[7],
      phone: '081-999-8888',
      purpose: 'ใช้สำหรับการเรียนการสอนวิชาการจัดการสำนักงาน',
      items: [{ id: 65, name: 'กระดาษถ่ายเอกสาร (A4)', qty: 2 }, { id: 95, name: 'ปากกาไวท์บอร์ดสีน้ำเงิน (ปากตัด)', qty: 5 }],
      date: '2026-08-07',
      status: 'pending',
    }
  ]);

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.id === loginId && u.password === loginPassword);
    if (user) {
      setCurrentUser(user);
      setLoginId('');
      setLoginPassword('');
    } else {
      alert('รหัสประจำตัวหรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regId || !regPassword || !regName || !regPhone) return alert('กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง');
    if (users.some((u) => u.id === regId)) return alert('รหัสประจำตัวนี้มีในระบบแล้ว!');

    const newUser = {
      id: regId,
      password: regPassword,
      name: regName,
      role: regRole,
      phone: regPhone,
      department: regDept,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    alert('สมัครสมาชิกสำเร็จ! ระบบพาคุณเข้าสู่ระบบโดยอัตโนมัติ');
    setCurrentUser(newUser);

    setRegId('');
    setRegPassword('');
    setRegName('');
    setRegPhone('');
    setRegDept(DEPARTMENTS[0]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setIsCartOpen(false);
    setIsBurgerOpen(false);
    setIsHistoryModalOpen(false);
  };

  const handleOpenUserEdit = (user) => {
    setEditingUser({ ...user });
    setOriginalUserId(user.id);
    setIsBurgerOpen(false);
  };

  const handleSaveUserEdit = (e) => {
    e.preventDefault();
    if (!editingUser.id.trim()) {
      return alert('กรุณากรอกรหัสประจำตัว');
    }

    const isDuplicate = users.some(u => u.id === editingUser.id && u.id !== originalUserId);
    if (isDuplicate) {
      return alert('รหัสประจำตัวนี้มีผู้อื่นใช้งานแล้ว!');
    }

    setUsers(users.map((u) => (u.id === originalUserId ? editingUser : u)));
    
    if (currentUser && currentUser.id === originalUserId) {
      setCurrentUser(editingUser);
    }

    setEditingUser(null);
    setOriginalUserId('');
    triggerNotification('✏️ อัปเดตข้อมูลผู้ใช้เรียบร้อยแล้ว!');
  };

  const handleAddNewItem = () => {
    setIsNewItem(true);
    setEditingItem({
      id: Date.now(),
      code: `พ${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}`,
      name: '',
      category: CATEGORIES_LIST[0],
      price: 0,
      stock: 10,
      icon: '📦',
      image: ''
    });
  };

  const handleEditItem = (item) => {
    setIsNewItem(false);
    setEditingItem({ ...item });
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('คุณต้องการลบรายการพัสดุนี้ใช่หรือไม่?')) {
      setInventory(inventory.filter(i => i.id !== itemId));
      triggerNotification('🗑️ ลบรายการพัสดุเรียบร้อยแล้ว');
    }
  };

  const handleItemImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveItemEdit = (e) => {
    e.preventDefault();
    if (!editingItem.name.trim()) return alert('กรุณาระบุชื่อพัสดุ');

    const updatedItem = {
      ...editingItem,
      price: parseFloat(editingItem.price) || 0,
      stock: parseInt(editingItem.stock, 10) || 0
    };

    if (isNewItem) {
      setInventory([updatedItem, ...inventory]);
      triggerNotification('✨ เพิ่มรายการพัสดุใหม่เรียบร้อยแล้ว!');
    } else {
      setInventory(inventory.map((item) => (item.id === editingItem.id ? updatedItem : item)));
      triggerNotification('🖼️ อัปเดตข้อมูลและแนบรูปภาพพัสดุเรียบร้อยแล้ว!');
    }

    setEditingItem(null);
    setIsNewItem(false);
  };

  const handleLogoFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCollegeLogo(reader.result);
        triggerNotification('🏛️ อัปเดตตราวิทยาลัยเรียบร้อยแล้ว!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLogoUrl = () => {
    if (logoInput.trim()) {
      setCollegeLogo(logoInput.trim());
      setLogoInput('');
      triggerNotification('🏛️ อัปเดตตราวิทยาลัยเรียบร้อยแล้ว!');
    }
  };

  const addToCart = (item, quantityToAdd = 1) => {
    if (item.stock <= 0) return alert('พัสดุรายการนี้หมดแล้ว!');
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      const currentQty = existing ? existing.qty : 0;
      if (currentQty + quantityToAdd > item.stock) {
        alert(`เบิกได้ไม่เกินจำนวนคงเหลือที่มี (${item.stock} ชิ้น)`);
        return prev;
      }
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + quantityToAdd } : c));
      }
      return [...prev, { ...item, qty: quantityToAdd }];
    });
    triggerNotification(`🛒 เพิ่ม ${item.name} (${quantityToAdd} ชิ้น) ลงในตะกร้าแล้ว`);
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const targetItem = inventory.find((i) => i.id === id);
          const newQty = item.qty + delta;
          if (newQty > targetItem.stock) {
            alert(`สินค้ามีคงเหลือในสต็อกเพียง ${targetItem.stock} ชิ้น`);
            return item;
          }
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const handleCheckoutCart = () => {
    if (!purpose.trim()) return alert('กรุณาระบุวัตถุประสงค์การนำไปใช้');
    const newRequest = {
      id: Date.now(),
      teacherName: currentUser.name,
      department: currentUser.department || DEPARTMENTS[0],
      phone: currentUser.phone || '-',
      purpose,
      items: cart.map((c) => ({ id: c.id, name: c.name, qty: c.qty })),
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setRequests([newRequest, ...requests]);
    setCart([]);
    setPurpose('');
    setIsCartOpen(false);
    triggerNotification(`📩 ส่งคำขอเบิกแล้ว! แจ้งเตือนไปยังงานพัสดุเรียบร้อย`);
  };

  const handleApproveRequest = (req) => {
    for (let item of req.items) {
      const stockItem = inventory.find((inv) => inv.id === item.id);
      if (!stockItem || stockItem.stock < item.qty) {
        alert(`❌ ไม่สามารถอนุมัติได้: พัสดุ "${item.name}" มีคงเหลือในคลังไม่พอ!`);
        return;
      }
    }

    setInventory((prevInv) =>
      prevInv.map((inv) => {
        const reqItem = req.items.find((it) => it.id === inv.id);
        if (reqItem) {
          return { ...inv, stock: inv.stock - reqItem.qty };
        }
        return inv;
      })
    );

    setRequests(requests.map((r) => (r.id === req.id ? { ...r, status: 'approved' } : r)));
    triggerNotification(`✅ อนุมัติการเบิก #${req.id} แล้ว! ระบบได้ตัดสต็อกคงเหลือเรียบร้อย`);
  };

  const handleRejectRequest = (reqId) => {
    setRequests(requests.map((r) => (r.id === reqId ? { ...r, status: 'rejected' } : r)));
    triggerNotification(`❌ ปฏิเสธรายการขอเบิก #${reqId} แล้ว`);
  };

  const categories = ['ทั้งหมด', ...CATEGORIES_LIST];

  const allGroupedProducts = groupInventoryByProduct(inventory);

  const filteredProducts = allGroupedProducts.filter((group) => {
    const matchesSearch =
      group.baseName.toLowerCase().includes(search.toLowerCase()) ||
      group.variants.some((v) => v.code.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'ทั้งหมด' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const userRequestsHistory = requests.filter(
    (r) => r.teacherName === currentUser?.name
  );

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          font-family: 'Prompt', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #f8fafc;
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(14, 165, 233, 0.15) !important;
        }

        .hover-menu-btn:hover {
          background-color: #f1f5f9 !important;
        }

        tr.tr-hover:hover {
          background-color: #f8fafc;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media print {
          body * { visibility: hidden; }
          #printableArea, #printableArea * { visibility: visible; }
          #printableArea { position: absolute; left: 0; top: 0; width: 100%; height: auto; }
          .no-print { display: none !important; }
        }

        @media (max-width: 768px) {
          html, body, #root {
            overflow-x: hidden !important;
            max-width: 100vw !important;
          }

          .navbar-responsive {
            padding: 0 12px !important;
            height: auto !important;
            min-height: 60px !important;
          }

          .nav-title-responsive {
            font-size: 14px !important;
            line-height: 1.2 !important;
          }

          .nav-subtitle-responsive {
            font-size: 11px !important;
          }

          .main-container-responsive {
            padding: 14px 10px !important;
          }

          .equipment-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }

          .stats-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .hero-banner-responsive {
            padding: 16px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .tab-group-responsive {
            overflow-x: auto !important;
            max-width: 100% !important;
            white-space: nowrap !important;
            display: flex !important;
            flex-wrap: nowrap !important;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 6px !important;
          }

          .auth-box-responsive {
            padding: 24px 18px !important;
            width: 92% !important;
            max-height: 95vh !important;
          }

          .table-card-responsive {
            padding: 12px !important;
            border-radius: 16px !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
          }

          .table-responsive {
            min-width: 600px !important;
          }

          .modal-content-responsive {
            width: 95% !important;
            padding: 20px 16px !important;
            border-radius: 18px !important;
          }

          .cart-drawer-responsive {
            width: 100% !important;
            max-width: 100% !important;
          }

          .toast-responsive {
            left: 14px !important;
            right: 14px !important;
            bottom: 14px !important;
            padding: 12px 16px !important;
            font-size: 12px !important;
          }
        }
      `}</style>

      {notification && (
        <div style={uiStyles.toast} className="toast-responsive">
          <span style={{ fontSize: '18px' }}>✨</span>
          <span style={{ fontWeight: '600' }}>{notification}</span>
        </div>
      )}

      {selectedPrintRequest && (
        <PrintableReceipt request={selectedPrintRequest} onClose={() => setSelectedPrintRequest(null)} />
      )}

      {!currentUser ? (
        <div style={uiStyles.fullScreenCenter}>
          <div style={uiStyles.authBox} className="auth-box-responsive">
            <div style={uiStyles.brandHeader}>
              <div style={uiStyles.largeLogo}>
                {renderCollegeLogo(collegeLogo, '32px')}
              </div>
              <h2 style={uiStyles.authTitle}>ระบบเบิกพัสดุ-ครุภัณฑ์</h2>
              <p style={{ color: '#0284c7', fontSize: '13px', margin: '6px 0 0 0', fontWeight: '700' }}>
                วิทยาลัยเทคโนโลยีอุดมศึกษาพณิชยการ
              </p>
            </div>

            <div style={uiStyles.authTabs}>
              <button
                onClick={() => setAuthMode('login')}
                style={{ ...uiStyles.authTabBtn, background: authMode === 'login' ? '#ffffff' : 'transparent', color: authMode === 'login' ? '#0284c7' : '#64748b', boxShadow: authMode === 'login' ? '0 4px 12px rgba(0,0,0,0.06)' : 'none' }}
              >
                ลงชื่อเข้าใช้
              </button>
              <button
                onClick={() => setAuthMode('register')}
                style={{ ...uiStyles.authTabBtn, background: authMode === 'register' ? '#ffffff' : 'transparent', color: authMode === 'register' ? '#0284c7' : '#64748b', boxShadow: authMode === 'register' ? '0 4px 12px rgba(0,0,0,0.06)' : 'none' }}
              >
                ลงทะเบียนใหม่
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLogin} style={uiStyles.formStack}>
                <div>
                  <label style={uiStyles.label}>รหัสประจำตัวบุคลากร</label>
                  <input type="text" placeholder="เช่น A1 หรือ A-0001" value={loginId} onChange={(e) => setLoginId(e.target.value)} style={uiStyles.input} required />
                </div>
                <div>
                  <label style={uiStyles.label}>รหัสผ่าน</label>
                  <input type="password" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} style={uiStyles.input} required />
                </div>
                <button type="submit" style={uiStyles.submitBtn}>เข้าสู่ระบบ 🔑</button>
              </form>
            ) : (
              <form onSubmit={handleRegister} style={uiStyles.formStack}>
                <div>
                  <label style={uiStyles.label}>รหัสประจำตัวบุคลากร</label>
                  <input type="text" placeholder="เช่น T-6702" value={regId} onChange={(e) => setRegId(e.target.value)} style={uiStyles.input} required />
                </div>
                <div>
                  <label style={uiStyles.label}>ชื่อ-นามสกุล</label>
                  <input type="text" placeholder="อ.กนกวรรณ รักเรียน" value={regName} onChange={(e) => setRegName(e.target.value)} style={uiStyles.input} required />
                </div>
                <div>
                  <label style={uiStyles.label}>สิทธิ์ผู้ใช้งาน</label>
                  <select value={regRole} onChange={(e) => setRegRole(e.target.value)} style={uiStyles.input}>
                    <option value="teacher">ครูประจำวิชา / บุคลากร</option>
                    <option value="admin">เจ้าหน้าที่งานพัสดุ (ผู้ดูแล)</option>
                  </select>
                </div>
                <div>
                  <label style={uiStyles.label}>แผนกวิชา / ฝ่ายงาน</label>
                  <select value={regDept} onChange={(e) => setRegDept(e.target.value)} style={uiStyles.input}>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={uiStyles.label}>เบอร์โทรศัพท์</label>
                  <input type="text" placeholder="08x-xxx-xxxx" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} style={uiStyles.input} required />
                </div>
                <div>
                  <label style={uiStyles.label}>รหัสผ่าน</label>
                  <input type="password" placeholder="ตั้งรหัสผ่านใหม่" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} style={uiStyles.input} required />
                </div>
                <button type="submit" style={{ ...uiStyles.submitBtn, background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', boxShadow: '0 6px 20px rgba(236, 72, 153, 0.35)' }}>
                  ยืนยันการลงทะเบียน ✨
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div style={uiStyles.fullPageWrapper}>
          <nav style={uiStyles.navbar} className="navbar-responsive">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={uiStyles.navLogo}>{renderCollegeLogo(collegeLogo, '22px')}</div>
              <div>
                <h1 style={uiStyles.navTitle} className="nav-title-responsive">วิทยาลัยเทคโนโลยีอุดมศึกษาพณิชยการ</h1>
                <span style={uiStyles.navSubTitle} className="nav-subtitle-responsive">ระบบบริหารจัดการพัสดุและครุภัณฑ์</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {currentUser.role === 'teacher' && (
                <>
                  <button onClick={() => setIsHistoryModalOpen(true)} style={{ ...uiStyles.editBtn, height: '44px', borderRadius: '14px', padding: '0 16px' }}>
                    📜 ประวัติการเบิก
                  </button>
                  <button onClick={() => setIsCartOpen(true)} style={uiStyles.navCartBtn}>
                    <span>🛒 ตะกร้า</span>
                    {totalCartCount > 0 && <span style={uiStyles.cartBadge}>{totalCartCount}</span>}
                  </button>
                </>
              )}

              <div style={{ position: 'relative' }}>
                <button onClick={() => setIsBurgerOpen(!isBurgerOpen)} style={uiStyles.burgerBtn}>
                  ☰
                </button>

                {isBurgerOpen && (
                  <div style={uiStyles.burgerMenu}>
                    <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '4px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>{currentUser.name}</div>
                      <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: '600' }}>
                        {currentUser.role === 'admin' ? '👑 เจ้าหน้าที่งานพัสดุ' : `👨‍🏫 ${currentUser.department || 'ครูประจำวิชา'}`}
                      </div>
                    </div>

                    <button onClick={() => handleOpenUserEdit(currentUser)} style={uiStyles.menuItemBtn} className="hover-menu-btn">
                      <span>✏️ แก้ไขข้อมูลส่วนตัว</span>
                    </button>

                    <button onClick={handleLogout} style={{ ...uiStyles.menuItemBtn, color: '#e11d48' }} className="hover-menu-btn">
                      <span>🚪 ออกจากระบบ</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>

          <main style={uiStyles.mainContainer} className="main-container-responsive">
            {currentUser.role === 'admin' ? (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div style={uiStyles.heroBanner} className="hero-banner-responsive">
                  <div>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                      แผงควบคุมเจ้าหน้าที่งานพัสดุ
                    </h2>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#0284c7', fontWeight: '600' }}>
                      จัดการรายการขอเบิก ตรวจสอบสต็อก และข้อมูลผู้ใช้งานระบบ
                    </p>
                  </div>

                  <div style={uiStyles.tabGroup} className="tab-group-responsive">
                    <button
                      onClick={() => setAdminTab('requests')}
                      style={{ ...uiStyles.tabBtn, background: adminTab === 'requests' ? '#ffffff' : 'transparent', color: adminTab === 'requests' ? '#0284c7' : '#64748b', boxShadow: adminTab === 'requests' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}
                    >
                      📩 คำขอเบิก ({requests.filter(r => r.status === 'pending').length})
                    </button>
                    <button
                      onClick={() => setAdminTab('inventory')}
                      style={{ ...uiStyles.tabBtn, background: adminTab === 'inventory' ? '#ffffff' : 'transparent', color: adminTab === 'inventory' ? '#0284c7' : '#64748b', boxShadow: adminTab === 'inventory' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}
                    >
                      📦 สต็อกพัสดุ
                    </button>
                    <button
                      onClick={() => setAdminTab('users')}
                      style={{ ...uiStyles.tabBtn, background: adminTab === 'users' ? '#ffffff' : 'transparent', color: adminTab === 'users' ? '#0284c7' : '#64748b', boxShadow: adminTab === 'users' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}
                    >
                      👥 ผู้ใช้งาน ({users.length})
                    </button>
                    <button
                      onClick={() => setAdminTab('settings')}
                      style={{ ...uiStyles.tabBtn, background: adminTab === 'settings' ? '#ffffff' : 'transparent', color: adminTab === 'settings' ? '#0284c7' : '#64748b', boxShadow: adminTab === 'settings' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}
                    >
                      ⚙️ ตั้งค่าองค์กร
                    </button>
                  </div>
                </div>

                <div style={uiStyles.statsGrid} className="stats-grid-responsive">
                  <StatCard title="คำขอรออนุมัติ" value={requests.filter(r => r.status === 'pending').length} unit="รายการ" icon="⏳" color="#f59e0b" />
                  <StatCard title="รายการอนุมัติแล้ว" value={requests.filter(r => r.status === 'approved').length} unit="รายการ" icon="✅" color="#10b981" />
                  <StatCard title="จำนวนพัสดุในระบบ" value={inventory.length} unit="รายการ" icon="📦" color="#0284c7" />
                  <StatCard title="พัสดุเหลือน้อย" value={inventory.filter(i => i.stock <= 10).length} unit="รายการ" icon="⚠️" color="#ec4899" />
                </div>

                {adminTab === 'requests' && (
                  <div style={uiStyles.tableCard} className="table-card-responsive">
                    <h3 style={{ margin: '0 0 18px 0', fontSize: '16px', fontWeight: '800' }}>รายการขอเบิกพัสดุทั้งหมด</h3>
                    <table style={uiStyles.table} className="table-responsive">
                      <thead>
                        <tr style={uiStyles.thRow}>
                          <th style={uiStyles.th}>รหัสเอกสาร</th>
                          <th style={uiStyles.th}>ผู้ขอเบิก / แผนก</th>
                          <th style={uiStyles.th}>รายการพัสดุ</th>
                          <th style={uiStyles.th}>วัตถุประสงค์</th>
                          <th style={uiStyles.th}>สถานะ</th>
                          <th style={uiStyles.th}>จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map((req) => (
                          <tr key={req.id} style={uiStyles.tr} className="tr-hover">
                            <td style={uiStyles.td}><strong>REQ-{req.id}</strong></td>
                            <td style={uiStyles.td}>
                              <div style={{ fontWeight: '700', color: '#0f172a' }}>{req.teacherName}</div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>{req.department} ({req.phone})</div>
                            </td>
                            <td style={uiStyles.td}>
                              {req.items ? req.items.map((it, idx) => (
                                <div key={idx} style={{ fontSize: '12px' }}>• {it.name} x <strong>{it.qty}</strong></div>
                              )) : `${req.equipment_name} x ${req.qty}`}
                            </td>
                            <td style={{ ...uiStyles.td, color: '#475569', fontSize: '12px' }}>{req.purpose || '-'}</td>
                            <td style={uiStyles.td}>
                              {req.status === 'pending' && <span style={{ color: '#d97706', background: '#fef3c7', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>⏳ รออนุมัติ</span>}
                              {req.status === 'approved' && <span style={{ color: '#15803d', background: '#dcfce7', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>✅ อนุมัติแล้ว</span>}
                              {req.status === 'rejected' && <span style={{ color: '#be185d', background: '#fce7f3', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>❌ ไม่อนุมัติ</span>}
                            </td>
                            <td style={uiStyles.td}>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {req.status === 'pending' && (
                                  <>
                                    <button onClick={() => handleApproveRequest(req)} style={uiStyles.approveBtn}>อนุมัติ</button>
                                    <button onClick={() => handleRejectRequest(req.id)} style={uiStyles.rejectBtn}>ปฏิเสธ</button>
                                  </>
                                )}
                                <button onClick={() => setSelectedPrintRequest(req)} style={uiStyles.printBtn}>🖨️ พิมพ์/PDF</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {adminTab === 'inventory' && (
                  <div style={uiStyles.tableCard} className="table-card-responsive">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>รายการคลังพัสดุคงเหลือ</h3>
                      <button onClick={handleAddNewItem} style={uiStyles.primaryBtn}>+ เพิ่มรายการพัสดุใหม่</button>
                    </div>

                    <table style={uiStyles.table} className="table-responsive">
                      <thead>
                        <tr style={uiStyles.thRow}>
                          <th style={uiStyles.th}>รูปภาพ / รหัส</th>
                          <th style={uiStyles.th}>ชื่อพัสดุ</th>
                          <th style={uiStyles.th}>หมวดหมู่</th>
                          <th style={uiStyles.th}>คงเหลือ</th>
                          <th style={uiStyles.th}>ราคา/หน่วย</th>
                          <th style={uiStyles.th}>จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventory.map((item) => (
                          <tr key={item.id} style={uiStyles.tr} className="tr-hover">
                            <td style={uiStyles.td}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {item.image ? (
                                  <img src={item.image} alt={item.name} style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
                                ) : (
                                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                                )}
                                <span style={uiStyles.codeBadge}>{item.code}</span>
                              </div>
                            </td>
                            <td style={{ ...uiStyles.td, fontWeight: '700' }}>{item.name}</td>
                            <td style={uiStyles.td}>{item.category}</td>
                            <td style={uiStyles.td}><StockBadge stock={item.stock} /></td>
                            <td style={uiStyles.td}>{item.price > 0 ? `${item.price} ฿` : 'ไม่ระบุ'}</td>
                            <td style={uiStyles.td}>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button onClick={() => handleEditItem(item)} style={uiStyles.editBtn}>✏️ แก้ไข</button>
                                <button onClick={() => handleDeleteItem(item.id)} style={uiStyles.deleteBtn}>🗑️ ลบ</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {adminTab === 'users' && (
                  <div style={uiStyles.tableCard} className="table-card-responsive">
                    <h3 style={{ margin: '0 0 18px 0', fontSize: '16px', fontWeight: '800' }}>รายชื่อผู้ใช้งานในระบบ</h3>
                    <table style={uiStyles.table} className="table-responsive">
                      <thead>
                        <tr style={uiStyles.thRow}>
                          <th style={uiStyles.th}>รหัสประจำตัว</th>
                          <th style={uiStyles.th}>ชื่อ-นามสกุล</th>
                          <th style={uiStyles.th}>แผนกวิชา / ฝ่ายงาน</th>
                          <th style={uiStyles.th}>สิทธิ์ใช้งาน</th>
                          <th style={uiStyles.th}>เบอร์โทรศัพท์</th>
                          <th style={uiStyles.th}>จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id} style={uiStyles.tr} className="tr-hover">
                            <td style={uiStyles.td}><strong>{u.id}</strong></td>
                            <td style={{ ...uiStyles.td, fontWeight: '700' }}>{u.name}</td>
                            <td style={uiStyles.td}>{u.department || '-'}</td>
                            <td style={uiStyles.td}>
                              <span style={{
                                padding: '4px 10px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                background: u.role === 'admin' ? '#f3e8ff' : '#e0f2fe',
                                color: u.role === 'admin' ? '#7e22ce' : '#0369a1'
                              }}>
                                {u.role === 'admin' ? '👑 เจ้าหน้าที่พัสดุ' : '👨‍🏫 ครู / บุคลากร'}
                              </span>
                            </td>
                            <td style={uiStyles.td}>{u.phone || '-'}</td>
                            <td style={uiStyles.td}>
                              <button onClick={() => handleOpenUserEdit(u)} style={uiStyles.editBtn}>✏️ แก้ไขสิทธิ์</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {adminTab === 'settings' && (
                  <div style={{ ...uiStyles.tableCard, maxWidth: '600px' }}>
                    <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '800' }}>ตั้งค่าองค์กร & ตราวิทยาลัย</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                      จัดการตราวิทยาลัยที่จะแสดงผลบนแถบด้านบนและในเอกสารใบขอเบิกพัสดุ (PDF)
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                      <div>
                        <label style={uiStyles.label}>ตราวิทยาลัยปัจจุบัน</label>
                        <div style={{ width: '80px', height: '80px', border: '1px solid #cbd5e1', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#f8fafc' }}>
                          {renderCollegeLogo(collegeLogo, '40px')}
                        </div>
                      </div>

                      <div>
                        <label style={uiStyles.label}>อัปโหลดรูปภาพตราวิทยาลัย (ไฟล์รูปภาพ)</label>
                        <input type="file" accept="image/*" onChange={handleLogoFileUpload} style={{ fontSize: '13px' }} />
                      </div>

                      <div>
                        <label style={uiStyles.label}>หรือระบุ URL รูปภาพตราวิทยาลัย</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="text"
                            placeholder="https://example.com/logo.png"
                            value={logoInput}
                            onChange={(e) => setLogoInput(e.target.value)}
                            style={uiStyles.input}
                          />
                          <button onClick={handleSaveLogoUrl} style={uiStyles.primaryBtn}>บันทึก</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div style={uiStyles.heroBanner} className="hero-banner-responsive">
                  <div>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                      เบิกพัสดุและอุปกรณ์สำนักงาน
                    </h2>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#0284c7', fontWeight: '600' }}>
                      เลือกรายการพัสดุที่ต้องการเบิกใช้สำหรับการเรียนการสอนและการทำงาน
                    </p>
                  </div>

                  <input
                    type="text"
                    placeholder="🔍 ค้นหาพัสดุด้วยชื่อ หรือรหัส..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={uiStyles.searchInput}
                  />
                </div>

                <div style={{ ...uiStyles.tabGroup, marginBottom: '24px' }} className="tab-group-responsive">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        ...uiStyles.tabBtn,
                        background: selectedCategory === cat ? '#ffffff' : 'transparent',
                        color: selectedCategory === cat ? '#0284c7' : '#64748b',
                        boxShadow: selectedCategory === cat ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div style={uiStyles.equipmentGrid} className="equipment-grid-responsive">
                  {filteredProducts.map((group) => (
                    <TikTokProductCard
                      key={group.baseName}
                      productGroup={group}
                      cart={cart}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* MODAL: แก้ไขข้อมูลผู้ใช้งาน */}
      {editingUser && (
        <div style={uiStyles.modalOverlay}>
          <div style={uiStyles.modalContent} className="modal-content-responsive">
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '800' }}>✏️ แก้ไขข้อมูลผู้ใช้</h3>
            <form onSubmit={handleSaveUserEdit} style={uiStyles.formStack}>
              <div>
                <label style={uiStyles.label}>รหัสประจำตัว</label>
                <input
                  type="text"
                  value={editingUser.id}
                  onChange={(e) => setEditingUser({ ...editingUser, id: e.target.value })}
                  style={uiStyles.input}
                  required
                />
              </div>
              <div>
                <label style={uiStyles.label}>ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  style={uiStyles.input}
                  required
                />
              </div>
              <div>
                <label style={uiStyles.label}>แผนกวิชา / ฝ่ายงาน</label>
                <select
                  value={editingUser.department || DEPARTMENTS[0]}
                  onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                  style={uiStyles.input}
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={uiStyles.label}>สิทธิ์การใช้งาน</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  style={uiStyles.input}
                >
                  <option value="teacher">ครูประจำวิชา / บุคลากร</option>
                  <option value="admin">เจ้าหน้าที่งานพัสดุ (ผู้ดูแล)</option>
                </select>
              </div>
              <div>
                <label style={uiStyles.label}>เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  value={editingUser.phone || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  style={uiStyles.input}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={uiStyles.submitBtn}>บันทึกการปรับปรุง</button>
                <button type="button" onClick={() => setEditingUser(null)} style={{ ...uiStyles.submitBtn, background: '#cbd5e1', boxShadow: 'none' }}>ยกเลิก</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: เพิ่ม/แก้ไข รายการพัสดุ */}
      {editingItem && (
        <div style={uiStyles.modalOverlay}>
          <div style={uiStyles.modalContent} className="modal-content-responsive">
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '800' }}>
              {isNewItem ? '✨ เพิ่มรายการพัสดุใหม่' : '✏️ แก้ไขข้อมูลพัสดุ'}
            </h3>
            <form onSubmit={handleSaveItemEdit} style={uiStyles.formStack}>
              <div>
                <label style={uiStyles.label}>รหัสพัสดุ</label>
                <input
                  type="text"
                  value={editingItem.code}
                  onChange={(e) => setEditingItem({ ...editingItem, code: e.target.value })}
                  style={uiStyles.input}
                  required
                />
              </div>
              <div>
                <label style={uiStyles.label}>ชื่อพัสดุ / อุปกรณ์</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  style={uiStyles.input}
                  required
                />
              </div>
              <div>
                <label style={uiStyles.label}>หมวดหมู่</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  style={uiStyles.input}
                >
                  {CATEGORIES_LIST.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={uiStyles.label}>จำนวนสต็อกคงเหลือ</label>
                <input
                  type="number"
                  value={editingItem.stock}
                  onChange={(e) => setEditingItem({ ...editingItem, stock: e.target.value })}
                  style={uiStyles.input}
                  required
                />
              </div>
              <div>
                <label style={uiStyles.label}>ราคาต่อหน่วย (บาท)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                  style={uiStyles.input}
                />
              </div>
              <div>
                <label style={uiStyles.label}>แนบรูปภาพพัสดุ (ไฟล์รูปภาพ)</label>
                <input type="file" accept="image/*" onChange={handleItemImageFileUpload} style={{ fontSize: '12px' }} />
                {editingItem.image && (
                  <div style={{ marginTop: '8px' }}>
                    <img src={editingItem.image} alt="ตัวอย่าง" style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={uiStyles.submitBtn}>บันทึกข้อมูล</button>
                <button type="button" onClick={() => setEditingItem(null)} style={{ ...uiStyles.submitBtn, background: '#cbd5e1', boxShadow: 'none' }}>ยกเลิก</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER: ตะกร้าสินค้า */}
      {isCartOpen && (
        <div style={uiStyles.modalOverlay} onClick={() => setIsCartOpen(false)}>
          <div style={uiStyles.cartDrawer} onClick={(e) => e.stopPropagation()} className="cart-drawer-responsive">
            <div style={uiStyles.drawerHeader}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>🛒 ตะกร้าขอเบิกพัสดุ</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
                  <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>🛒</span>
                  ยังไม่มีรายการในตะกร้า
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>{item.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{item.code}</div>
                      </div>
                      <div style={uiStyles.qtyControl}>
                        <button onClick={() => updateCartQty(item.id, -1)} style={uiStyles.qtyBtn}>-</button>
                        <span style={{ fontSize: '13px', fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => updateCartQty(item.id, 1)} style={uiStyles.qtyBtn}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '20px', borderTop: '1px solid #f1f5f9', background: '#ffffff' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={uiStyles.label}>วัตถุประสงค์ในการนำไปใช้ *</label>
                  <textarea
                    placeholder="ระบุวัตถุประสงค์ เช่น ใช้สำหรับการเรียนการสอนวิชา..."
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    style={{ ...uiStyles.input, height: '80px', resize: 'none' }}
                  />
                </div>
                <button onClick={handleCheckoutCart} style={uiStyles.submitBtn}>
                  ส่งรายการขอเบิก 📩
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: ประวัติการเบิกสินค้าสำหรับอาจารย์ */}
      {isHistoryModalOpen && (
        <div style={uiStyles.modalOverlay} onClick={() => setIsHistoryModalOpen(false)}>
          <div style={{ ...uiStyles.modalContent, maxWidth: '650px' }} onClick={(e) => e.stopPropagation()} className="modal-content-responsive">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>📜 ประวัติการเบิกพัสดุของคุณ</h3>
              <button onClick={() => setIsHistoryModalOpen(false)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            {userRequestsHistory.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>📜</span>
                คุณยังไม่มีประวัติการเบิกพัสดุ
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {userRequestsHistory.map((req) => (
                  <div key={req.id} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', background: '#ffffff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '14px', color: '#0f172a' }}>REQ-{req.id}</strong>
                        <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '10px' }}>{req.date}</span>
                      </div>
                      <div>
                        {req.status === 'pending' && <span style={{ color: '#d97706', background: '#fef3c7', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>⏳ รออนุมัติ</span>}
                        {req.status === 'approved' && <span style={{ color: '#15803d', background: '#dcfce7', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>✅ อนุมัติแล้ว</span>}
                        {req.status === 'rejected' && <span style={{ color: '#be185d', background: '#fce7f3', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>❌ ไม่อนุมัติ</span>}
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: '#475569', marginBottom: '10px' }}>
                      <strong>วัตถุประสงค์:</strong> {req.purpose || '-'}
                    </div>

                    <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '10px', fontSize: '12px', marginBottom: '12px' }}>
                      {req.items && req.items.map((it, idx) => (
                        <div key={idx}>• {it.name} x <strong>{it.qty}</strong></div>
                      ))}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <button onClick={() => setSelectedPrintRequest(req)} style={uiStyles.printBtn}>
                        🖨️ ออกใบเบิก / ดาวน์โหลด PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}