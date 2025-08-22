import { ILayout } from '../_types';
import {
  ClipboardList,
  ForkKnifeCrossed,
  LayoutGrid,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import NavItem from './_components/NavItem';
import Link from 'next/link';

function DashboardLayout({ children }: ILayout) {
  return (
    <div className="flex h-screen">
      <aside className="flex flex-col h-screen border-r-[1px] w-[300px] border-r-slate-200 bg-white px-6 py-12">
        <span className="inline-block px-4 text-2xl font-bold mb-8">
          Dashboard
        </span>
        <nav className="flex flex-col gap-2 px-4">
          <NavItem
            href="/dashboard"
            label="Overview"
            icon={<LayoutGrid size={24} />}
          />
          <NavItem
            href="/dashboard/orders"
            label="Orders"
            icon={<ClipboardList size={24} />}
          />
          <NavItem
            href="/dashboard/menu"
            label="Menu"
            icon={<ForkKnifeCrossed size={24} />}
          />
          <NavItem
            href="/dashboard/users"
            label="Users"
            icon={<Users size={24} />}
          />
          <NavItem
            href="/dashboard/settings"
            label="Settings"
            icon={<Settings size={24} />}
          />
        </nav>
        <hr className="border-slate-200 my-4" />
        <Link
          href="/"
          className="flex border-rose-200 border-1 rounded-md px-4 py-3 font-semibold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:border-rose-600 hover:text-white  transition-all"
        >
          <LogOut size={24} className="mr-4" />
          Sign out
        </Link>
      </aside>
      <main className="flex flex-col items-center min-h-screen w-full bg-slate-50 py-12 px-8">
        <div className="w-full max-w-[1080px]">{children}</div>
      </main>
    </div>
  );
}
export default DashboardLayout;
