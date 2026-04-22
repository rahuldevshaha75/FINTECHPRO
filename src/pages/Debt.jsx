import React from 'react';
import { AlertTriangle, Calendar, TrendingDown } from 'lucide-react';
import { debts } from '../data/investments';

const fmt = (n) => new Intl.NumberFormat('en-BD').format(n);

export default function Debt() {
  const totalDebt = debts.reduce((s, d) => s + d.remaining, 0);
  const totalMonthly = debts.reduce((s, d) => s + d.monthlyPayment, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="animate-fade-in-up">
        <h1 className="page-title">Debt Manager</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Track loans, EMIs and repayment progress</p>
      </div>

      <div className="grid-3 animate-fade-in-up anim-delay-1">
        <div className="stat-card">
          <div className="glow red" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Debt</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--accent-red)' }}>
            ৳{fmt(totalDebt)}
          </div>
        </div>
        <div className="stat-card">
          <div className="glow yellow" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Monthly Payments</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--accent-yellow)' }}>
            ৳{fmt(totalMonthly)}
          </div>
        </div>
        <div className="stat-card">
          <div className="glow cyan" />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Active Loans</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {debts.length}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {debts.map((debt, i) => {
          const paid = debt.principal - debt.remaining;
          const pct = Math.round((paid / debt.principal) * 100);
          const daysUntilDue = Math.ceil((new Date(debt.nextPayment) - new Date()) / 86400000);
          const urgent = daysUntilDue <= 7;

          return (
            <div key={debt.id} className={`card animate-fade-in-up anim-delay-${i + 1}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-md)',
                    background: `${debt.color}18`,
                    border: `1px solid ${debt.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}>
                    {debt.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {debt.lender}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{debt.type}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>Remaining</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--accent-red)' }}>
                      ৳{fmt(debt.remaining)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>Monthly EMI</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                      ৳{fmt(debt.monthlyPayment)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>Interest</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: debt.interestRate === 0 ? 'var(--accent-green)' : 'var(--accent-yellow)' }}>
                      {debt.interestRate === 0 ? 'Interest Free' : `${debt.interestRate}% p.a.`}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Repayment Progress</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: debt.color }}>{pct}% paid</span>
                </div>
                <div className="progress-bar" style={{ height: '8px' }}>
                  <div className="progress-fill" style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${debt.color} 0%, ${debt.color}99 100%)`,
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Paid: ৳{fmt(paid)}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Principal: ৳{fmt(debt.principal)}</span>
                </div>
              </div>

              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: urgent ? 'rgba(255,77,109,0.06)' : 'rgba(255,255,255,0.02)',
                border: urgent ? '1px solid rgba(255,77,109,0.15)' : '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                {urgent ? <AlertTriangle size={14} color="var(--accent-red)" /> : <Calendar size={14} color="var(--text-muted)" />}
                <span style={{ fontSize: '13px', color: urgent ? 'var(--accent-red)' : 'var(--text-secondary)' }}>
                  Next payment: <strong>{debt.nextPayment}</strong>
                  {urgent && ` — Due in ${daysUntilDue} days!`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
