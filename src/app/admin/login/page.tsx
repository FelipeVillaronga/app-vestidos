import { getOrCreateCsrfToken } from "@/lib/CsrfSessionManagement";
export default async function AdminLogin() {
  const csrf = await getOrCreateCsrfToken();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Admin sign in</h1>
        <form
          action="/api/admin/login"
          method="POST"
          className="mt-6 grid gap-3 rounded-2xl border p-6 bg-white dark:bg-slate-900 shadow-sm"
        >
          <input type="hidden" name="csrf" value={csrf} />
          <input
            name="username"
            placeholder="Username"
            className="rounded-xl border px-4 py-3 text-sm"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="rounded-xl border px-4 py-3 text-sm"
          />
          <button className="rounded-xl bg-fuchsia-600 text-white px-4 py-3 text-sm font-semibold hover:bg-fuchsia-500 transition-colors">
            Sign in
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Protected area. Authorized staff only.
          </p>
        </form>
      </div>
    </div>
  );
}
