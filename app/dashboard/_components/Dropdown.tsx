import {
  ReactNode,
  useContext,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface IDropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

interface IDropdownContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DropdownContext = createContext({} as IDropdownContext);

function Dropdown({ trigger, children }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative" ref={dropdownRef}>
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
        {isOpen && (
          <div className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-1 min-w-[200px] z-50">
            {children}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
}

interface DropdownItemProps {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
}

function DropdownItem({ children, onClick, active }: DropdownItemProps) {
  const { setIsOpen } = useContext(DropdownContext);

  const handleClick = () => {
    onClick();
    setIsOpen(false);
  };

  return (
    <button
      className={`w-full text-left px-3 py-2 text-sm rounded-sm cursor-pointer ${
        active
          ? 'text-white bg-slate-900 hover:bg-slate-700'
          : 'text-black hover:bg-slate-100'
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Dropdown.Item = DropdownItem;

export default Dropdown;
