import React, { useState, useEffect } from 'react';

const ProfileAndHistory = ({ userId }) => {
  const [profile, setProfile] = useState({ name: '', phone: '', department: '', password: '' });
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

  const departments = ['IT', 'HR', 'การเงิน', 'การตลาด', 'จัดซื้อ', 'ปฏิบัติการ'];

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/user/profile.php?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') setProfile({ ...data.data, password: '' });
      });

    fetch(`/api/user/history.php?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') setHistory(data.data || []);
      });
  }, [userId]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/user/profile.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, ...profile })
    });
    const result = await res.json();
    alert(result.message);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-semibold ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          แก้ไขข้อมูลส่วนตัว
        </button>
        <button
          className={`py-2 px-4 font-semibold ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('history')}
        >
          ประวัติการเบิกสินค้า
        </button>
      </div>

      {activeTab === 'profile' ? (
        <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">แผนก</label>
            <select
              value={profile.department}
              onChange={(e) => setProfile({ ...profile, department: e.target.value })}
              className="w-full mt-1 p-2 border rounded-md"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">เปลี่ยนรหัสผ่าน (เว้นว่างไว้หากไม่เปลี่ยน)</label>
            <input
              type="password"
              value={profile.password}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            บันทึกการเปลี่ยนแปลง
          </button>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">วันที่</th>
                <th className="p-3">รายการ</th>
                <th className="p-3">จำนวน</th>
                <th className="p-3">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.created_at}</td>
                    <td className="p-3">{item.item_name}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'approved' ? 'bg-green-100 text-green-800' :
                        item.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">ไม่มีประวัติการเบิก</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileAndHistory;