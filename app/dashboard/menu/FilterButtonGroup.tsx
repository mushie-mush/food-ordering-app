'use client';

import ButtonGroup from '../_components/ButtonGroup';

function FilterButtonGroup() {
  return (
    <ButtonGroup>
      <ButtonGroup.Button value="all">All</ButtonGroup.Button>
      <ButtonGroup.Button value="available">Available</ButtonGroup.Button>
      <ButtonGroup.Button value="not-available">
        Not Available
      </ButtonGroup.Button>
    </ButtonGroup>
  );
}
export default FilterButtonGroup;
