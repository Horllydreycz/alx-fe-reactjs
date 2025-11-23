import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">GitHub User Search</h1>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2024 GitHub User Search Application</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
