'use server';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { app } from './firebase';
import { IMenu } from '../_types';

async function addNewMenu(newMenu: IMenu) {
  const db = getFirestore(app);

  await addDoc(collection(db, 'menu'), newMenu);
}

async function editMenu(menu: IMenu) {
  const db = getFirestore(app);
  const menuRef = doc(db, 'menu', menu.id);

  await updateDoc(menuRef, {
    name: menu.name,
    price: menu.price,
    image: menu.image,
    isAvailable: menu.isAvailable,
  });
}

async function disableMenu(id: string) {
  const db = getFirestore(app);
  const menuRef = doc(db, 'menu', id);

  const docSnap = await getDoc(menuRef);

  if (docSnap.exists()) {
    const menu = docSnap.data();
    await updateDoc(menuRef, {
      isAvailable: !menu.isAvailable,
    });
  }
}

async function getMenu(): Promise<IMenu[]> {
  const db = getFirestore(app);

  const querySnapshot = await getDocs(collection(db, 'menu'));
  const menu = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IMenu[];

  return menu;
}

async function deleteMenu(id: string) {
  const db = getFirestore(app);
  const menuRef = doc(db, 'menu', id);
  await deleteDoc(menuRef);
}

export { addNewMenu, editMenu, disableMenu, getMenu, deleteMenu };
