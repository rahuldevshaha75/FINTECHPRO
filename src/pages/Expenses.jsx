import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit2, X, Check } from 'lucide-react';
import { expenses as initialExpenses } from '../data/transactions';

const fmt = (n) => new Intl.NumberFormat('en-BD').format(n);

const categories = ['Food & Dining', 'Transport', 'Rent', 'Utilities', 'Healthcare', 'Entertainment', 'Shopping', 'Education', 'Other'];

const categoryColors = {
  'Food & Dining': '#FF6B6B',
  'Transport': '#4ECDC4',
  'Rent': '#45B7D1',
  'Utilities': '#96CEB4',
  'Healthcare': '#FFEAA7',
  'Entertainment': '#DDA0DD',
  'Shopping': '#98D8C8',
  'Education': '#FFB347',
  'Other': '#B0B0B0',
};

function Modal({ onClose, onSave, title, initial = {} }) {
  const [form, setForm] = useState({
    amount: initial.amount || '',
    category: initial.category || '',
    note: initial.note || '',
    date: initial.date || new Date().toISOString().split('T')[0],
  });

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '700' }}>{title}</h2>
          <button className="btn-icon" onClick={onClose}><X size={16} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <label className="input-label">Amount (৳)</label>
            <input className="input" type="number" placeholder="0.00" value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Category</label>
            <select className="select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="">Select category</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Note (optional)</label>
            <input className="input" placeholder="Add a note..." value={form.note}
              onChange={e => setForm({ ...form, note: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Date</label>
            <input className="input" type="date" value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button className="btn btn-secondary w-full" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary w-full" onClick={() => onSave(form)}>Save Expense</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Expenses() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = expenses.filter(e =>
    (filterCat ? e.category === filterCat : true) &&
    (search ? (e.note?.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase())) : true)
  );

  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const handleSave = (form) => {
    if (editing) {
      setExpenses(prev => prev.map(e => e.id === editing.id ? { ...e, ...form, amount: Number(form.amount) } : e));
      setEditing(null);
    } else {
      setExpenses(prev => [...prev, { ...form, id: Date.now(), amount: Number(form.amount), type: 'expense' }]);
      setShowModal(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title">Expense Tracker</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Track and manage your spending
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid-3 animate-fade-in-up anim-delay-1">
        <div className="stat-card">
          <div className="glow red" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Spent</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--accent-red)' }}>
            ৳{fmt(total)}
          </div>
        </div>
        <div className="stat-card">
          <div className="glow cyan" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Transactions</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {filtered.length}
          </div>
        </div>
        <div className="stat-card">
          <div className="glow yellow" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Average Expense</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--accent-yellow)' }}>
            ৳{fmt(filtered.length ? Math.round(total / filtered.length) : 0)}
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card animate-fade-in-up anim-delay-2">
        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="input"
              placeholder="Search expenses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>
          <select className="select" style={{ width: '180px' }} value={filterCat} onChange={e => setFilterCat(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Note</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(expense => (
                <tr key={expense.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '3px',
                        background: categoryColors[expense.category] || '#ccc',
                        flexShrink: 0,
                      }} />
                      <span className="badge" style={{
                        background: `${categoryColors[expense.category]}18` || 'rgba(255,255,255,0.06)',
                        color: categoryColors[expense.category] || 'var(--text-secondary)',
                        border: `1px solid ${categoryColors[expense.category]}30`,
                        textTransform: 'none',
                        fontSize: '12px',
                        fontWeight: '500',
                        letterSpacing: 0,
                      }}>{expense.category}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {expense.note || '—'}
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{expense.date}</td>
                  <td style={{ textAlign: 'right', color: 'var(--accent-red)', fontWeight: '600', fontFamily: 'var(--font-display)' }}>
                    -৳{fmt(expense.amount)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button className="btn-icon btn-sm" onClick={() => setEditing(expense)} title="Edit">
                        <Edit2 size={13} />
                      </button>
                      <button
                        className="btn-icon btn-sm"
                        onClick={() => setConfirmDelete(expense.id)}
                        title="Delete"
                        style={{ color: 'var(--accent-red)' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty-state">
              <Search size={40} />
              <span>No expenses found</span>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && <Modal title="Add Expense" onClose={() => setShowModal(false)} onSave={handleSave} />}
      {editing && <Modal title="Edit Expense" initial={editing} onClose={() => setEditing(null)} onSave={handleSave} />}

      {/* Delete Confirm */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-content" style={{ maxWidth: '380px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginBottom: '12px' }}>Delete Expense?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary w-full" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger w-full" onClick={() => {
                setExpenses(prev => prev.filter(e => e.id !== confirmDelete));
                setConfirmDelete(null);
              }}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
