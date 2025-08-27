import { IMenu } from '@/app/_types';
import {
  EditMenuForm,
  MenuFormOpenButton,
  MenuFormProvider,
  MenuFormWindow,
} from './MenuForm';
import { Calendar, CalendarOff, Edit, LoaderCircle, Salad } from 'lucide-react';
import Button from '../_components/Button';
import { useMenuContext } from './context/menuContext';

function MenuTableItem({ item }: { item: IMenu }) {
  const { toggleAvailability, isLoading } = useMenuContext();

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
            <Salad size={32} className="text-slate-400" />
          </div>
        </td>
        <td className="px-6 py-4 align-middle">
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
            onClick={() => toggleAvailability(item.id)}
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
