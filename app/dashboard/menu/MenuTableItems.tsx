import { IMenu } from '@/app/_types';
import {
  EditMenuForm,
  MenuFormOpenButton,
  MenuFormProvider,
  MenuFormWindow,
} from './MenuForm';
import { Calendar, CalendarOff, Edit, LoaderCircle, Salad } from 'lucide-react';
import Button from '../_components/Button';
import toast from 'react-hot-toast';
import { useMenuStore } from './store/menuStore';

function MenuTableItem({ item }: { item: IMenu }) {
  const toggleAvailability = useMenuStore((state) => state.toggleAvailability);
  const isLoading = useMenuStore((state) => state.isLoading);

  const handleToggleAvailability = async (id: string) => {
    try {
      await toggleAvailability(id);
      toast.success('Menu availability updated');
    } catch (error) {
      toast.error(`Failed to update availability: ${error}`);
    }
  };

  return (
    <MenuFormProvider>
      <tr
        key={item.id}
        className={`border-b border-slate-200 last:border-0 hover:bg-white ${
          item.isAvailable ? 'text-black' : 'text-gray-400'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <td className="px-6 py-4 w-[120px]">
          <div className="w-16 h-16 bg-slate-200 rounded-md flex justify-center items-center">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image as string}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <Salad size={32} className="text-slate-400" />
            )}
          </div>
        </td>
        <td className="px-6 py-4 align-middle w-[320px]">
          {item.name}{' '}
          {!item.isAvailable && (
            <span className="text-xs text-rose-700 py-1 px-1.5 bg-rose-100 rounded-md">
              Not Available
            </span>
          )}
        </td>
        <td className="px-6 py-4">${item.price.toFixed(2)}</td>
        <td className="px-6 py-4 space-x-2 text-right">
          <MenuFormWindow>
            <EditMenuForm menu={item} />
          </MenuFormWindow>
          <MenuFormOpenButton>
            <Button>
              <Edit size={16} className="text-white inline-block mr-2" /> Edit
            </Button>
          </MenuFormOpenButton>
          <Button
            variant="secondary"
            onClick={() => handleToggleAvailability(item.id)}
          >
            {isLoading ? (
              <>
                <LoaderCircle size={16} className="animate-spin mr-2" />{' '}
                Loading...
              </>
            ) : item.isAvailable ? (
              <>
                <CalendarOff size={16} className="inline-block mr-2" /> Disable
              </>
            ) : (
              <>
                <Calendar size={16} className="inline-block mr-2" /> Enable
              </>
            )}
          </Button>
        </td>
      </tr>
    </MenuFormProvider>
  );
}

export default MenuTableItem;
