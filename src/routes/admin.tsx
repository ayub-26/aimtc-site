import { createFileRoute, Link } from "@tanstack/react-router";

import { ADMIN_TOOLS, AdminShell } from "@/components/admin/admin-shell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "অ্যাডমিন ড্যাশবোর্ড" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AdminShell title="ড্যাশবোর্ড">
      <p className="-mt-4 mb-8 text-muted-foreground">আসসালামু আলাইকুম, আইয়ুব স্যার। যে টুল ব্যবহার করবেন সেটি বেছে নিন।</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ADMIN_TOOLS.map(({ to, title, desc, Icon }) => (
          <Link key={to} to={to} className="group rounded-3xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-1 hover:border-gold">
            <span className="grid size-12 place-items-center rounded-2xl bg-gradient-gold text-deep shadow-gold"><Icon className="size-6" /></span>
            <h2 className="mt-4 text-xl font-bold">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </Link>
        ))}
        <div className="grid place-items-center rounded-3xl border border-dashed border-border p-7 text-center text-sm text-muted-foreground">
          নতুন টুল এখানে যোগ হবে
        </div>
      </div>
    </AdminShell>
  );
}
