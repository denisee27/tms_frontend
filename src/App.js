
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import TaskPage from "./components/task/task";
import Layout from "./layouts/layout";
import Brand from "./components/brand/brand";
import Login from "./components/login/login";
import { AfterLoginGuard, BeforeLoginGuard } from "./services/guad";
import Menu from "./components/menu/menu";
import { LoadingProvider } from "./services/loadingservice";
import { AuthProvider } from "./services/authservice";
import { InterceptorProvider } from "./services/interceptors";
import { HttpService } from "./services/httpservice";
import { UtilitiesProvider } from "./services/utilitiesservice";
import { SidebarProvider } from "./services/sidebarservice";
import { PageQueryProvider } from "./services/pagequery";

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
