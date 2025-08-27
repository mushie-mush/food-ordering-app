'use client';

import React from 'react';
import ActionBar from './ActionBar';
import MenuTableItem from './MenuTableItems';
import { useMenuContext } from './context/menuContext';
import { LoaderCircle } from 'lucide-react';

function MenuTable() {
  const { filteredMenu, isLoading } = useMenuContext();

  return (
    <>
      <ActionBar />
      <section className="bg-white border border-slate-200 rounded-md flex-col px-4 py-2">
        <table className="w-full text-left">
          <thead className="text-md">
            <tr className="border-b border-b-slate-200">
              <th className="px-6 py-3 w-[120px]">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredMenu.length ? (
              filteredMenu.map((item) => (
                <MenuTableItem item={item} key={item.id} />
              ))
            ) : isLoading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  <div className="flex justify-center items-center gap-2">
                    <LoaderCircle size={16} className="animate-spin" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No menu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default MenuTable;
