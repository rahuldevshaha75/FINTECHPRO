# FinTrackPro — Personal Finance Tracker

A full-featured personal finance management system built with ReactJS.
Designed for MERN stack migration in future phases.

## 🗂️ Folder Structure

```
finance-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx       # Collapsible sidebar nav
│   │   │   └── Navbar.jsx        # Top navbar with notifications
│   │   ├── dashboard/            # (future: split dashboard widgets)
│   │   ├── expense/              # (future: expense sub-components)
│   │   ├── income/               # (future: income sub-components)
│   │   ├── budget/               # (future: budget components)
│   │   ├── investment/           # (future: investment components)
│   │   ├── debt/                 # (future: debt components)
│   │   ├── reports/              # (future: report components)
│   │   ├── auth/                 # (future: login/signup/OTP)
│   │   └── common/               # (future: shared UI components)
│   ├── data/                     # 📦 JSON demo data (replace with API calls in MERN)
│   │   ├── transactions.js       # Expenses & income demo data
│   │   ├── budgets.js            # Budgets & goals demo data
│   │   ├── investments.js        # Investments & debts demo data
│   │   └── user.js               # User profile & notifications
│   ├── hooks/                    # (future: custom React hooks)
│   ├── pages/
│   │   ├── Dashboard.jsx         # Main dashboard with charts
│   │   ├── Expenses.jsx          # Expense CRUD + table
│   │   ├── Income.jsx            # Income CRUD + chart
│   │   ├── Budget.jsx            # Budget limits + goals
│   │   ├── Investments.jsx       # Investment portfolio
│   │   ├── Debt.jsx              # Debt tracker
│   │   └── Reports.jsx           # Financial reports
│   ├── styles/
│   │   └── globals.css           # Design system + CSS variables
│   ├── utils/                    # (future: helper functions)
│   ├── App.jsx                   # Root with routing
│   └── index.js                  # Entry point
└── package.json
```

## 🚀 Getting Started

```bash
npm install
npm start
```

## 📋 Features Implemented (Frontend)

| Feature | Status |
|---|---|
| Dashboard with charts | ✅ |
| Expense tracking (CRUD) | ✅ |
| Income tracking (CRUD) | ✅ |
| Budget management | ✅ |
| Financial goals | ✅ |
| Investment portfolio | ✅ |
| Debt manager | ✅ |
| Reports & analytics | ✅ |
| Collapsible sidebar | ✅ |
| Notification system | ✅ |
| Responsive design | ✅ |

## 🔜 MERN Migration Plan

- Replace `src/data/*.js` files with API calls (`axios`/`fetch`)
- Add `src/services/` folder for API service files
- Add `src/context/` or Redux for global state
- Add `src/hooks/useAuth.js`, `useTransactions.js`, etc.
- Backend: Express.js + MongoDB + Mongoose
- Auth: JWT + bcrypt + OTP via email
- Payments: SSLCommerz / Stripe integration

## 🎨 Design System

- **Font**: Syne (display) + DM Sans (body)
- **Theme**: Dark mode with electric cyan + purple gradient accents
- **Colors**: CSS variables in `globals.css`
- **Currency**: BDT (৳) — configurable per user
