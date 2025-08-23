'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface IButtonGroupContext {
  activeButton: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
}

interface IButtonProps {
  children: ReactNode;
  value: string;
}

interface IButtonGroupProps {
  children: ReactNode;
}

const ButtonGroupContext = createContext<IButtonGroupContext>(
  {} as IButtonGroupContext
);

function ButtonGroup({ children }: IButtonGroupProps) {
  const [activeButton, setActiveButton] = useState('');
  return (
    <ButtonGroupContext.Provider value={{ activeButton, setActiveButton }}>
      <div className="inline-flex items-center rounded-md border border-slate-200 bg-white p-1 text-sm shadow-sm">
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}

function Button({ children, value }: IButtonProps) {
  const { activeButton, setActiveButton } = useContext(ButtonGroupContext);
  const isActive = activeButton === value;

  const handleButtonClick = () => {
    setActiveButton(value);
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`px-3 rounded-sm h-full cursor-pointer ${
        isActive
          ? 'text-white bg-slate-900 hover:bg-slate-700'
          : 'text-black hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );
}

ButtonGroup.Button = Button;

export default ButtonGroup;
