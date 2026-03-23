import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  BarChart2, 
  LogOut, 
  Clock, 
  RefreshCw,
  UserCheck,
  UserX,
  Trash2,
  AlertOctagon,
  TrendingUp
} from "lucide-react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  // States
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [logs, setLogs] = useState([]);

  const token = localStorage.getItem("token");

  // ================= FETCH DATA =================
  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [resAnal, resUsers, resPayments, resLogs] = await Promise.all([
        fetch(`${API}/api/admin/analytics/`, { headers }),
        fetch(`${API}/api/admin/users/`, { headers }),
        fetch(`${API}/api/admin/payments/`, { headers }),
        fetch(`${API}/api/admin/logs/`, { headers })
      ]);

      if (resAnal.ok) setAnalytics(await resAnal.json());
      if (resUsers.ok) setUsers(await resUsers.json());
      if (resPayments.ok) setPayments(await resPayments.json());
      if (resLogs.ok) setLogs(await resLogs.json());

    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Real-time polling every 5 seconds (Hardened)
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [token]);


  // ================= USER ACTIONS =================
  const handleUserAction = async (userId, action) => {
    try {
      const res = await fetch(`${API}/api/admin/users/${userId}/action/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ action })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      toast.success(data.message);
      fetchData(); // Refresh list

    } catch (err) {
      toast.error(err.message);
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading && !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <RefreshCw className="w-8 h-8 text-violet-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-800 dark:text-slate-100 font-sans">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-10">
        <div className="p-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800">
          <img src="/logo.png" className="h-8 w-8" alt="Logo" />
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Admin panel</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab("dashboard")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500'}`}
          >
            <BarChart2 className="w-4 h-4" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("users")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500'}`}
          >
            <Users className="w-4 h-4" /> User Management
          </button>
          <button 
            onClick={() => setActiveTab("payments")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'payments' ? 'bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500'}`}
          >
            <DollarSign className="w-4 h-4" /> Payments
          </button>
          <button 
            onClick={() => setActiveTab("logs")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'logs' ? 'bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500'}`}
          >
            <Clock className="w-4 h-4" /> Activity Logs
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 ml-64 p-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
          <button onClick={fetchData} className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* TAB VIEWS */}
        {activeTab === "dashboard" && analytics && (
          <div className="space-y-8">
            
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft flex items-center gap-4">
                <div className="p-4 bg-violet-50 dark:bg-violet-950/50 rounded-xl text-violet-600 dark:text-violet-400"><Users className="w-6 h-6" /></div>
                <div><p className="text-sm text-slate-400">Total Users</p><p className="text-2xl font-bold">{analytics.total_users}</p></div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft flex items-center gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-emerald-600 dark:text-emerald-400"><ShoppingBag className="w-6 h-6" /></div>
                <div><p className="text-sm text-slate-400">Total Orders</p><p className="text-2xl font-bold">{analytics.total_orders}</p></div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft flex items-center gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-blue-600 dark:text-blue-400"><DollarSign className="w-6 h-6" /></div>
                <div><p className="text-sm text-slate-400">Revenue</p><p className="text-2xl font-bold">₹{analytics.total_revenue}</p></div>
              </div>
            </div>

            {/* CHART (CSS/SVG Based) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-violet-600" /> Sales Trend (Last 7 Days)</h2>
              <div className="flex items-end gap-3 h-48 border-b border-l border-slate-100 dark:border-slate-800 pl-4 pb-1">
                {analytics.daily_sales.map((s, idx) => {
                  const maxSale = Math.max(...analytics.daily_sales.map(x => x.revenue)) || 1;
                  const height = `${(s.revenue / maxSale) * 100}%`;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div style={{ height }} className="w-full bg-gradient-to-t from-violet-600 to-fuchsia-500 rounded-t-lg transition-all hover:opacity-80 relative">
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-white px-2 py-0.5 rounded shadow">₹{s.revenue}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 truncate w-full text-center">{s.date.split('-').slice(1).join('/')}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-soft overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs text-slate-400 uppercase">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{u.id}</td>
                    <td className="px-6 py-4">
                      <div><p className="font-semibold text-slate-900 dark:text-slate-100">{u.username}</p><p className="text-xs text-slate-400">{u.email}</p></div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.status === 'active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50' : 'bg-red-50 text-red-600 dark:bg-red-950/50'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{new Date(u.date_joined).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {u.status === "active" ? (
                          <>
                            <button onClick={() => handleUserAction(u.id, "suspend")} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/50 text-amber-600 transition-colors" title="Suspend"><AlertOctagon className="w-4 h-4" /></button>
                            <button onClick={() => handleUserAction(u.id, "block")} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/50 text-orange-600 transition-colors" title="Block"><UserX className="w-4 h-4" /></button>
                          </>
                        ) : (
                          <button onClick={() => handleUserAction(u.id, "activate")} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-emerald-600 transition-colors" title="Unblock"><UserCheck className="w-4 h-4" /></button>
                        )}
                        <button onClick={() => handleUserAction(u.id, "delete")} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-950/50 text-red-600 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "logs" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-soft overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs text-slate-400 uppercase">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{l.username}</td>
                    <td className="px-6 py-4"><span className="font-mono text-xs">{l.action}</span></td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{new Date(l.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-soft overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs text-slate-400 uppercase">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">#{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{p.user}</td>
                    <td className="px-6 py-4 font-semibold">₹{p.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.status === 'paid' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/50'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs capitalize">{p.payment_method || "N/A"}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{new Date(p.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>
    </div>
  );
}
