import { useEffect, useState } from "react";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import Chat from "./pages/ChatPage";
import { getToken, clearToken } from "./helpers/authStorage";
import "./style.css";

type Page = "login" | "profile" | "chat";

function getPage(): Page {
  if (window.location.pathname === "/profile") return "profile";
  if (window.location.pathname === "/chat") return "chat";
  return "login";
}

export function App() {
  const existingToken = getToken();
  const [token, setToken] = useState<string | null>(existingToken);
  const [page, setPage] = useState<Page>(getPage);
  const activePage = token ? (page === "login" ? "chat" : page) : "login";

  useEffect(() => {
    if (window.location.pathname !== `/${activePage}`) {
      window.history.replaceState(null, "", `/${activePage}`);
    }
  }, [activePage, page]);

  useEffect(() => {
    const onPopState = () => setPage(getPage());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function navigate(next: Page) {
    window.history.pushState(null, "", `/${next}`);
    setPage(next);
  }

  function handleLogout() {
    clearToken();
    setToken(null);
    navigate("login");
  }

  return (
    <div className="app">
      <header>
        <h1>Messenger Mini</h1>
        <nav aria-label="Разделы">
          <button onClick={() => navigate("login")} disabled={Boolean(token)}>Вход</button>
          <button onClick={() => navigate("profile")} disabled={!token}>Профиль</button>
          <button onClick={() => navigate("chat")} disabled={!token}>Чат</button>
          {token && <button onClick={handleLogout}>Выйти</button>}
        </nav>
      </header>
      <main>
        {activePage === "login" && <Login onLogin={(newToken) => {
          setToken(newToken);
          navigate("chat");
        }} />}
        {token && activePage === "profile" && <Profile token={token} />}
        {token && activePage === "chat" && <Chat token={token} />}
      </main>
    </div>
  );
}

export default App;
