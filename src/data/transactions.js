// Demo Expense Data
export const expenses = [
  { id: 1, amount: 3500, category: "Food & Dining", note: "Groceries from Shwapno", date: "2025-04-01", type: "expense" },
  { id: 2, amount: 1200, category: "Transport", note: "CNG & Rickshaw fare", date: "2025-04-02", type: "expense" },
  { id: 3, amount: 8000, category: "Rent", note: "Monthly rent", date: "2025-04-03", type: "expense" },
  { id: 4, amount: 650, category: "Utilities", note: "Electricity bill", date: "2025-04-05", type: "expense" },
  { id: 5, amount: 2100, category: "Healthcare", note: "Doctor visit & medicine", date: "2025-04-07", type: "expense" },
  { id: 6, amount: 900, category: "Entertainment", note: "Netflix + Spotify", date: "2025-04-10", type: "expense" },
  { id: 7, amount: 4200, category: "Shopping", note: "Clothes & accessories", date: "2025-04-12", type: "expense" },
  { id: 8, amount: 300, category: "Food & Dining", note: "Lunch with colleagues", date: "2025-04-14", type: "expense" },
  { id: 9, amount: 750, category: "Education", note: "Online course subscription", date: "2025-04-16", type: "expense" },
  { id: 10, amount: 1500, category: "Transport", note: "Uber rides", date: "2025-04-18", type: "expense" },
  { id: 11, amount: 500, category: "Food & Dining", note: "Restaurant dinner", date: "2025-04-20", type: "expense" },
  { id: 12, amount: 2800, category: "Healthcare", note: "Pharmacy", date: "2025-04-22", type: "expense" },
];

// Demo Income Data
export const incomes = [
  { id: 1, amount: 45000, source: "Salary", note: "Monthly salary", date: "2025-04-01", type: "income" },
  { id: 2, amount: 8500, source: "Freelance", note: "Web development project", date: "2025-04-05", type: "income" },
  { id: 3, amount: 2000, source: "Interest", note: "Bank interest", date: "2025-04-10", type: "income" },
  { id: 4, amount: 5000, source: "Side Business", note: "Online store earnings", date: "2025-04-15", type: "income" },
  { id: 5, amount: 1500, source: "Investment Return", note: "Dividend from stocks", date: "2025-04-20", type: "income" },
];

// Monthly summary (last 6 months)
export const monthlySummary = [
  { month: "Nov", income: 52000, expense: 28400, savings: 23600 },
  { month: "Dec", income: 58000, expense: 32100, savings: 25900 },
  { month: "Jan", income: 45000, expense: 27800, savings: 17200 },
  { month: "Feb", income: 61000, expense: 31200, savings: 29800 },
  { month: "Mar", income: 55000, expense: 29600, savings: 25400 },
  { month: "Apr", income: 62000, expense: 26400, savings: 35600 },
];

export const expenseCategories = [
  { name: "Food & Dining", value: 4500, color: "#FF6B6B" },
  { name: "Transport", value: 2700, color: "#4ECDC4" },
  { name: "Rent", value: 8000, color: "#45B7D1" },
  { name: "Utilities", value: 650, color: "#96CEB4" },
  { name: "Healthcare", value: 4900, color: "#FFEAA7" },
  { name: "Entertainment", value: 900, color: "#DDA0DD" },
  { name: "Shopping", value: 4200, color: "#98D8C8" },
];

export const recentTransactions = [
  ...expenses.slice(0, 5).map(e => ({ ...e, type: "expense" })),
  ...incomes.slice(0, 3).map(i => ({ ...i, type: "income" })),
].sort((a, b) => new Date(b.date) - new Date(a.date));
