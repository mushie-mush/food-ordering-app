import { MenuProvider } from './context/menuContext';
import MenuTable from './MenuTable';

function MenuPage() {
  return (
    <MenuProvider>
      <h1 className="text-4xl font-bold mb-8">Menu</h1>
      <MenuTable />
    </MenuProvider>
  );
}
export default MenuPage;
