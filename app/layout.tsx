import '@/app/_styles/globals.css';
import { ILayout } from './_types';

function RootLayout({ children }: ILayout) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
export default RootLayout;
