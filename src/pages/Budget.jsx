import React, { useState } from 'react';
import { Target, Plus, AlertTriangle, CheckCircle, TrendingUp, X } from 'lucide-react';
import { budgets as initialBudgets, goals as initialGoals } from '../data/budgets';

const fmt = (n) => new Intl.NumberFormat('en-BD').format(n);

export default function Budget() {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [goals, setGoals] = useState(initialGoals);
  const [activeTab, setActiveTab] = useState('budgets');
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', saved: '', deadline: '', icon: '🎯' });

  const icons = ['🎯', '🛡️', '💻', '✈️', '🚗', '🏠', '💍', '📱', '🎓', '🏦'];

  const handleAddGoal = () => {
    setGoals(prev => [...prev, {
      id: Date.now(),
      ...newGoal,
      target: Number(newGoal.target),
      saved: Number(newGoal.saved),
      color: ['#4ECDC4', '#45B7D1', '#96CEB4', '#FF6B6B', '#DDA0DD'][Math.floor(Math.random() * 5)],
      status: 'active',
    }]);
    setShowGoalModal(false);
    setNewGoal({ name: '', target: '', saved: '', deadline: '', icon: '🎯' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="animate-fade-in-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title">Budget & Goals</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Monitor spending limits and financial goals</p>
        </div>
        {activeTab === 'goals' && (
          <button className="btn btn-primary" onClick={() => setShowGoalModal(true)}>
            <Plus size={16} /> New Goal
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="animate-fade-in-up anim-delay-1" style={{
        display: 'flex',
        gap: '4px',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        padding: '4px',
        width: 'fit-content',
        border: '1px solid var(--border-subtle)',
      }}>
        {['budgets', 'goals'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'var(--transition)',
              background: activeTab === tab ? 'var(--bg-elevated)' : 'transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
              borderColor: activeTab === tab ? 'var(--border-normal)' : 'transparent',
              textTransform: 'capitalize',
            }}
          >
            {tab === 'budgets' ? '📊 Budgets' : '🎯 Goals'}
          </button>
        ))}
      </div>

      {/* Budgets Tab */}
      {activeTab === 'budgets' && (
        <div>
          <div className="grid-2">
            {budgets.map((b, i) => {
              const pct = Math.round((b.spent / b.limit) * 100);
              const over = pct > 100;
              const warning = pct > 80 && !over;
              return (
                <div key={b.id} className={`card animate-fade-in-up anim-delay-${(i % 3) + 1}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {b.category}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{b.period} budget</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {over && <AlertTriangle size={14} color="var(--accent-red)" />}
                      {warning && <AlertTriangle size={14} color="var(--accent-yellow)" />}
                      <span className={over ? 'badge-danger' : warning ? 'badge-warning' : 'badge-success'}
                        style={{
                          padding: '3px 10px',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'inline-flex',
                        }}>
                        {pct}%
                      </span>
                    </div>
                  </div>

                  <div className="progress-bar" style={{ height: '8px', marginBottom: '12px' }}>
                    <div className="progress-fill" style={{
                      width: `${Math.min(pct, 100)}%`,
                      background: over
                        ? 'var(--gradient-danger)'
                        : warning
                          ? 'linear-gradient(135deg, #FFB800 0%, #FF6B00 100%)'
                          : `linear-gradient(135deg, ${b.color} 0%, ${b.color}aa 100%)`,
                    }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-display)', color: over ? 'var(--accent-red)' : 'var(--text-primary)' }}>
                        ৳{fmt(b.spent)}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}> / ৳{fmt(b.limit)}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: over ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: '500' }}>
                      {over ? `৳${fmt(b.spent - b.limit)} over` : `৳${fmt(b.limit - b.spent)} left`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="grid-2">
          {goals.map((goal, i) => {
            const pct = Math.min(Math.round((goal.saved / goal.target) * 100), 100);
            const completed = goal.status === 'completed';
            const daysLeft = goal.deadline
              ? Math.ceil((new Date(goal.deadline) - new Date()) / 86400000)
              : null;
            return (
              <div key={goal.id} className={`card animate-fade-in-up anim-delay-${(i % 3) + 1}`}
                style={{ opacity: completed ? 0.75 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: `${goal.color}20`,
                      border: `1px solid ${goal.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                    }}>
                      {goal.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>{goal.name}</div>
                      {daysLeft !== null && (
                        <div style={{ fontSize: '12px', color: daysLeft < 30 ? 'var(--accent-red)' : 'var(--text-muted)' }}>
                          {completed ? 'Completed!' : daysLeft > 0 ? `${daysLeft} days left` : 'Overdue!'}
                        </div>
                      )}
                    </div>
                  </div>
                  {completed
                    ? <CheckCircle size={18} color="var(--accent-green)" />
                    : <span style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'var(--font-display)', color: goal.color }}>{pct}%</span>
                  }
                </div>

                <div className="progress-bar" style={{ height: '8px', marginBottom: '12px' }}>
                  <div className="progress-fill" style={{
                    width: `${pct}%`,
                    background: completed
                      ? 'var(--gradient-green)'
                      : `linear-gradient(135deg, ${goal.color} 0%, ${goal.color}99 100%)`,
                  }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-display)', color: goal.color }}>
                      ৳{fmt(goal.saved)}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}> / ৳{fmt(goal.target)}</span>
                  </div>
                  {!completed && (
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      ৳{fmt(goal.target - goal.saved)} remaining
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Goal Modal */}
      {showGoalModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowGoalModal(false)}>
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '700' }}>New Financial Goal</h2>
              <button className="btn-icon" onClick={() => setShowGoalModal(false)}><X size={16} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="input-group">
                <label className="input-label">Icon</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {icons.map(ic => (
                    <button key={ic} onClick={() => setNewGoal(g => ({ ...g, icon: ic }))}
                      style={{
                        width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
                        border: `2px solid ${newGoal.icon === ic ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                        background: newGoal.icon === ic ? 'rgba(0,212,255,0.1)' : 'var(--bg-elevated)',
                        cursor: 'pointer', fontSize: '18px',
                      }}
                    >{ic}</button>
                  ))}
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Goal Name</label>
                <input className="input" placeholder="e.g. Vacation Fund" value={newGoal.name}
                  onChange={e => setNewGoal(g => ({ ...g, name: e.target.value }))} />
              </div>
              <div className="grid-2">
                <div className="input-group">
                  <label className="input-label">Target Amount (৳)</label>
                  <input className="input" type="number" placeholder="0" value={newGoal.target}
                    onChange={e => setNewGoal(g => ({ ...g, target: e.target.value }))} />
                </div>
                <div className="input-group">
                  <label className="input-label">Already Saved (৳)</label>
                  <input className="input" type="number" placeholder="0" value={newGoal.saved}
                    onChange={e => setNewGoal(g => ({ ...g, saved: e.target.value }))} />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Deadline</label>
                <input className="input" type="date" value={newGoal.deadline}
                  onChange={e => setNewGoal(g => ({ ...g, deadline: e.target.value }))} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button className="btn btn-secondary w-full" onClick={() => setShowGoalModal(false)}>Cancel</button>
                <button className="btn btn-primary w-full" onClick={handleAddGoal}>Create Goal</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
