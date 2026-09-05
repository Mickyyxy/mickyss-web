import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';

const BorrowManagement = () => {
  const [borrows, setBorrows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    user_id: '',
    equipment_id: '',
    quantity: 1,
    status: 'pending'
  });

  // ดึงข้อมูลเมื่อเริ่มโหลดหน้า
  useEffect(() => {
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    try {
      const res = await fetch('/api/admin/borrow.php');
      const data = await res.json();
      setBorrows(data);
    } catch (err) {
      console.error('Error fetching borrows:', err);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        user_id: item.user_id,
        equipment_id: item.equipment_id,
        quantity: item.quantity,
        status: item.status
      });
    } else {
      setEditingItem(null);
      setFormData({ user_id: '', equipment_id: '', quantity: 1, status: 'pending' });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const bodyData = editingItem ? { ...formData, id: editingItem.id } : formData;

    await fetch('/api/admin/borrow.php', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });

    setShowModal(false);
    fetchBorrows();
  };

  const handleDelete = async (id) => {
    if (window.confirm('คุณต้องการลบรายการนี้ใช่หรือไม่?')) {
      await fetch('/api/admin/borrow.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchBorrows();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">จัดการรายการเบิกอุปกรณ์</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} /> เพิ่มรายการเบิก
        </button>
      </div>

      {/* ตารางแสดงผลรายการ */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-4">รหัส</th>
              <th className="p-4">ผู้เบิก</th>
              <th className="p-4">รายการอุปกรณ์</th>
              <th className="p-4">จำนวน</th>
              <th className="p-4">สถานะ</th>
              <th className="p-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{item.id}</td>
                <td className="p-4 font-medium">{item.username || `User #${item.user_id}`}</td>
                <td className="p-4">{item.equipment_name || `Equipment #${item.equipment_id}`}</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'approved' ? 'bg-green-100 text-green-800' :
                    item.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal เพิ่ม / แก้ไข รายการ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? 'แก้ไขรายการเบิก' : 'เพิ่มรายการเบิกใหม่'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!editingItem && (
                <div>
                  <label className="block text-sm font-medium mb-1">User ID</label>
                  <input
                    type="number"
                    required
                    value={formData.user_id}
                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                    className="w-full border rounded p-2"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Equipment ID</label>
                <input
                  type="number"
                  required
                  value={formData.equipment_id}
                  onChange={(e) => setFormData({ ...formData, equipment_id: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">จำนวน</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">สถานะ</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border rounded p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowManagement;