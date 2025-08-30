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

async function uploadImage(file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}`;
    const filePath = `${uniqueName}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('menu')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

async function createNewMenu(newMenu: IMenu) {
  try {
    let imageUrl = '';

    if (newMenu.image) {
      imageUrl = await uploadImage(newMenu.image as File);
    }

    const { error } = await supabase.from('menu').insert({
      name: newMenu.name,
      price: newMenu.price,
      image: imageUrl,
      isAvailable: newMenu.isAvailable,
    });

    if (error) {
      throw new Error('Error creating menu: ' + error.message);
    }

    return { ...newMenu, image: imageUrl };
  } catch (error) {
    throw error;
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
  console.log(id);

  const { error } = await supabase.from('menu').delete().eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
}

async function editMenu(updatedMenu: IMenu) {
  let imageUrl = updatedMenu.image;

  if (updatedMenu.image instanceof File) {
    imageUrl = await uploadImage(updatedMenu.image);
  }

  const { error } = await supabase
    .from('menu')
    .update({
      name: updatedMenu.name,
      price: updatedMenu.price,
      image: imageUrl,
      isAvailable: updatedMenu.isAvailable,
    })
    .eq('id', updatedMenu.id);

  if (error) {
    throw new Error(error.message);
  }

  return { ...updatedMenu, image: imageUrl };
}

export { getMenu, createNewMenu, toggleMenuAvailability, deleteMenu, editMenu };
