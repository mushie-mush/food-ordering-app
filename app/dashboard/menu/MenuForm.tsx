/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  cloneElement,
  createContext,
  FormEvent,
  ReactElement,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from 'react';
import Button from '../_components/Button';
import { IMenu } from '@/app/_types';
import { useMenuContext } from './context/menuContext';
import { Modal } from '../_components/Modal';
import { LoaderCircle } from 'lucide-react';
import { FileUpload } from '../_components/FileUpload';

interface IMenuFormState {
  id: string;
  name: string;
  price: number | string;
  image: File | string;
  isAvailable: boolean;
}

interface IMenuFormContext {
  showMenuForm: boolean;
  handleOpenMenuForm: () => void;
  handleCloseMenuForm: () => void;
}

const MenuFormContext = createContext<IMenuFormContext>({
  showMenuForm: false,
  handleOpenMenuForm: () => {},
  handleCloseMenuForm: () => {},
});

const initialState: IMenuFormState = {
  id: '',
  name: '',
  price: '',
  image: '',
  isAvailable: true,
};

type ActionType =
  | { type: 'updated_name'; payload: string }
  | { type: 'updated_price'; payload: number }
  | { type: 'updated_image'; payload: File | string }
  | { type: 'updated_availability'; payload: boolean };

const reducer = (state: IMenuFormState, action: ActionType): IMenuFormState => {
  switch (action.type) {
    case 'updated_name':
      return { ...state, name: action.payload };
    case 'updated_price':
      return { ...state, price: action.payload };
    case 'updated_image':
      return { ...state, image: action.payload };
    case 'updated_availability':
      return { ...state, isAvailable: action.payload };
    default:
      return state;
  }
};

function MenuFormProvider({ children }: { children: ReactNode }) {
  const [showMenuForm, setShowMenuForm] = useState(false);

  const handleOpenMenuForm = () => {
    setShowMenuForm(true);
  };

  const handleCloseMenuForm = () => {
    setShowMenuForm(false);
  };

  return (
    <MenuFormContext.Provider
      value={{ showMenuForm, handleOpenMenuForm, handleCloseMenuForm }}
    >
      {children}
    </MenuFormContext.Provider>
  );
}

function MenuFormOpenButton({
  children,
}: {
  children: ReactElement<any, any>;
}) {
  const { handleOpenMenuForm } = useContext(MenuFormContext);

  return cloneElement(children, { onClick: handleOpenMenuForm });
}

function MenuFormWindow({ children }: { children: ReactNode }) {
  const { showMenuForm, handleCloseMenuForm } = useContext(MenuFormContext);

  return (
    <Modal isOpen={showMenuForm} onClose={handleCloseMenuForm}>
      {children}
    </Modal>
  );
}

function NewMenuForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { handleCloseMenuForm } = useContext(MenuFormContext);
  const { isLoading, createMenu } = useMenuContext();

  const handleCreateNewMenu = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await createMenu({
        ...state,
        price: Number(state.price),
      });
      handleCloseMenuForm();
    } catch (error) {
      console.error('Failed to create menu:', error);
    }
  };

  return (
    <div className="flex flex-col border border-slate-200 bg-white rounded-md p-8 max-w-[600px] w-full shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Add new menu</h1>
      <form className="flex flex-col gap-4" onSubmit={handleCreateNewMenu}>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="py-1.5 px-3 border border-slate-200 rounded-md"
            required
            value={state.name}
            onChange={(e) =>
              dispatch({ type: 'updated_name', payload: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-medium mb-2">
            Price
          </label>
          <div className="flex items-center px-3 border border-slate-200 rounded-md focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-800">
            <span className="mr-2">$</span>
            <input
              type="number"
              name="price"
              id="price"
              className="w-full py-1.5 focus:outline-none"
              required
              value={state.price}
              onChange={(e) =>
                dispatch({
                  type: 'updated_price',
                  payload: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-2">Image</label>
          <FileUpload
            value={state.image}
            onChange={(value) =>
              dispatch({ type: 'updated_image', payload: value })
            }
            isLoading={isLoading}
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isAvailable"
            id="isAvailable"
            className="appearance-none w-[24px] h-[24px] mr-4 border border-slate-200 rounded-md bg-white checked:bg-slate-900 focus:ring-2 focus:-outline-offset relative cursor-pointer"
            checked={state.isAvailable}
            onChange={(e) =>
              dispatch({
                type: 'updated_availability',
                payload: e.target.checked,
              })
            }
          />
          <label htmlFor="isAvailable" className="font-medium cursor-pointer">
            Available to order
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 mt-6">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              'Submit'
            )}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={handleCloseMenuForm}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              'Cancel'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function EditMenuForm({ menu }: { menu: IMenu }) {
  const [state, dispatch] = useReducer(reducer, menu);
  const { handleCloseMenuForm } = useContext(MenuFormContext);
  const { isLoading, updateMenu, removeMenu } = useMenuContext();

  const handleEditMenu = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await updateMenu({
        ...state,
        price: Number(state.price),
      });
      handleCloseMenuForm();
    } catch (error) {
      console.error('Failed to update menu:', error);
    }
  };

  const handleDeleteMenu = async () => {
    try {
      await removeMenu(menu.id);
      handleCloseMenuForm();
    } catch (error) {
      console.error('Failed to delete menu:', error);
    }
  };

  return (
    <div className="flex flex-col border border-slate-200 bg-white rounded-md p-8 max-w-[600px] w-full shadow-xl text-left text-black">
      <h1 className="text-3xl font-bold mb-6">Edit menu</h1>
      <form className="flex flex-col gap-4" onSubmit={handleEditMenu}>
        <input type="hidden" name="id" value={state.id} />
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="py-1.5 px-3 border border-slate-200 rounded-md"
            required
            value={state.name}
            onChange={(e) =>
              dispatch({ type: 'updated_name', payload: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-medium mb-2">
            Price
          </label>
          <div className="flex items-center px-3 border border-slate-200 rounded-md focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-800">
            <span className="mr-2">$</span>
            <input
              type="number"
              name="price"
              id="price"
              className="w-full py-1.5 focus:outline-none"
              required
              value={state.price}
              onChange={(e) =>
                dispatch({
                  type: 'updated_price',
                  payload: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-2">Image</label>
          <FileUpload
            value={state.image}
            onChange={(value) =>
              dispatch({ type: 'updated_image', payload: value })
            }
            isLoading={isLoading}
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isAvailable"
            id="isAvailable"
            className="appearance-none w-[24px] h-[24px] mr-4 border border-slate-200 rounded-md bg-white checked:bg-slate-900 focus:ring-2 focus:-outline-offset relative cursor-pointer"
            checked={state.isAvailable}
            onChange={(e) =>
              dispatch({
                type: 'updated_availability',
                payload: e.target.checked,
              })
            }
          />
          <label htmlFor="isAvailable" className="font-medium cursor-pointer">
            Available to order
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 mt-6">
          <Button
            variant="danger"
            type="button"
            disabled={isLoading}
            onClick={handleDeleteMenu}
          >
            {isLoading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              'Delete'
            )}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              'Submit'
            )}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={handleCloseMenuForm}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              'Cancel'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export {
  MenuFormProvider,
  MenuFormOpenButton,
  MenuFormWindow,
  NewMenuForm,
  EditMenuForm,
};
