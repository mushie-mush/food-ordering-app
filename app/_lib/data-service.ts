import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { IMenu } from '../_types';

async function getMenu(): Promise<IMenu[]> {
  const querySnapshot = await getDocs(collection(db, 'menu'));
  const menu = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IMenu[];

  return menu;
}

export { getMenu };
