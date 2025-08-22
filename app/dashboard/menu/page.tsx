import { CalendarOff, Edit, Salad } from 'lucide-react';

const menuItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    image: 'https://source.unsplash.com/80x80/?pizza',
    price: 100,
  },
  {
    id: 2,
    name: 'Sushi Platter',
    image: 'https://source.unsplash.com/80x80/?sushi',
    price: 100,
  },
  {
    id: 3,
    name: 'Caesar Salad',
    image: 'https://source.unsplash.com/80x80/?salad',
    price: 100,
  },
];

function MenuPage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Menu</h1>
      <section className="bg-white border border-slate-200 rounded-xl flex-col px-4 py-2">
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
            {menuItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-200 last:border-0 hover:bg-white transition"
              >
                <td className="px-6 py-4 w-[160px]">
                  <div className="w-20 h-20 bg-slate-200 rounded-md flex justify-center items-center">
                    <Salad size={32} className="text-slate-400" />
                  </div>
                </td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 space-x-2 text-right">
                  <button className="inline-flex items-center rounded-md px-4 py-2 shadow-sm border-1 border-slate-800 bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 cursor-pointer">
                    <Edit size={16} className="text-white inline-block mr-2" />{' '}
                    Edit
                  </button>
                  <button className="inline-flex items-center rounded-md px-6 py-2 shadow-sm border-1 border-slate-200 bg-white font-semibold hover:bg-gray-50 text-sm cursor-pointer">
                    <CalendarOff size={16} className="inline-block mr-2" />{' '}
                    Disable
                  </button>
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
