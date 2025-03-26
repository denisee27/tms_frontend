
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import TaskPage from "./components/task/task";
import { LoadingProvider } from "./Services/loadingservice";
import Layout from "./layouts/layout";
function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<TaskPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  );
}
export default App;
