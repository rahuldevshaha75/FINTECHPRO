import React, { useState } from 'react';
import { Bell, LogOut, Crown, X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { currentUser, notifications } from '../../data/user';

const iconMap = {
  success: <CheckCircle size={14} color="var(--accent-green)" />,
  warning: <AlertTriangle size={14} color="var(--accent-yellow)" />,
  info: <Info size={14} color="var(--accent-primary)" />,
};

export default function Navbar({ sidebarCollapsed }) {
  const [showNotif, setShowNotif] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: sidebarCollapsed ? '72px' : 'var(--sidebar-width)',
      right: 0,
      height: 'var(--navbar-height)',
      zIndex: 99,
      background: 'rgba(10, 14, 26, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      {/* Left: Page greeting */}
      <div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {new Date().toLocaleDateString('en-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '1px' }}>
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {currentUser.name.split(' ')[0]} 👋
        </div>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Pro Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '100px',
          background: 'linear-gradient(135deg, rgba(255,184,0,0.15) 0%, rgba(255,107,0,0.1) 100%)',
          border: '1px solid rgba(255,184,0,0.2)',
        }}>
          <Crown size={12} color="var(--accent-yellow)" />
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent-yellow)' }}>PRO</span>
        </div>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="btn-icon"
            style={{
              position: 'relative',
              background: showNotif ? 'var(--bg-card-hover)' : undefined,
            }}
          >
            <Bell size={18} />
            {unread > 0 && (
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--accent-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: '700',
                color: 'white',
                animation: 'pulse-glow 2s infinite',
              }}>
                {unread}
              </div>
            )}
          </button>

          {/* Dropdown */}
          {showNotif && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              right: 0,
              width: '340px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-normal)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
              zIndex: 200,
              animation: 'fadeInUp 0.2s ease',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '15px' }}>
                  Notifications
                  {unread > 0 && (
                    <span style={{
                      marginLeft: '8px',
                      padding: '2px 8px',
                      background: 'rgba(255,77,109,0.15)',
                      color: 'var(--accent-red)',
                      borderRadius: '100px',
                      fontSize: '11px',
                    }}>{unread} new</span>
                  )}
                </div>
                <button onClick={() => setShowNotif(false)} className="btn-icon" style={{ padding: '4px' }}>
                  <X size={14} />
                </button>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid var(--border-subtle)',
                    background: n.read ? 'transparent' : 'rgba(0,212,255,0.03)',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    transition: 'var(--transition)',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = n.read ? 'transparent' : 'rgba(0,212,255,0.03)'}
                  >
                    <div style={{ marginTop: '2px', flexShrink: 0 }}>{iconMap[n.type]}</div>
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.4 }}>{n.message}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{n.time}</div>
                    </div>
                    {!n.read && (
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--accent-primary)',
                        flexShrink: 0,
                        marginTop: '6px',
                        marginLeft: 'auto',
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: '700',
            fontSize: '14px',
            color: 'white',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,212,255,0.25)',
          }}>
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{currentUser.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{currentUser.currency} • {currentUser.plan}</div>
          </div>
        </div>

        <button className="btn-icon" title="Logout">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
