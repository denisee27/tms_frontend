
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import TaskPage from "./components/task/task";
import { LoadingProvider } from "./Services/loadingservice";
import Layout from "./layouts/layout";
import { SidebarProvider } from "./Services/sidebarservice";
import { UtilitiesProvider } from "./Services/utilitiesservice";
import Brand from "./components/brand/brand";
import { HttpService } from "./Services/httpservice";
import { PageQueryProvider } from "./Services/pagequery";
import Login from "./components/login/login";
import { AuthProvider } from "./Services/authservice";
function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <AuthProvider>
          <HttpService>
            <UtilitiesProvider>
              <SidebarProvider>
                <PageQueryProvider>
                  <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="/" element={<Layout />}>
                      <Route index element={<TaskPage />} />
                      <Route path="brand" element={<Brand />} />
                    </Route>
                  </Routes>
                </PageQueryProvider>
              </SidebarProvider>
            </UtilitiesProvider>
          </HttpService>
        </AuthProvider>
      </BrowserRouter>
    </LoadingProvider>
  );
}
export default App;
