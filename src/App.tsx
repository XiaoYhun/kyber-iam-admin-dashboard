import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { ErrorComponent, notificationProvider, RefineSnackbarProvider, ThemedLayoutV2 } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider } from "./rest-data-provider";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { ClientList, BlogPostShow, ClientEdit, ClientCreate } from "./pages/client";
import { useEffect } from "react";
import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("https://oauth-admin-api.dev.kyberengineering.io/admin")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              resources={[
                {
                  name: "clients",
                  list: "/clients",
                  create: "/clients/create",
                  edit: "/clients/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2 Header={() => <Header sticky />}>
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route path="/clients">
                    <Route index element={<ClientList />} />
                    <Route path="create" element={<ClientCreate />} />
                    <Route path="edit/:id" element={<ClientEdit />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
