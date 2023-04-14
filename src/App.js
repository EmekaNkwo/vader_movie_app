import { Route, Routes, Navigate } from "react-router-dom";
import { Home, Layout, MovieDetails } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
