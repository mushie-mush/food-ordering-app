'use client';

import { ArrowDownWideNarrow, Plus } from 'lucide-react';
import Button from '../_components/Button';
import ButtonGroup from '../_components/ButtonGroup';
import {
  NewMenuForm,
  MenuFormOpenButton,
  MenuFormProvider,
  MenuFormWindow,
} from './MenuForm';

function ActionBar() {
  return (
    <section className="flex justify-between mb-4">
      <div className="flex gap-2">
        <Button variant="icon">
          <ArrowDownWideNarrow size={16} className="inline-block" />
        </Button>
        <ButtonGroup>
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
