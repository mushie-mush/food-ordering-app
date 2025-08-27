'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface IButtonGroupContext {
  activeButton: string;
  handleButtonChange: (value: string) => void;
}

interface IButtonProps {
  children: ReactNode;
  value: string;
}

interface IButtonGroupProps {
  children: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

const ButtonGroupContext = createContext<IButtonGroupContext>(
  {} as IButtonGroupContext
);

function ButtonGroup({ children, value, onValueChange }: IButtonGroupProps) {
  const [activeButton, setActiveButton] = useState(value);

  const handleButtonChange = (newValue: string) => {
    setActiveButton(newValue);
    onValueChange(newValue);
  };

  return (
    <ButtonGroupContext.Provider value={{ activeButton, handleButtonChange }}>
      <div className="inline-flex items-center rounded-md border border-slate-200 bg-white p-1 text-sm shadow-sm">
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}

function Button({ children, value }: IButtonProps) {
  const { activeButton, handleButtonChange } = useContext(ButtonGroupContext);
  const isActive = activeButton === value;

  const handleButtonClick = () => {
    handleButtonChange(value);
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
