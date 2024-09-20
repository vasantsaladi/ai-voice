import "app/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">
              AI Voice Assistant
            </h1>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-white mt-8 py-4 text-center text-gray-500">
          © 2024 AI Voice Assistant
        </footer>
      </body>
    </html>
  );
}
