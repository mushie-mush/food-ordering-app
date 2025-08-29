interface ILayout {
  children: React.ReactNode;
}

interface IMenu {
  id: string;
  name: string;
  price: number;
  image: File | string;
  isAvailable: boolean;
}

export { ILayout, IMenu };
