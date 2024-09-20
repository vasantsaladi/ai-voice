import "app/styles/globals.css";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-base-200 min-h-screen flex flex-col">
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
