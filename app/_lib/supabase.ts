import { createClient } from '@supabase/supabase-js';
import { IMenu } from '../_types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

async function getMenu(): Promise<IMenu[]> {
  const { data, error } = await supabase.from('menu').select('*').order('id');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

async function createNewMenu(newMenu: IMenu) {
  const { error } = await supabase.from('menu').insert({
    name: newMenu.name,
    price: newMenu.price,
    image: newMenu.image,
    isAvailable: newMenu.isAvailable,
  });
  if (error) {
    throw new Error(error.message);
  }
}

async function toggleMenuAvailability(id: string, isAvailable: boolean) {
  const { error } = await supabase
    .from('menu')
    .update({ isAvailable })
    .eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
}

async function deleteMenu(id: string) {
  const { error } = await supabase.from('menu').delete().eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
}

async function editMenu(updatedMenu: IMenu) {
  const { error } = await supabase
    .from('menu')
    .update(updatedMenu)
    .eq('id', updatedMenu.id);
  if (error) {
    throw new Error(error.message);
  }
}

export { getMenu, createNewMenu, toggleMenuAvailability, deleteMenu, editMenu };
