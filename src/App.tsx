import { Refine } from '@refinedev/core'
import { Apps } from '@mui/icons-material'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedSiderV2,
} from '@refinedev/mui'

import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import routerBindings, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router-v6'
import { dataProvider } from './rest-data-provider'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { Header } from './components/header'
import { ColorModeContextProvider } from './contexts/color-mode'
import { ClientList, ClientEdit, ClientCreate } from './pages/client'
import { useState, useEffect, useCallback } from 'react'
import KyberOauth2, { ClientConfig } from '@kybernetwork/oauth2'
import useUserInfo, { UserInfo } from './hooks/useUserInfo'
import { whitelistedEmails } from './constants'
import Swal from 'sweetalert2'
import Login from './pages/login'

const OAUTH2_CLIENT_ID = 'b1ec34e2-df95-449b-a02e-c52c6f4604ca'
function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element | null {
  const loggedIn = Boolean(window.localStorage.user)

  if (!loggedIn) return <Navigate replace to="/login" />

  return children
}

const clientConfig: ClientConfig = {
  clientId: OAUTH2_CLIENT_ID,
  redirectUri: `${window.location.protocol}//${window.location.host}/login`,
  mode: 'development',
}
KyberOauth2.initialize(clientConfig)

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  const signOut = () => {
    window.localStorage.removeItem('user')
    KyberOauth2.logout()
  }

  const userInfo = useUserInfo()
  const [checkingSession, setCheckingSession] = useState(!!userInfo)

  const signIn = () => {
    KyberOauth2.authenticate()
  }

  const validateUserInfo = useCallback(async (user: UserInfo) => {
    const { email = '' } = user
    if (email?.includes('@kyber.network') || whitelistedEmails.includes(email ?? '')) {
      window.localStorage.setItem('user', JSON.stringify(user))
      if (window.location.pathname.startsWith('/login') || window.location.pathname === '/') {
        navigate('/clients')
      }
      setIsLogin(true)
    } else {
      await Swal.fire('Error', 'Your account is not whitelisted', 'error')
      signOut()
    }
  }, [])

  useEffect(() => {
    const fn = async () => {
      try {
        const { userInfo } = await KyberOauth2.getSession()
        validateUserInfo(userInfo)
      } catch (err) {
        window.localStorage.removeItem('user')
        setCheckingSession(false)
      }
    }
    fn()
  }, [])

  if (!isLogin) return <Login onClickLogin={signIn} loading={checkingSession} />

  return (
    <RefineKbarProvider>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider('https://oauth-admin-api.dev.kyberengineering.io/admin')}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: 'clients',
                list: '/clients',
                create: '/clients/create',
                edit: '/clients/edit/:id',
                meta: {
                  icon: <Apps />,
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              breadcrumb: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2
                    Header={() => <Header sticky />}
                    Sider={() => <ThemedSiderV2 Title={() => <>KyberSwap IAM Admin</>} />}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route path="/clients">
                  <Route index element={<ClientList />} />
                  <Route path="create" element={<ClientCreate />} />
                  <Route path="edit/:id" element={<ClientEdit />} />
                </Route>
                <Route path="/" element={<Navigate replace to="/clients" />}></Route>
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </RefineKbarProvider>
  )
}

export default App
