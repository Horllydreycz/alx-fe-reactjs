import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <header
        style={{
          padding: "1rem",
          backgroundColor: "#24292e",
          color: "white",
          marginBottom: "2rem",
        }}
      >
        <nav>
          <h1 style={{ margin: 0 }}>GitHub User Search</h1>
          <Link to="/" style={{ color: "white", marginRight: "1rem" }}>
            Home
          </Link>
          <Link to="/about" style={{ color: "white" }}>
            About
          </Link>
        </nav>
      </header>

      <main style={{ padding: "0 2rem" }}>
        <Outlet />
      </main>

      <footer
        style={{
          padding: "1rem",
          textAlign: "center",
          marginTop: "2rem",
          borderTop: "1px solid #e1e4e8",
        }}
      >
        <p>© 2025 GitHub User Search Application</p>
      </footer>
    </div>
  );
}

export default Layout;
