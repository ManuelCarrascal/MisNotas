import "./App.css";
import Header from "./components/Header";
import NotesPage from "./pages/NotesPage";
import NotePage from "./pages/NotePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route element={<NotesPage />} path="/" exact />
            <Route element={<NotePage />} path="/notes/:id" />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
