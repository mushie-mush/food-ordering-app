import Link from 'next/link';
import Button from './dashboard/_components/Button';

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen bg-slate-50">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-8">Food Ordering App</h1>
        <Link href="/dashboard">
          <Button variant="secondary">Dashboard</Button>
        </Link>
      </div>
    </main>
  );
}
