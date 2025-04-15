
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import TaskPage from "./components/task/task";
import { LoadingProvider } from "./services/loadingservice";
import Layout from "./layouts/layout";
import { SidebarProvider } from "./services/sidebarservice";
import { UtilitiesProvider } from "./services/utilitiesservice";
import Brand from "./components/brand/brand";
import { HttpService } from "./services/httpservice";
import { PageQueryProvider } from "./services/pagequery";
import Login from "./components/login/login";
import { AuthProvider } from "./services/authservice";
import { AfterLoginGuard, BeforeLoginGuard } from "./services/guad";
import Menu from "./components/menu/menu";
import { InterceptorProvider } from "./services/interceptors";
function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <AuthProvider>
          <InterceptorProvider>
            <HttpService>
              <UtilitiesProvider>
                <SidebarProvider>
                  <PageQueryProvider>
                    <Routes>
                      <Route path="login" element={<BeforeLoginGuard><Login /></BeforeLoginGuard>} />
                      <Route path="/" element={<AfterLoginGuard><Layout /></AfterLoginGuard>}>
                        <Route index element={<AfterLoginGuard><TaskPage /></AfterLoginGuard>} />
                        <Route path="menu" element={<Menu />} />
                        <Route path="brand" element={<Brand />} />
                      </Route>
                    </Routes>
                  </PageQueryProvider>
                </SidebarProvider>
              </UtilitiesProvider>
            </HttpService>
          </InterceptorProvider>
        </AuthProvider>
      </BrowserRouter>
    </LoadingProvider>
  );
}
export default App;
