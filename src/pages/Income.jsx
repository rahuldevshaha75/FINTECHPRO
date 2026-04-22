import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit2, X } from 'lucide-react';
import { incomes as initialIncomes } from '../data/transactions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fmt = (n) => new Intl.NumberFormat('en-BD').format(n);

const sources = ['Salary', 'Freelance', 'Interest', 'Side Business', 'Investment Return', 'Rental Income', 'Gift', 'Other'];
const sourceColors = {
  Salary: '#00E5A0', Freelance: '#00D4FF', Interest: '#45B7D1',
  'Side Business': '#FFEAA7', 'Investment Return': '#DDA0DD',
  'Rental Income': '#FFB347', Gift: '#FF6B6B', Other: '#98D8C8',
};

function Modal({ onClose, onSave, title, initial = {} }) {
  const [form, setForm] = useState({
    amount: initial.amount || '',
    source: initial.source || '',
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
            <label className="input-label">Source</label>
            <select className="select" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}>
              <option value="">Select source</option>
              {sources.map(s => <option key={s}>{s}</option>)}
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
            <button className="btn btn-success w-full" onClick={() => onSave(form)}>Save Income</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Income() {
  const [incomes, setIncomes] = useState(initialIncomes);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = incomes.filter(i =>
    search ? (i.note?.toLowerCase().includes(search.toLowerCase()) || i.source.toLowerCase().includes(search.toLowerCase())) : true
  );

  const total = filtered.reduce((s, i) => s + i.amount, 0);

  // Group by source for chart
  const bySource = sources.map(s => ({
    source: s,
    amount: incomes.filter(i => i.source === s).reduce((sum, i) => sum + i.amount, 0),
  })).filter(s => s.amount > 0);

  const handleSave = (form) => {
    if (editing) {
      setIncomes(prev => prev.map(i => i.id === editing.id ? { ...i, ...form, amount: Number(form.amount) } : i));
      setEditing(null);
    } else {
      setIncomes(prev => [...prev, { ...form, id: Date.now(), amount: Number(form.amount), type: 'income' }]);
      setShowModal(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="animate-fade-in-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title">Income Tracker</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Manage all your income sources</p>
        </div>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add Income
        </button>
      </div>

      {/* Summary */}
      <div className="grid-3 animate-fade-in-up anim-delay-1">
        <div className="stat-card">
          <div className="glow green" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Income</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--accent-green)' }}>
            ৳{fmt(total)}
          </div>
        </div>
        <div className="stat-card">
          <div className="glow cyan" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Sources</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {new Set(incomes.map(i => i.source)).size}
          </div>
        </div>
        <div className="stat-card">
          <div className="glow yellow" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Average Income</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--accent-yellow)' }}>
            ৳{fmt(filtered.length ? Math.round(total / filtered.length) : 0)}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
        {/* Bar Chart */}
        <div className="card animate-fade-in-up anim-delay-2">
          <h3 className="section-title" style={{ marginBottom: '16px' }}>Income by Source</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={bySource} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="source" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v / 1000}k`} />
              <Tooltip
                formatter={(val) => [`৳${fmt(val)}`, 'Amount']}
                contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-normal)', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="amount" fill="#00E5A0" radius={[6, 6, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="card animate-fade-in-up anim-delay-3">
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input className="input" placeholder="Search income..." value={search}
                onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '36px' }} />
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Note</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map(income => (
                  <tr key={income.id}>
                    <td>
                      <span className="badge" style={{
                        background: `${sourceColors[income.source] || '#ccc'}18`,
                        color: sourceColors[income.source] || 'var(--text-secondary)',
                        border: `1px solid ${sourceColors[income.source] || '#ccc'}30`,
                        textTransform: 'none', fontSize: '12px', fontWeight: '500', letterSpacing: 0,
                      }}>{income.source}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{income.note || '—'}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{income.date}</td>
                    <td style={{ textAlign: 'right', color: 'var(--accent-green)', fontWeight: '600', fontFamily: 'var(--font-display)' }}>
                      +৳{fmt(income.amount)}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button className="btn-icon btn-sm" onClick={() => setEditing(income)}><Edit2 size={13} /></button>
                        <button className="btn-icon btn-sm" onClick={() => setConfirmDelete(income.id)} style={{ color: 'var(--accent-red)' }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty-state"><Search size={40} /><span>No income found</span></div>}
          </div>
        </div>
      </div>

      {showModal && <Modal title="Add Income" onClose={() => setShowModal(false)} onSave={handleSave} />}
      {editing && <Modal title="Edit Income" initial={editing} onClose={() => setEditing(null)} onSave={handleSave} />}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-content" style={{ maxWidth: '380px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginBottom: '12px' }}>Delete Income?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary w-full" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger w-full" onClick={() => { setIncomes(p => p.filter(i => i.id !== confirmDelete)); setConfirmDelete(null); }}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
