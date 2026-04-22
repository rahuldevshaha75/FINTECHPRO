import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, TrendingDown, TrendingUp, Target,
  BarChart3, Briefcase, CreditCard, FileText,
  ChevronLeft, ChevronRight, Sparkles, DollarSign
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Expenses', icon: TrendingDown, path: '/expenses' },
  { label: 'Income', icon: TrendingUp, path: '/income' },
  { label: 'Budget & Goals', icon: Target, path: '/budget' },
  { label: 'Investments', icon: Briefcase, path: '/investments' },
  { label: 'Debt Manager', icon: CreditCard, path: '/debt' },
  { label: 'Reports', icon: FileText, path: '/reports' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside
      style={{
        width: collapsed ? '72px' : 'var(--sidebar-width)',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{
        padding: '20px 20px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minHeight: '70px',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'var(--gradient-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
        }}>
          <DollarSign size={18} color="white" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
            }}>
              FinTrack<span style={{ color: 'var(--accent-primary)' }}>Pro</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '1px' }}>
              Personal Finance
            </div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: collapsed ? '10px 0' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                transition: 'var(--transition)',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(123,94,167,0.1) 100%)'
                  : 'transparent',
                border: isActive ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                animationDelay: `${i * 0.05}s`,
                position: 'relative',
              }}
              title={collapsed ? item.label : ''}
            >
              {isActive && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: '60%',
                  background: 'var(--gradient-primary)',
                  borderRadius: '0 3px 3px 0',
                }} />
              )}
              <Icon size={18} strokeWidth={isActive ? 2 : 1.75} style={{ flexShrink: 0 }} />
              {!collapsed && (
                <span style={{
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '400',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-body)',
                }}>
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Upgrade Banner */}
      {!collapsed && (
        <div style={{
          margin: '12px',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(123,94,167,0.15) 100%)',
          border: '1px solid rgba(0,212,255,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={14} color="var(--accent-primary)" />
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Pro Plan Active</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            All features unlocked. Renews in 24 days.
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        style={{
          margin: '12px',
          padding: '10px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'var(--transition)',
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--bg-card-hover)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--bg-elevated)';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        {collapsed
          ? <ChevronRight size={16} />
          : <><ChevronLeft size={16} /><span style={{ fontSize: '13px', marginLeft: '6px' }}>Collapse</span></>
        }
      </button>
    </aside>
  );
}
