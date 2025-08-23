import { ArrowDownWideNarrow, ListFilter, Plus } from 'lucide-react';
import Button from '../_components/Button';

function OrderPage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Orders</h1>
      <section className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Button variant="icon">
            <ListFilter size={16} className="inline-block" />
          </Button>
          <Button variant="icon">
            <ArrowDownWideNarrow size={16} className="inline-block" />
          </Button>
        </div>
        <div className="flex">
          <Button>
            <Plus size={16} className="inline-block mr-2" /> Add order
          </Button>
        </div>
      </section>
      <section className="flex-col px-4 py-2"></section>
    </>
  );
}
export default OrderPage;
