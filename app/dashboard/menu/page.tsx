import { getMenu } from '@/app/_lib/data-service';
import {
  ArrowDownWideNarrow,
  CalendarOff,
  Edit,
  Plus,
  Salad,
} from 'lucide-react';
import Button from '../_components/Button';
import FilterButtonGroup from './FilterButtonGroup';

async function MenuPage() {
  const menu = await getMenu();

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Menu</h1>
      <section className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Button variant="icon">
            <ArrowDownWideNarrow size={16} className="inline-block" />
          </Button>
          <FilterButtonGroup />
        </div>
        <div className="flex">
          <Button>
            <Plus size={16} className="inline-block mr-2" /> Add menu
          </Button>
        </div>
      </section>
      <section className="bg-white border border-slate-200 rounded-md flex-col px-4 py-2">
        <table className="w-full text-left">
          <thead className="text-md">
            <tr className="border-b border-b-slate-200">
              <th className="px-6 py-3 w-[160px]">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {menu.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-200 last:border-0 hover:bg-white transition"
              >
                <td className="px-6 py-4 w-[160px]">
                  <div className="w-16 h-16 bg-slate-200 rounded-md flex justify-center items-center">
                    <Salad size={32} className="text-slate-400" />
                  </div>
                </td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 space-x-2 text-right">
                  <Button>
                    <Edit size={16} className="text-white inline-block mr-2" />{' '}
                    Edit
                  </Button>
                  <Button variant="secondary">
                    <CalendarOff size={16} className="inline-block mr-2" />{' '}
                    Disable
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
export default MenuPage;
