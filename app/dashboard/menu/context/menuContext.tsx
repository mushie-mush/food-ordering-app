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

interface IMenuContext {
  menu: IMenu[];
  isLoading: boolean;
  error: string | null;
  toggleAvailability: (id: string) => void;
  createMenu: (newMenu: IMenu) => void;
  updateMenu: (updatedMenu: IMenu) => void;
  removeMenu: (id: string) => void;
}

const initialState: IMenuContext = {
  menu: [],
  isLoading: false,
  error: null,
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
  | { type: 'error'; payload: string };

const reducer = (state: IMenuContext, action: MenuAction) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'menu/loaded':
      return { ...state, isLoading: false, menu: action.payload };
    case 'menu/created':
      return {
        ...state,
        isLoading: false,
        menu: [...state.menu, action.payload],
      };
    case 'menu/toggled':
      return {
        ...state,
        isLoading: false,
        menu: state.menu.map((menu) =>
          menu.id === action.payload
            ? { ...menu, isAvailable: !menu.isAvailable }
            : menu
        ),
      };
    case 'menu/updated':
      return {
        ...state,
        isLoading: false,
        menu: state.menu.map((menu) =>
          menu.id === action.payload.id ? action.payload : menu
        ),
      };
    case 'menu/deleted':
      return {
        ...state,
        isLoading: false,
        menu: state.menu.filter((menu) => menu.id !== action.payload),
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

  const value = {
    isLoading: state.isLoading,
    menu: state.menu,
    error: state.error,
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

export { MenuProvider, useMenuContext };
