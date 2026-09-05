import React, { useState } from 'react';

export default function Equipment() {
  // 1. ข้อมูลเริ่มต้นของพัสดุในคลัง
  const [items, setItems] = useState([
    { id: 'P-001', name: 'กระดาษถ่ายเอกสาร A4 (80แกรม)', category: 'สำนักงาน', count: 45, unit: 'รีม' },
    { id: 'P-002', name: 'ปากกาไวท์บอร์ดสีน้ำเงิน', category: 'เครื่องเขียน', count: 5, unit: 'ด้าม' },
    { id: 'P-003', name: 'แฟ้มเสนอเซ็นหนังเทียม', category: 'สำนักงาน', count: 25, unit: 'เล่ม' },
  ]);

  // State สำหรับฟอร์มเพิ่ม/แก้ไข
  const [formData, setFormData] = useState({ id: '', name: '', category: 'สำนักงาน', count: 0, unit: 'ชิ้น' });
  const [isEditing, setIsEditing] = useState(false);

  // ฟังก์ชันเพิ่ม หรือ แก้ไขพัสดุ
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert('กรุณากรอกชื่อพัสดุ');

    if (isEditing) {
      // โหมดแก้ไข
      setItems(items.map(item => item.id === formData.id ? formData : item));
      setIsEditing(false);
    } else {
      // โหมดเพิ่มใหม่
      const newItem = {
        ...formData,
        id: `P-${String(items.length + 1).padStart(3, '0')}`,
        count: Number(formData.count)
      };
      setItems([...items, newItem]);
    }

    // ล้างฟอร์ม
    setFormData({ id: '', name: '', category: 'สำนักงาน', count: 0, unit: 'ชิ้น' });
  };

  // ฟังก์ชันเริ่มการแก้ไข
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  // ฟังก์ชันลบรายการ
  const handleDelete = (id) => {
    if (window.confirm('คุณต้องการลบรายการพัสดุนี้ใช่หรือไม่?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // ยกเลิกการแก้ไข
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ id: '', name: '', category: 'สำนักงาน', count: 0, unit: 'ชิ้น' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#fff' }}>
      
      {/* 🟢 ส่วนที่ 1: ฟอร์มเพิ่ม/แก้ไขพัสดุ */}
      <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>
          {isEditing ? '✏️ แก้ไขข้อมูลพัสดุ' : '➕ เพิ่มพัสดุเข้าคลังใหม่'}
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>ชื่อรายการพัสดุ</label>
            <input
              type="text"
              placeholder="เช่น กระดาษ A4"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>หมวดหมู่</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
            >
              <option value="สำนักงาน">สำนักงาน</option>
              <option value="เครื่องเขียน">เครื่องเขียน</option>
              <option value="อิเล็กทรอนิกส์">อิเล็กทรอนิกส์</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>จำนวนคงเหลือ</label>
            <input
              type="number"
              min="0"
              value={formData.count}
              onChange={(e) => setFormData({ ...formData, count: Number(e.target.value) })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>หน่วยนับ</label>
            <input
              type="text"
              placeholder="เช่น รีม, ด้าม"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="submit"
              style={{ padding: '8px 16px', borderRadius: '6px', backgroundColor: isEditing ? '#f59e0b' : '#6366f1', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {isEditing ? 'บันทึก' : 'เพิ่มพัสดุ'}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                style={{ padding: '8px 12px', borderRadius: '6px', backgroundColor: '#475569', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                ยกเลิก
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 🟢 ส่วนที่ 2: ตารางแสดงรายการพัสดุทั้งหมด */}
      <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>📦 รายการพัสดุทั้งหมดในระบบ ({items.length} รายการ)</h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', textOverflow: 'ellipsis' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8', textAlign: 'left', fontSize: '14px' }}>
              <th style={{ padding: '12px' }}>รหัส</th>
              <th style={{ padding: '12px' }}>ชื่อพัสดุ</th>
              <th style={{ padding: '12px' }}>หมวดหมู่</th>
              <th style={{ padding: '12px' }}>คงเหลือ</th>
              <th style={{ padding: '12px' }}>สถานะ</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #0f172a', fontSize: '14px' }}>
                <td style={{ padding: '12px', color: '#a855f7', fontWeight: 'bold' }}>{item.id}</td>
                <td style={{ padding: '12px' }}>{item.name}</td>
                <td style={{ padding: '12px', color: '#94a3b8' }}>{item.category}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>
                  {item.count} {item.unit}
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    backgroundColor: item.count <= 5 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: item.count <= 5 ? '#f43f5e' : '#10b981',
                    fontWeight: 'bold'
                  }}>
                    {item.count <= 5 ? '⚠️ ใกล้หมด' : '✅ ปกติ'}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{ padding: '4px 8px', marginRight: '8px', borderRadius: '4px', border: 'none', backgroundColor: '#3b82f6', color: '#fff', cursor: 'pointer', fontSize: '12px' }}
                  >
                    ✏️ แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', backgroundColor: '#ef4444', color: '#fff', cursor: 'pointer', fontSize: '12px' }}
                  >
                    🗑️ ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}