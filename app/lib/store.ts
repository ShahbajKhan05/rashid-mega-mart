// lib/store.ts

export type StaffMember = {
  id: string;
  name: string;
  pin: string;
  active: boolean;
  createdAt: string;
};

export type StaffSale = {
  orderId: string;
  staffId: string;
  staffName: string;
  total: number;
  date: string;
  method: string;
};

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export const safeGet = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const safeSet = (key: string, value: any): boolean => {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

// ---------- STAFF ----------
export const getStaffList = (): StaffMember[] =>
  safeGet<StaffMember[]>("rmm_staff_list", []);

export const saveStaffList = (list: StaffMember[]) =>
  safeSet("rmm_staff_list", list);

export const tagSaleWithStaff = (sale: StaffSale) => {
  const all = safeGet<StaffSale[]>("rmm_staff_sales", []);
  safeSet("rmm_staff_sales", [sale, ...all]);
};

export const getStaffSalesSummary = () => {
  const all = safeGet<StaffSale[]>("rmm_staff_sales", []);
  const map: Record<string, { staffId: string; staffName: string; total: number; count: number }> = {};
  all.forEach(s => {
    if (!map[s.staffId]) {
      map[s.staffId] = { staffId: s.staffId, staffName: s.staffName, total: 0, count: 0 };
    }
    map[s.staffId].total += s.total || 0;
    map[s.staffId].count += 1;
  });
  return Object.values(map).sort((a, b) => b.total - a.total);
};

// ---------- REVENUE ----------
export const getAllRevenue = () => {
  const pos = safeGet<any[]>("rmm_orders", []).filter(o => o.status === "Completed");
  const web = safeGet<any[]>("rmm_website_orders", []).filter(
    o => o.status === "Delivered" || o.status === "Completed"
  );
  const posTotal = pos.reduce((s, o) => s + (o.total || 0), 0);
  const webTotal = web.reduce((s, o) => s + (o.total || 0), 0);
  return { posTotal, webTotal, total: posTotal + webTotal };
};

// ---------- EXPENSES ----------
export const getExpenses = (): Expense[] =>
  safeGet<Expense[]>("rmm_expenses", []);