import React from 'react';
import { TrendingUp, ArrowUpRight, Briefcase } from 'lucide-react';
import { investments } from '../data/investments';

const fmt = (n) => new Intl.NumberFormat('en-BD').format(n);

export default function Investments() {
  const totalInvested = investments.reduce((s, i) => s + i.amount, 0);
  const totalCurrent = investments.reduce((s, i) => s + i.currentValue, 0);
  const totalReturn = totalCurrent - totalInvested;
  const returnPct = ((totalReturn / totalInvested) * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="animate-fade-in-up">
        <h1 className="page-title">Investment Portfolio</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Track your assets and investments</p>
      </div>

      {/* Summary */}
      <div className="grid-3 animate-fade-in-up anim-delay-1">
        <div className="stat-card">
          <div className="glow cyan" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Invested</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)' }}>
            ৳{fmt(totalInvested)}
          </div>
        </div>
        <div className="stat-card">
          <div className="glow green" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Current Value</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--accent-green)' }}>
            ৳{fmt(totalCurrent)}
          </div>
        </div>
        <div className="stat-card">
          <div className="glow yellow" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Return</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--accent-green)' }}>
            +৳{fmt(totalReturn)}
            <span style={{ fontSize: '14px', color: 'var(--accent-green)', marginLeft: '8px' }}>({returnPct}%)</span>
          </div>
        </div>
      </div>

      {/* Investment Cards */}
      <div className="grid-2">
        {investments.map((inv, i) => {
          const gain = inv.currentValue - inv.amount;
          const gainPct = ((gain / inv.amount) * 100).toFixed(1);
          return (
            <div key={inv.id} className={`card animate-fade-in-up anim-delay-${(i % 3) + 1}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-md)',
                    background: `${inv.color}18`,
                    border: `1px solid ${inv.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}>
                    {inv.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {inv.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{inv.type}</div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 10px',
                  borderRadius: '100px',
                  background: 'rgba(0,229,160,0.1)',
                  color: 'var(--accent-green)',
                  fontSize: '13px',
                  fontWeight: '600',
                }}>
                  <ArrowUpRight size={13} />
                  {gainPct}%
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Invested</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    ৳{fmt(inv.amount)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Current Value</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--accent-green)', fontFamily: 'var(--font-display)' }}>
                    ৳{fmt(inv.currentValue)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Return</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--accent-green)', fontFamily: 'var(--font-display)' }}>
                    +৳{fmt(gain)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Annual Rate</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: inv.color, fontFamily: 'var(--font-display)' }}>
                    {inv.returnRate}%
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Issued: <span style={{ color: 'var(--text-secondary)' }}>{inv.issueDate}</span>
                </div>
                {inv.maturityDate && (
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Matures: <span style={{ color: 'var(--text-secondary)' }}>{inv.maturityDate}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
