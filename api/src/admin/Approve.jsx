import React, { useEffect, useState } from 'react';

export default function Approve() {
  // States ระบบ Tab & Search
  const [currentTab, setCurrentTab] = useState('requests'); // 'requests', 'telegram', 'users', 'equipments'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // States ข้อมูลหลัก (มี Mock Data สำรองป้องกัน Crash)
  const [requests, setRequests] = useState([
    { id: 1, fullname: 'อ.สมชาย ใจดี', equipment_name: 'กระดาษ A4 80แกรม', qty: 2, created_at: '2026-08-23', status: 'pending' }
  ]);
  const [equipments, setEquipments] = useState([
    { id: 1, name: 'กระดาษ A4 80แกรม', category_id: '1', category_name: 'วัสดุสำนักงาน', total_qty: 50, available_qty: 3 },
    { id: 2, name: 'ปากกาลูกลื่น สีน้ำเงิน', category_id: '1', category_name: 'วัสดุสำนักงาน', total_qty: 100, available_qty: 45 },
    { id: 3, name: 'หมึกพิมพ์ HP', category_id: '2', category_name: 'วัสดุคอมพิวเตอร์', total_qty: 10, available_qty: 2 }
  ]);
  const [categories, setCategories] = useState([
    { id: '1', name: 'วัสดุสำนักงาน' },
    { id: '2', name: 'วัสดุคอมพิวเตอร์' }
  ]);
  const [users, setUsers] = useState([
    { id: 1, fullname: 'เจ้าหน้าที่งานพัสดุ (Admin)', role: 'ผู้ดูแลระบบ' },
    { id: 2, fullname: 'อ.สมชาย ใจดี', role: 'ครูผู้เบิก' }
  ]);

  // States ตั้งค่า Telegram
  const [telegramToken, setTelegramToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');

  // States Modal เพิ่ม/แก้ไขพัสดุ
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', category_id: '1', total_qty: 0, available_qty: 0 });

  // 1. โหลดข้อมูลจาก API
  const fetchAllData = async () => {
    try {
      const resReq = await fetch('http://localhost/Mickyss1/api/admin/approve.php');
      if (resReq.ok) {
        const data = await resReq.json();
        if (data.data) setRequests(data.data);
      }
    } catch (e) {
      console.log('API Approve ล่ม: ใช้ข้อมูลสำรอง');
    }

    try {
      const resEq = await fetch('http://localhost/Mickyss1/api/admin/equitment.php');
      if (resEq.ok) {
        const data = await resEq.json();
        if (data.data) setEquipments(data.data);
        if (data.categories) setCategories(data.categories);
      }
    } catch (e) {
      console.log('API Equipment ล่ม: ใช้ข้อมูลสำรอง');
    }

    try {
      const resUser = await fetch('http://localhost/Mickyss1/api/admin/users.php');
      if (resUser.ok) {
        const data = await resUser.json();
        if (data.data) setUsers(data.data);
      }
    } catch (e) {
      console.log('API Users ล่ม: ใช้ข้อมูลสำรอง');
    }
  };

  useEffect(() => {
    fetchAllData();
    const savedToken = localStorage.getItem('telegram_token');
    const savedChatId = localStorage.getItem('telegram_chat_id');
    if (savedToken) setTelegramToken(savedToken);
    if (savedChatId) setTelegramChatId(savedChatId);
  }, []);

  // 2. ฟังก์ชันส่งแจ้งเตือน Telegram
  const sendTelegramNotification = async (message) => {
    const token = localStorage.getItem('telegram_token');
    const chatId = localStorage.getItem('telegram_chat_id');
    if (!token || !chatId) return;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' })
      });
    } catch (error) {
      console.error('ไม่สามารถส่ง Telegram ได้:', error);
    }
  };

  const handleSaveTelegram = () => {
    localStorage.setItem('telegram_token', telegramToken);
    localStorage.setItem('telegram_chat_id', telegramChatId);
    alert('บันทึกการตั้งค่า Telegram เรียบร้อยแล้ว!');
  };

  // 3. จัดการปรับสต็อกด่วน
  const handleQuickStockChange = async (item, amount) => {
    const newQty = Math.max(0, Number(item.available_qty) + amount);
    const updatedData = { ...item, available_qty: newQty };

    setEquipments(prev => prev.map(e => e.id === item.id ? updatedData : e));

    try {
      await fetch('http://localhost/Mickyss1/api/admin/equitment.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
    } catch (e) {
      console.error(e);
    }

    if (newQty <= 3 && amount < 0) {
      sendTelegramNotification(`<b>⚠️ เตือนพัสดุเหลือน้อย!</b>\nรายการ: ${item.name}\nคงเหลือ: <b>${newQty}</b> ชิ้น`);
    }
  };

  // 4. จัดการ Form Modal (เพิ่ม/แก้ไข/ลบ)
  const handleOpenAdd = () => {
    setIsEdit(false);
    setFormData({ id: '', name: '', category_id: categories[0]?.id || '1', total_qty: 0, available_qty: 0 });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setIsEdit(true);
    setFormData(item);
    setShowModal(true);
  };

  const handleSubmitEquipment = async (e) => {
    e.preventDefault();
    const method = isEdit ? 'PUT' : 'POST';

    try {
      await fetch('http://localhost/Mickyss1/api/admin/equitment.php', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (e) {
      console.error(e);
    }

    if (!isEdit) {
      sendTelegramNotification(`<b>📦 เพิ่มพัสดุใหม่!</b>\nรายการ: ${formData.name}\nจำนวน: ${formData.total_qty}`);
    }

    setShowModal(false);
    fetchAllData();
  };

  const handleDeleteEquipment = async (id) => {
    if (confirm('ยืนยันการลบพัสดุรายการนี้?')) {
      try {
        await fetch('http://localhost/Mickyss1/api/admin/equitment.php', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
      } catch (e) {
        console.error(e);
      }
      fetchAllData();
    }
  };

  // Filter พัสดุตามการค้นหา
  const filteredEquipments = equipments.filter(item => {
    const matchSearch = item.name ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const matchCat = selectedCategory === '' || String(item.category_id) === String(selectedCategory);
    return matchSearch && matchCat;
  });

  return (
    <div style={{ backgroundColor: '#090d16', color: '#fff', minHeight: '100vh', padding: '24px', fontFamily: 'sans-serif' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ margin: 0, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🛡️ แผงควบคุมระบบงานพัสดุ
        </h2>

        {/* ปุ่มสลับ 4 Tab */}
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#1e293b', padding: '4px', borderRadius: '8px' }}>
          <button onClick={() => setCurrentTab('requests')} style={{ backgroundColor: currentTab === 'requests' ? '#8b5cf6' : 'transparent', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            📋 รายการขอเบิก
          </button>
          <button onClick={() => setCurrentTab('telegram')} style={{ backgroundColor: currentTab === 'telegram' ? '#8b5cf6' : 'transparent', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            🔔 แจ้งเตือน Telegram
          </button>
          <button onClick={() => setCurrentTab('users')} style={{ backgroundColor: currentTab === 'users' ? '#8b5cf6' : 'transparent', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            👥 ผู้ใช้งาน ({users.length})
          </button>
          <button onClick={() => setCurrentTab('equipments')} style={{ backgroundColor: currentTab === 'equipments' ? '#8b5cf6' : 'transparent', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            📦 จัดการวัสดุ/คลังพัสดุ
          </button>
        </div>
      </div>

      {/* Cards สรุปข้อมูล */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#131c2e', border: '1px solid #1e293b', padding: '16px', borderRadius: '12px' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>พัสดุในคลังทั้งหมด</span>
          <h1 style={{ margin: '8px 0 0 0' }}>{equipments.length} รายการ</h1>
        </div>
        <div style={{ backgroundColor: '#131c2e', border: '1px solid #1e293b', padding: '16px', borderRadius: '12px' }}>
          <span style={{ color: '#f87171', fontSize: '14px' }}>⚠️ สต็อกต่ำ (≤5 ชิ้น)</span>
          <h1 style={{ margin: '8px 0 0 0', color: '#f87171' }}>{equipments.filter(e => Number(e.available_qty) <= 5).length} รายการ</h1>
        </div>
        <div style={{ backgroundColor: '#131c2e', border: '1px solid #1e293b', padding: '16px', borderRadius: '12px' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>คำขอรอตรวจสอบ</span>
          <h1 style={{ margin: '8px 0 0 0' }}>{requests.filter(r => r.status === 'pending').length} รายการ</h1>
        </div>
      </div>

      {/* TAB 1: รายการขอเบิก */}
      {currentTab === 'requests' && (
        <div style={{ backgroundColor: '#131c2e', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <h3 style={{ marginTop: 0 }}>📋 รายการคำขอเบิกพัสดุ</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                <th style={{ padding: '12px' }}>ผู้ขอเบิก</th>
                <th style={{ padding: '12px' }}>รายการ</th>
                <th style={{ padding: '12px' }}>วันที่</th>
                <th style={{ padding: '12px' }}>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '12px' }}>{r.fullname}</td>
                  <td style={{ padding: '12px', color: '#c084fc' }}>{r.equipment_name} (x{r.qty})</td>
                  <td style={{ padding: '12px' }}>{r.created_at}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ backgroundColor: '#854d0e', color: '#fef08a', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: ตั้งค่า Telegram */}
      {currentTab === 'telegram' && (
        <div style={{ backgroundColor: '#131c2e', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b', maxWidth: '450px', margin: '0 auto' }}>
          <h3 style={{ marginTop: 0 }}>🔔 ตั้งค่าระบบแจ้งเตือน Telegram</h3>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: '#cbd5e1' }}>Telegram Bot Token</label>
            <input type="text" placeholder="เช่น 712345678:AAH..." value={telegramToken} onChange={(e) => setTelegramToken(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: '#cbd5e1' }}>Chat ID / Group ID</label>
            <input type="text" placeholder="เช่น 123456789" value={telegramChatId} onChange={(e) => setTelegramChatId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleSaveTelegram} style={{ width: '100%', padding: '10px', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>💾 บันทึกการตั้งค่า</button>
        </div>
      )}

      {/* TAB 3: ผู้ใช้งาน */}
      {currentTab === 'users' && (
        <div style={{ backgroundColor: '#131c2e', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <h3 style={{ marginTop: 0 }}>👥 รายชื่อผู้ใช้งานระบบ</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                <th style={{ padding: '12px' }}>#</th>
                <th style={{ padding: '12px' }}>ชื่อ - นามสกุล</th>
                <th style={{ padding: '12px' }}>สิทธิ์ใช้งาน</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id || i} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '12px' }}>{i + 1}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{u.fullname}</td>
                  <td style={{ padding: '12px', color: '#38bdf8' }}>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: คลังพัสดุ */}
      {currentTab === 'equipments' && (
        <div style={{ backgroundColor: '#131c2e', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input type="text" placeholder="🔍 ค้นหาวัสดุ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}>
              <option value="">ทุกหมวดหมู่</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button onClick={handleOpenAdd} style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>+ เพิ่มพัสดุใหม่</button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                <th style={{ padding: '12px' }}>ชื่อรายการ</th>
                <th style={{ padding: '12px' }}>หมวดหมู่</th>
                <th style={{ padding: '12px' }}>ทั้งหมด</th>
                <th style={{ padding: '12px' }}>คงเหลือ (ปรับสต็อกด่วน)</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipments.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.name}</td>
                  <td style={{ padding: '12px', color: '#94a3b8' }}>{item.category_name || 'ทั่วไป'}</td>
                  <td style={{ padding: '12px' }}>{item.total_qty}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => handleQuickStockChange(item, -1)} style={{ width: '28px', height: '28px', backgroundColor: '#334155', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                      <span style={{ minWidth: '35px', textAlign: 'center', fontWeight: 'bold', color: Number(item.available_qty) <= 5 ? '#f87171' : '#4ade80' }}>{item.available_qty}</span>
                      <button onClick={() => handleQuickStockChange(item, 1)} style={{ width: '28px', height: '28px', backgroundColor: '#334155', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button onClick={() => handleOpenEdit(item)} style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', marginRight: '6px' }}>แก้ไข</button>
                    <button onClick={() => handleDeleteEquipment(item.id)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>ลบ</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal เพิ่ม/แก้ไข */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', width: '380px', border: '1px solid #334155' }}>
            <h3 style={{ marginTop: 0 }}>{isEdit ? 'แก้ไขพัสดุ' : 'เพิ่มพัสดุใหม่'}</h3>
            <form onSubmit={handleSubmitEquipment}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>ชื่อรายการ</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>จำนวนทั้งหมด</label>
                <input type="number" required min="0" value={formData.total_qty} onChange={(e) => setFormData({...formData, total_qty: e.target.value, available_qty: isEdit ? formData.available_qty : e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
              </div>
              {isEdit && (
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>คงเหลือ</label>
                  <input type="number" required min="0" value={formData.available_qty} onChange={(e) => setFormData({...formData, available_qty: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 16px', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>ยกเลิก</button>
                <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>บันทึก</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}