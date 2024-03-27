import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Dashboard from './scenes/dashboard'
import Block from './scenes/block'
import Transaction from './scenes/transaction'
import { Route, Routes } from 'react-router-dom'
import Validator from './scenes/validator'
import PageTitle from './components/PageTitle'
import { BlockDetail } from './scenes/blockDetail'
import NotFound from './scenes/notFound'
import { TransactionDetail } from './scenes/transactionDetail'
import { ValidatorDetail } from './scenes/validatorDetail'
import { ToastContainer } from 'react-toastify'
import Sidebar from './scenes/global/Sidebar'
import Topbar from './scenes/global/Topbar'
import { useLayout } from './contexts/LayoutContext'

function App() {
  const [theme, colorTheme] = useMode()

  const { isCollapsed } = useLayout()

  return (
    <ColorModeContext.Provider value={colorTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className={`content ${isCollapsed ? 'collapsed' : ''}`}>
            <Topbar />
            <Routes>
              <Route
                index
                element={
                  <>
                    <PageTitle title="Dashboard" />
                    <Dashboard />
                  </>
                }
              />
              <Route
                path={'/blocks'}
                element={
                  <>
                    <PageTitle title="Blocks" />
                    <Block />
                  </>
                }
              />
              <Route
                path={'/validators'}
                element={
                  <>
                    <PageTitle title="Validators" />
                    <Validator />
                  </>
                }
              />
              <Route
                path={'/transactions'}
                element={
                  <>
                    <PageTitle title="Transactions" />
                    <Transaction />
                  </>
                }
              />
              <Route
                path={'/blocks/:blockHeight'}
                element={
                  <>
                    <PageTitle title="Block Detail" />
                    <BlockDetail />
                  </>
                }
              />
              <Route
                path={'/validators/:validatorAddress'}
                element={
                  <>
                    <PageTitle title="Validator Detail" />
                    <ValidatorDetail />
                  </>
                }
              />
              <Route
                path={'/transactions/:tx'}
                element={
                  <>
                    <PageTitle title="Transaction Detail" />
                    <TransactionDetail />
                  </>
                }
              />
              <Route
                path={'*'}
                element={
                  <>
                    <PageTitle title="NotFound" />
                    <NotFound />
                  </>
                }
              />
            </Routes>
            <ToastContainer
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={theme}
            />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
