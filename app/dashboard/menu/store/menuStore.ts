import { create } from 'zustand';
import {
  createNewMenu,
  deleteMenu,
  editMenu,
  getMenu,
  toggleMenuAvailability,
} from '@/app/_lib/supabase';
import { IMenu } from '@/app/_types';

export type FilterType = 'all' | 'available' | 'not-available';
export type SortType = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

interface MenuState {
  menu: IMenu[];
  filteredMenu: IMenu[];
  isLoading: boolean;
  error: string | null;
  currentFilter: FilterType;
  currentSort: SortType;
  fetchMenu: () => Promise<void>;
  setFilter: (filter: FilterType) => void;
  setSort: (sort: SortType) => void;
  toggleAvailability: (id: string) => Promise<void>;
  createMenu: (newMenu: IMenu) => Promise<void>;
  updateMenu: (updatedMenu: IMenu) => Promise<void>;
  removeMenu: (id: string) => Promise<void>;
}

const getFilteredMenu = (menu: IMenu[], filter: FilterType) => {
  switch (filter) {
    case 'available':
      return menu.filter((item) => item.isAvailable);
    case 'not-available':
      return menu.filter((item) => !item.isAvailable);
    default:
      return menu;
  }
};

const getSortedMenu = (menu: IMenu[], sort: SortType) => {
  return [...menu].sort((a, b) => {
    switch (sort) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });
};

export const useMenuStore = create<MenuState>((set, get) => ({
  menu: [],
  filteredMenu: [],
  isLoading: false,
  error: null,
  currentFilter: 'all',
  currentSort: 'name-asc',

  fetchMenu: async () => {
    try {
      set({ isLoading: true });
      const response = await getMenu();
      const filteredMenu = getSortedMenu(
        getFilteredMenu(response, get().currentFilter),
        get().currentSort
      );
      set({ menu: response, filteredMenu, isLoading: false });
    } catch (error: unknown) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setFilter: (filter: FilterType) => {
    const { menu, currentSort } = get();
    set({
      currentFilter: filter,
      filteredMenu: getSortedMenu(getFilteredMenu(menu, filter), currentSort),
    });
  },

  setSort: (sort: SortType) => {
    const { filteredMenu } = get();
    set({
      currentSort: sort,
      filteredMenu: getSortedMenu(filteredMenu, sort),
    });
  },

  toggleAvailability: async (id: string) => {
    try {
      set({ isLoading: true });
      const { menu } = get();
      const menuItem = menu.find((item) => item.id === id);
      if (!menuItem) throw new Error('Menu item not found');

      await toggleMenuAvailability(id, !menuItem.isAvailable);

      const updatedMenu = menu.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      );

      const filteredMenu = getSortedMenu(
        getFilteredMenu(updatedMenu, get().currentFilter),
        get().currentSort
      );

      set({ menu: updatedMenu, filteredMenu, isLoading: false });
    } catch (error: unknown) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createMenu: async (newMenu: IMenu) => {
    try {
      set({ isLoading: true });
      const result = await createNewMenu(newMenu);
      const { menu, currentFilter, currentSort } = get();
      const updatedMenu = [...menu, result];

      set({
        menu: updatedMenu,
        filteredMenu: getSortedMenu(
          getFilteredMenu(updatedMenu, currentFilter),
          currentSort
        ),
        isLoading: false,
      });
    } catch (error: unknown) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateMenu: async (updatedMenu: IMenu) => {
    try {
      set({ isLoading: true });
      const result = await editMenu(updatedMenu);
      const { menu, currentFilter, currentSort } = get();
      const newMenu = menu.map((item) =>
        item.id === result.id ? result : item
      );

      set({
        menu: newMenu,
        filteredMenu: getSortedMenu(
          getFilteredMenu(newMenu, currentFilter),
          currentSort
        ),
        isLoading: false,
      });
    } catch (error: unknown) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  removeMenu: async (id: string) => {
    try {
      set({ isLoading: true });
      await deleteMenu(id);
      const { menu, currentFilter, currentSort } = get();
      const newMenu = menu.filter((item) => item.id !== id);

      set({
        menu: newMenu,
        filteredMenu: getSortedMenu(
          getFilteredMenu(newMenu, currentFilter),
          currentSort
        ),
        isLoading: false,
      });
    } catch (error: unknown) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
