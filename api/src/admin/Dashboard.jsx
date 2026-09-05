import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  // 1. State สำหรับ Tabs และ Telegram
  const [activeTab, setActiveTab] = useState('approve');
  const [telegramToken, setTelegramToken] = useState('');
  const [chatId, setChatId] = useState('');

  // 2. ดึงค่า Telegram จาก localStorage เมื่อเปิดหน้าขึ้นมา
  useEffect(() => {
    const savedToken = localStorage.getItem('telegram_token');
    const savedChatId = localStorage.getItem('telegram_chat_id');
    if (savedToken) setTelegramToken(savedToken);
    if (savedChatId) setChatId(savedChatId);
  }, []);

  // 3. รายการ Tabs ทั้งหมด
  const tabs = [
    { id: 'approve', label: '📋 รายการขอเบิก' },
    { id: 'telegram', label: '✈️ แจ้งเตือน Telegram' },
    { id: 'equipment', label: '📦 จัดการคลังพัสดุ' }
  ];

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '24px', color: '#fff' }}>
      
      {/* ส่วนแถบปุ่มกด Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', backgroundColor: '#1e293b', padding: '6px', borderRadius: '8px', width: 'fit-content' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              backgroundColor: activeTab === tab.id ? '#6366f1' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#94a3b8'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ----------------- TAB 1: รายการขอเบิก ----------------- */}
      {activeTab === 'approve' && (
        <div>
          <h3>📋 รายการขอเบิกพัสดุ</h3>
          {/* ใส่ตารางหรือส่วนแสดงผลรายการขอเบิกของคุณตรงนี้ */}
        </div>
      )}

      {/* ----------------- TAB 2: ตั้งค่า Telegram ----------------- */}
      {activeTab === 'telegram' && (
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', maxWidth: '500px', margin: '0 auto', color: '#fff' }}>
          <h3 style={{ marginTop: 0 }}>✈️ ตั้งค่าแจ้งเตือน Telegram</h3>
          
          <label style={{ display: 'block', fontSize: '12px', margin: '12px 0 4px' }}>Bot Token</label>
          <input 
            type="text" 
            placeholder="วาง Bot Token จาก BotFather"
            value={telegramToken}
            onChange={(e) => setTelegramToken(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', boxSizing: 'border-box' }}
          />

          <label style={{ display: 'block', fontSize: '12px', margin: '12px 0 4px' }}>Chat ID / Group ID</label>
          <input 
            type="text" 
            placeholder="วาง Chat ID"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', boxSizing: 'border-box' }}
          />

          <button 
            onClick={() => {
              localStorage.setItem('telegram_token', telegramToken);
              localStorage.setItem('telegram_chat_id', chatId);
              alert('บันทึกสำเร็จ!');
            }}
            style={{ width: '100%', marginTop: '16px', padding: '10px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            บันทึกการตั้งค่า 💾
          </button>
        </div>
      )}

      {/* ----------------- TAB 3: จัดการคลังพัสดุ ----------------- */}
      {activeTab === 'equipment' && (
        <div>
          <h3>📦 จัดการคลังพัสดุและสต็อก</h3>
          {/* ใส่ตารางคลังพัสดุ/ยอดคงเหลือของคุณตรงนี้ */}
        </div>
      )}

    </div>
  );
}