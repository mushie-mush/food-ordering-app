import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen bg-slate-50">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-8">Food Ordering App</h1>
        <Link
          href="/dashboard"
          className="rounded-md px-4 py-2 shadow-sm border-1 border-slate-200 bg-white font-semibold hover:bg-gray-50 cursor-pointer"
        >
          Admin Dashboard
        </Link>
      </div>
    </main>
  );
}
