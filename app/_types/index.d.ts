interface ILayout {
  children: React.ReactNode;
}

interface IMenu {
  id: string;
  name: string;
  price: number;
  image: string;
  isAvailable: boolean;
}

export { ILayout, IMenu };
