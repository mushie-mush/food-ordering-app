'use client';

import { ArrowDownWideNarrow, Plus } from 'lucide-react';
import Button from '../_components/Button';
import ButtonGroup from '../_components/ButtonGroup';
import Dropdown from '../_components/Dropdown';
import {
  NewMenuForm,
  MenuFormOpenButton,
  MenuFormProvider,
  MenuFormWindow,
} from './MenuForm';
import { FilterType, SortType, useMenuStore } from './store/menuStore';

function ActionBar() {
  const currentFilter = useMenuStore((state) => state.currentFilter);
  const setFilter = useMenuStore((state) => state.setFilter);
  const currentSort = useMenuStore((state) => state.currentSort);
  const setSort = useMenuStore((state) => state.setSort);

  const sortOptions = [
    { label: 'Name (A-Z)', value: 'name-asc' },
    { label: 'Name (Z-A)', value: 'name-desc' },
    { label: 'Price (Low-High)', value: 'price-asc' },
    { label: 'Price (High-Low)', value: 'price-desc' },
  ];

  return (
    <section className="flex justify-between mb-4">
      <div className="flex gap-2">
        <Dropdown
          trigger={
            <Button variant="icon">
              <ArrowDownWideNarrow size={16} className="inline-block" />
            </Button>
          }
        >
          {sortOptions.map((option) => (
            <Dropdown.Item
              key={option.value}
              onClick={() => setSort(option.value as SortType)}
              active={currentSort === option.value}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown>
        <ButtonGroup
          value={currentFilter}
          onValueChange={(value) => setFilter(value as FilterType)}
        >
          <ButtonGroup.Button value="all">All</ButtonGroup.Button>
          <ButtonGroup.Button value="available">Available</ButtonGroup.Button>
          <ButtonGroup.Button value="not-available">
            Not Available
          </ButtonGroup.Button>
        </ButtonGroup>
      </div>
      <div className="flex">
        <MenuFormProvider>
          <MenuFormOpenButton>
            <Button>
              <Plus size={16} className="inline-block mr-2" /> Add menu
            </Button>
          </MenuFormOpenButton>
          <MenuFormWindow>
            <NewMenuForm />
          </MenuFormWindow>
        </MenuFormProvider>
      </div>
    </section>
  );
}
export default ActionBar;
