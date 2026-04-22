import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, Target,
  ArrowUpRight, ArrowDownRight, Briefcase, CreditCard,
  Plus, Eye
} from 'lucide-react';
import { monthlySummary, expenseCategories, recentTransactions, expenses, incomes } from '../data/transactions';
import { goals } from '../data/budgets';
import { debts, investments } from '../data/investments';
import { currentUser } from '../data/user';
import { useNavigate } from 'react-router-dom';
const fmt = (n) => new Intl.NumberFormat('en-BD').format(n);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-normal)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
      }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{p.name}:</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
              ৳{fmt(p.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function AnimatedNumber({ value, prefix = '৳' }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{fmt(display)}</span>;
}

export default function Dashboard() {
  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const savings = totalIncome - totalExpense;
  const totalDebt = debts.reduce((s, d) => s + d.remaining, 0);
  const totalInvestment = investments.reduce((s, i) => s + i.currentValue, 0);

  const statCards = [
    {
      title: 'Total Income',
      value: totalIncome,
      change: '+12.4%',
      positive: true,
      icon: TrendingUp,
      glow: 'green',
      gradient: 'var(--gradient-green)',
    },
    {
      title: 'Total Expense',
      value: totalExpense,
      change: '-3.2%',
      positive: true,
      icon: TrendingDown,
      glow: 'red',
      gradient: 'var(--gradient-danger)',
    },
    {
      title: 'Net Savings',
      value: savings,
      change: '+8.1%',
      positive: true,
      icon: DollarSign,
      glow: 'cyan',
      gradient: 'var(--gradient-primary)',
    },
    {
      title: 'Investments',
      value: totalInvestment,
      change: '+5.7%',
      positive: true,
      icon: Briefcase,
      glow: 'yellow',
      gradient: 'var(--gradient-gold)',
    },
  ];

  const navigate = useNavigate();


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title">Financial Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            April 2025 Overview — Currency: {currentUser.currencySymbol}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
              className="btn btn-secondary"
              style={{fontSize: '13px'}}
              onClick={() => navigate('/reports')}
          >
            <Eye size={15}/> View Reports
          </button>
          <button
              className="btn btn-primary"
              style={{fontSize: '13px'}}
              onClick={() => navigate('/expenses')}
          >
            <Plus size={15}/> Add Transaction
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`stat-card animate-fade-in-up anim-delay-${i + 1}`}
            >
              <div className={`glow ${card.glow}`} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  background: card.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon size={20} color="white" />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: card.positive ? 'var(--accent-green)' : 'var(--accent-red)',
                  background: card.positive ? 'rgba(0,229,160,0.1)' : 'rgba(255,77,109,0.1)',
                  padding: '3px 8px',
                  borderRadius: '100px',
                }}>
                  {card.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {card.change}
                </div>
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}>
                <AnimatedNumber value={card.value} />
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{card.title}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Area Chart */}
        <div className="card animate-fade-in-up anim-delay-2">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className="section-title">Income vs Expenses</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlySummary} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4D6D" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF4D6D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" name="Income" stroke="#00E5A0" strokeWidth={2} fill="url(#incomeGrad)" dot={{ fill: '#00E5A0', r: 3 }} />
              <Area type="monotone" dataKey="expense" name="Expense" stroke="#FF4D6D" strokeWidth={2} fill="url(#expenseGrad)" dot={{ fill: '#FF4D6D', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card animate-fade-in-up anim-delay-3">
          <div style={{ marginBottom: '16px' }}>
            <h3 className="section-title">Expense Breakdown</h3>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={expenseCategories} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {expenseCategories.map((entry, index) => (
                  <Cell key={index} fill={entry.color} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip formatter={(val) => [`৳${fmt(val)}`, '']} contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-normal)', borderRadius: '8px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            {expenseCategories.slice(0, 4).map(cat => (
              <div key={cat.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: cat.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{cat.name}</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-primary)' }}>৳{fmt(cat.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {/* Recent Transactions */}
        <div className="card animate-fade-in-up anim-delay-3" style={{ gridColumn: 'span 1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="section-title">Recent Transactions</h3>
            <button className="btn btn-secondary btn-sm">View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {recentTransactions.slice(0, 5).map(t => (
              <div key={t.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                transition: 'var(--transition)',
                cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: 'var(--radius-sm)',
                    background: t.type === 'income' ? 'rgba(0,229,160,0.1)' : 'rgba(255,77,109,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {t.type === 'income'
                      ? <TrendingUp size={15} color="var(--accent-green)" />
                      : <TrendingDown size={15} color="var(--accent-red)" />
                    }
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>
                      {t.category || t.source}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.date}</div>
                  </div>
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: t.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)',
                }}>
                  {t.type === 'income' ? '+' : '-'}৳{fmt(t.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Goals */}
        <div className="card animate-fade-in-up anim-delay-4">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="section-title">Active Goals</h3>
            <Target size={16} color="var(--text-muted)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {goals.filter(g => g.status === 'active').map(goal => {
              const pct = Math.round((goal.saved / goal.target) * 100);
              return (
                <div key={goal.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px' }}>{goal.icon}</span>
                      <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{goal.name}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${pct}%`, background: goal.color }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>৳{fmt(goal.saved)}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>৳{fmt(goal.target)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Debt Overview */}
        <div className="card animate-fade-in-up anim-delay-5">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="section-title">Debt Overview</h3>
            <CreditCard size={16} color="var(--text-muted)" />
          </div>
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255,77,109,0.06)',
            border: '1px solid rgba(255,77,109,0.12)',
            marginBottom: '14px',
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Remaining Debt</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-red)', fontFamily: 'var(--font-display)' }}>
              ৳{fmt(totalDebt)}
            </div>
          </div>
          {debts.map(debt => {
            const pct = Math.round(((debt.principal - debt.remaining) / debt.principal) * 100);
            return (
              <div key={debt.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px' }}>{debt.icon}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{debt.lender}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--accent-red)', fontWeight: '500' }}>
                    ৳{fmt(debt.remaining)}
                  </span>
                </div>
                <div className="progress-bar" style={{ height: '4px' }}>
                  <div className="progress-fill" style={{ width: `${pct}%`, background: debt.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
