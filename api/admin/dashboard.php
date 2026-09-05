<?php
import React, { useState } from 'react';
import Approve from './Approve'; 
import Equipment from './Equipment';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('approve');

  const [stockList, setStockList] = useState([
    { id: 1, name: 'กระดาษ A4 (80แกรม)', count: 12 },
    { id: 2, name: 'ปากกาเคมี สีน้ำเงิน', count: 3 },
    { id: 3, name: 'แฟ้มเสนอเซ็น', count: 25 },
  ]);

  const [selectedStockId, setSelectedStockId] = useState(1);

  // ดึงข้อมูล item ตัวปัจจุบันตาม ID
  const selectedStock = stockList.find(item => item.id === selectedStockId);

  const handleQuantityChange = (amount) => {
    if (!selectedStock) return;
    
    setStockList(prevList =>
      prevList.map(item => {
        if (item.id === selectedStockId) {
          const newCount = Math.max(0, item.count + amount);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };

  const tabs = [
    { id: 'approve', label: '📋 รายการขอเบิก' },
    { id: 'equipment', label: '📦 จัดการคลังพัสดุ (เต็มรูปแบบ)' },
    { id: 'reports', label: '📊 รายงานสถิติ' }
  ];

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '24px', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🛡️ แผงควบคุมระบบงานพัสดุ
        </h2>
        
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#1e293b', padding: '4px', borderRadius: '8px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                backgroundColor: activeTab === tab.id ? '#6366f1' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'approve' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
          
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <Approve />
          </div>

          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#f8fafc' }}>📦 เช็กและปรับสต็อกด่วน</h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94a3b8' }}>คลิกเลือกรายการเพื่อแก้ไขจำนวนคงเหลือ</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {stockList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedStockId(item.id)}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: selectedStockId === item.id ? '#334155' : '#0f172a',
                      border: selectedStockId === item.id ? '1px solid #6366f1' : '1px solid #1e293b',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: '14px' }}>{item.name}</span>
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: 'bold', 
                      color: item.count <= 5 ? '#f43f5e' : '#10b981',
                      backgroundColor: item.count <= 5 ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      {item.count} {item.count <= 5 && '(เหลือน้อย)'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {selectedStock && (
              <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>รายการที่เลือก:</div>
                <div style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>{selectedStock.name}</div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    style={{ width: '36px', height: '36px', backgroundColor: '#334155', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
                  >-</button>
                  <input 
                    type="number" 
                    value={selectedStock.count} 
                    readOnly
                    style={{ flex: 1, height: '36px', textAlign: 'center', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px', fontWeight: 'bold' }}
                  />
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    style={{ width: '36px', height: '36px', backgroundColor: '#334155', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
                  >+</button>
                </div>
              </div>
            )}
          </div>

        </div>
      ) : activeTab === 'equipment' ? (
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px' }}>
          <Equipment />
        </div>
      ) : (
        <div style={{ padding: '20px', backgroundColor: '#1e293b', borderRadius: '12px', color: '#94a3b8' }}>
          📊 หน้าเนื้อหาแถบรายงานสถิติ
        </div>
      )}

    </div>
  );
}
?>