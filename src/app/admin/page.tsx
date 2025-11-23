import { isAdmin, getOrCreateCsrfToken } from "@/lib/CsrfSessionManagement";
import { listItems, listRentals } from "@/lib/RentalManagementSystem";
import { redirect } from "next/navigation";
import DeleteItemButton from "@/src/components/DeleteItemButton";
import EditItemModal from "@/src/components/EditItemModal";
import AddItemModal from "@/src/components/AddItemModal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type AdminItem = {
  id: number | string;
  name: string;
  category: string;
  sizes: string[];
  pricePerDay: number;
  color: string;
  style?: string;
  description: string;
};

export default async function Page() {
  if (!isAdmin()) redirect("/admin/login");
  const csrf = await getOrCreateCsrfToken();

  const items = listItems();
  const rentals = listRentals();
  const activeRentals = rentals.filter(r => r.status === "active");

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-fuchsia-50 via-rose-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-600 to-rose-500 flex items-center justify-center">
                  <span className="text-xl">👑</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Manage inventory, rentals, and system settings
              </p>
            </div>
            <form action="/api/admin/logout" method="POST">
              <button className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <span>🚪</span>
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center text-2xl">
                👗
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Items</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{items.length}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center text-2xl">
                📦
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Rentals</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{activeRentals.length}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 flex items-center justify-center text-2xl">
                📊
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Rentals</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{rentals.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">

        {/* Inventory Section */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>📦</span>
                  <span>Inventory Management</span>
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Manage your product catalog
                </p>
              </div>
              <AddItemModal csrf={csrf} />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead id="table-header">
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">ID</th>
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">Name</th>
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">Category</th>
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">Sizes</th>
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">Price/day</th>
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i: AdminItem) => (
                  <tr key={i.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-slate-100 font-medium">{i.id}</td>
                    <td className="py-4 px-6 text-slate-900 dark:text-slate-100">{i.name}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/30 px-2.5 py-0.5 text-xs font-medium text-fuchsia-700 dark:text-fuchsia-300">
                        {i.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{i.sizes.join(", ")}</td>
                    <td className="py-4 px-6 text-slate-900 dark:text-slate-100 font-semibold">${i.pricePerDay}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <EditItemModal item={i} csrf={csrf} />
                        <DeleteItemButton itemId={i.id} csrf={csrf} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Rentals Section */}
        <section className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-6 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>📅</span>
                <span>Scheduled Rentals</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                View and manage customer bookings
              </p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">Rental ID</th>
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">Item</th>
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">Dates</th>
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">Customer</th>
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">Status</th>
                  <th className="py-3 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-6">
                      <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono text-slate-700 dark:text-slate-300">
                        {r.id.slice(0, 8)}
                      </code>
                    </td>
                    <td className="py-4 px-6 text-slate-900 dark:text-slate-100 font-medium">#{r.itemId}</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <span>{r.start}</span>
                        <span className="text-slate-400">→</span>
                        <span>{r.end}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-slate-900 dark:text-slate-100 font-medium">{r.customer.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {r.customer.email}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {r.customer.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {r.status === "active" ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-300">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                          Canceled
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {r.status === "active" ? (
                        <form
                          action={`/api/admin/rentals/${r.id}/cancel`}
                          method="POST"
                        >
                          <input type="hidden" name="csrf" value={csrf} />
                          <button className="inline-flex items-center rounded-lg border-2 border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-red-300 dark:hover:border-red-700 transition-all">
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
                {rentals.length === 0 && (
                  <tr>
                    <td className="py-12 text-center text-slate-500 dark:text-slate-400" colSpan={6}>
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">📭</span>
                        <p className="font-medium">No rentals yet</p>
                        <p className="text-xs">Bookings will appear here once customers make reservations</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
