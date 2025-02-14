
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import TaskPage from "./components/task/task";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
