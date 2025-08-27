'use client';

import {
  createNewMenu,
  deleteMenu,
  editMenu,
  getMenu,
  toggleMenuAvailability,
} from '@/app/_lib/supabase';
import { IMenu } from '@/app/_types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

type FilterType = 'all' | 'available' | 'not-available';

type SortType = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

interface IMenuContext {
  menu: IMenu[];
  filteredMenu: IMenu[];
  isLoading: boolean;
  error: string | null;
  currentFilter: FilterType;
  currentSort: SortType;
  setFilter: (filter: FilterType) => void;
  setSort: (sort: SortType) => void;
  toggleAvailability: (id: string) => void;
  createMenu: (newMenu: IMenu) => void;
  updateMenu: (updatedMenu: IMenu) => void;
  removeMenu: (id: string) => void;
}

const initialState: IMenuContext = {
  menu: [],
  filteredMenu: [],
  isLoading: false,
  error: null,
  currentFilter: 'all',
  currentSort: 'name-asc',
  setFilter: () => {},
  setSort: () => {},
  toggleAvailability: () => {},
  createMenu: () => {},
  updateMenu: () => {},
  removeMenu: () => {},
};

const MenuContext = createContext<IMenuContext>(initialState);

type MenuAction =
  | { type: 'loading' }
  | { type: 'menu/loaded'; payload: IMenu[] }
  | { type: 'menu/created'; payload: IMenu }
  | { type: 'menu/toggled'; payload: string }
  | { type: 'menu/updated'; payload: IMenu }
  | { type: 'menu/deleted'; payload: string }
  | { type: 'filter/changed'; payload: FilterType }
  | { type: 'menu/sorted'; payload: { menu: IMenu[]; sort: SortType } }
  | { type: 'error'; payload: string };

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

const reducer = (state: IMenuContext, action: MenuAction) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'menu/loaded': {
      const filteredMenu = getFilteredMenu(action.payload, state.currentFilter);
      return {
        ...state,
        isLoading: false,
        menu: action.payload,
        filteredMenu,
      };
    }
    case 'menu/created': {
      const newMenu = [...state.menu, action.payload];
      return {
        ...state,
        isLoading: false,
        menu: newMenu,
        filteredMenu: getFilteredMenu(newMenu, state.currentFilter),
      };
    }
    case 'menu/toggled': {
      const newMenu = state.menu.map((menu) =>
        menu.id === action.payload
          ? { ...menu, isAvailable: !menu.isAvailable }
          : menu
      );
      return {
        ...state,
        isLoading: false,
        menu: newMenu,
        filteredMenu: getFilteredMenu(newMenu, state.currentFilter),
      };
    }
    case 'menu/updated': {
      const newMenu = state.menu.map((menu) =>
        menu.id === action.payload.id ? action.payload : menu
      );
      return {
        ...state,
        isLoading: false,
        menu: newMenu,
        filteredMenu: getFilteredMenu(newMenu, state.currentFilter),
      };
    }
    case 'menu/deleted': {
      const newMenu = state.menu.filter((menu) => menu.id !== action.payload);
      return {
        ...state,
        isLoading: false,
        menu: newMenu,
        filteredMenu: getFilteredMenu(newMenu, state.currentFilter),
      };
    }
    case 'filter/changed':
      return {
        ...state,
        currentFilter: action.payload,
        filteredMenu: getFilteredMenu(state.menu, action.payload),
      };
    case 'menu/sorted':
      return {
        ...state,
        isLoading: false,
        filteredMenu: action.payload.menu,
        currentSort: action.payload.sort,
      };
    case 'error':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

function MenuProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        dispatch({ type: 'loading' });
        const response = await getMenu();
        dispatch({ type: 'menu/loaded', payload: response });
      } catch (error: unknown) {
        dispatch({ type: 'error', payload: (error as Error).message });
      }
    };

    fetchMenu();
  }, []);

  const toggleAvailability = async (id: string) => {
    try {
      dispatch({ type: 'loading' });
      await toggleMenuAvailability(
        id,
        !state.menu.find((menu: IMenu) => menu.id === id)?.isAvailable
      );
      dispatch({ type: 'menu/toggled', payload: id });
    } catch (error: unknown) {
      dispatch({ type: 'error', payload: (error as Error).message });
    }
  };

  const createMenu = async (newMenu: IMenu) => {
    try {
      dispatch({ type: 'loading' });
      await createNewMenu(newMenu);
      const menu = await getMenu();
      dispatch({ type: 'menu/loaded', payload: menu });
    } catch (error: unknown) {
      dispatch({ type: 'error', payload: (error as Error).message });
    }
  };

  const updateMenu = async (updatedMenu: IMenu) => {
    try {
      dispatch({ type: 'loading' });
      await editMenu(updatedMenu);
      dispatch({ type: 'menu/updated', payload: updatedMenu });
    } catch (error: unknown) {
      dispatch({ type: 'error', payload: (error as Error).message });
    }
  };

  const removeMenu = async (id: string) => {
    try {
      dispatch({ type: 'loading' });
      await deleteMenu(id);
      dispatch({ type: 'menu/deleted', payload: id });
    } catch (error: unknown) {
      dispatch({ type: 'error', payload: (error as Error).message });
    }
  };

  const setFilter = (filter: FilterType) => {
    dispatch({ type: 'filter/changed', payload: filter });
  };

  const setSort = (sort: SortType) => {
    const sortedMenu = [...state.filteredMenu].sort((a, b) => {
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

    dispatch({ type: 'menu/sorted', payload: { menu: sortedMenu, sort } });
  };

  const value = {
    isLoading: state.isLoading,
    menu: state.menu,
    filteredMenu: state.filteredMenu,
    error: state.error,
    currentFilter: state.currentFilter,
    currentSort: state.currentSort,
    setFilter,
    setSort,
    toggleAvailability,
    createMenu,
    updateMenu,
    removeMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

function useMenuContext() {
  return useContext(MenuContext);
}

export { MenuProvider, useMenuContext, type FilterType };
