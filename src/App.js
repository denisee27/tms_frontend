
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
import { AfterLoginGuard, BeforeLoginGuard } from "./Services/guad";
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
                    <Route path="login" element={
                      <BeforeLoginGuard>
                        <Login />
                      </BeforeLoginGuard>
                    } />
                    <Route path="/" element={
                      <AfterLoginGuard>
                        <Layout />
                      </AfterLoginGuard>
                    }>
                      <Route index element={
                        <AfterLoginGuard>
                          <TaskPage />
                        </AfterLoginGuard>
                      } />
                      <Route path="categories" element={<Brand />} />
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
