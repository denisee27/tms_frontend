
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import TaskPage from "./components/task/task";
import { LoadingProvider } from "./Services/loadingservice";
import Layout from "./layouts/layout";
import { SidebarProvider } from "./Services/sidebarservice";
import { UtilitiesProvider } from "./Services/utilitiesservice";
import Brand from "./components/brand/brand";
function App() {
  return (
    <LoadingProvider>
      <UtilitiesProvider>
        <SidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<TaskPage />} />
                <Route path="brand" element={<Brand />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </UtilitiesProvider>
    </LoadingProvider>
  );
}
export default App;
