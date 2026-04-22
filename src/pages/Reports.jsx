import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend
} from 'recharts';
import { FileText, Download, TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import { monthlySummary, expenseCategories, incomes, expenses } from '../data/transactions';
import { goals } from '../data/budgets';

const fmt = (n) => new Intl.NumberFormat('en-BD').format(n);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-normal)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
      }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{p.name}:</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>৳{fmt(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Reports() {
  const [period, setPeriod] = useState('6months');

  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const netSavings = totalIncome - totalExpense;
  const completedGoals = goals.filter(g => g.status === 'completed').length;

  const reportCards = [
    { label: 'Total Income', value: totalIncome, icon: TrendingUp, color: 'var(--accent-green)', bg: 'rgba(0,229,160,0.08)' },
    { label: 'Total Expense', value: totalExpense, icon: TrendingDown, color: 'var(--accent-red)', bg: 'rgba(255,77,109,0.08)' },
    { label: 'Net Savings', value: netSavings, icon: DollarSign, color: 'var(--accent-primary)', bg: 'rgba(0,212,255,0.08)' },
    { label: 'Goals Achieved', value: completedGoals, icon: Target, color: 'var(--accent-yellow)', bg: 'rgba(255,184,0,0.08)', prefix: '' },
  ];

  const profitLossData = monthlySummary.map(m => ({
    ...m,
    profit: m.income - m.expense,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title">Financial Reports</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Comprehensive overview of your finances</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select className="select" style={{ width: '160px' }} value={period} onChange={e => setPeriod(e.target.value)}>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last 1 Year</option>
            <option value="thismonth">This Month</option>
          </select>
          <button className="btn btn-secondary">
            <Download size={15} /> Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid-4 animate-fade-in-up anim-delay-1">
        {reportCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={card.label} style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              background: card.bg,
              border: `1px solid ${card.color}20`,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <Icon size={20} color={card.color} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '700', color: card.color }}>
                {card.prefix !== '' ? '৳' : ''}{fmt(card.value)}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid-2">
        {/* Profit/Loss Bar Chart */}
        <div className="card animate-fade-in-up anim-delay-2">
          <h3 className="section-title" style={{ marginBottom: '16px' }}>Monthly Profit / Loss</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={profitLossData} margin={{ top: 10, right: 5, left: 5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" />
              <Bar dataKey="profit" name="Profit/Loss" radius={[6, 6, 0, 0]}
                fill="#00E5A0"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Savings Trend */}
        <div className="card animate-fade-in-up anim-delay-3">
          <h3 className="section-title" style={{ marginBottom: '16px' }}>Savings Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlySummary} margin={{ top: 10, right: 5, left: 5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="savings" name="Savings" stroke="#00D4FF" strokeWidth={2.5}
                dot={{ fill: '#00D4FF', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#00D4FF' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income vs Expense Table */}
      <div className="card animate-fade-in-up anim-delay-4">
        <h3 className="section-title" style={{ marginBottom: '20px' }}>Monthly Breakdown</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th style={{ textAlign: 'right' }}>Income</th>
                <th style={{ textAlign: 'right' }}>Expenses</th>
                <th style={{ textAlign: 'right' }}>Savings</th>
                <th style={{ textAlign: 'right' }}>Savings Rate</th>
              </tr>
            </thead>
            <tbody>
              {monthlySummary.map(m => {
                const rate = ((m.savings / m.income) * 100).toFixed(1);
                return (
                  <tr key={m.month}>
                    <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{m.month} 2025</td>
                    <td style={{ textAlign: 'right', color: 'var(--accent-green)', fontWeight: '500' }}>+৳{fmt(m.income)}</td>
                    <td style={{ textAlign: 'right', color: 'var(--accent-red)', fontWeight: '500' }}>-৳{fmt(m.expense)}</td>
                    <td style={{ textAlign: 'right', color: 'var(--accent-primary)', fontWeight: '600', fontFamily: 'var(--font-display)' }}>
                      ৳{fmt(m.savings)}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={`badge badge-${Number(rate) >= 30 ? 'success' : Number(rate) >= 15 ? 'info' : 'danger'}`}>
                        {rate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card animate-fade-in-up anim-delay-5">
        <h3 className="section-title" style={{ marginBottom: '20px' }}>Expense by Category</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {expenseCategories.sort((a, b) => b.value - a.value).map(cat => {
            const pct = Math.round((cat.value / expenseCategories.reduce((s, c) => s + c.value, 0)) * 100);
            return (
              <div key={cat.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: cat.color }} />
                    <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{cat.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{pct}%</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>৳{fmt(cat.value)}</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct}%`, background: cat.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
