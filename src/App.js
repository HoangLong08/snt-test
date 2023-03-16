import { Routes, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { publicRoutes } from 'routes/public'
import CustomRouter from './CustomRouter'
import LayoutClient from 'layout/LayoutClient'
import './App.css'

const history = createBrowserHistory()

export const rootNavigate = (to) => {
  history.push(to)
}

function App() {
  return (
    <CustomRouter history={history}>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.page
          const Layout = route.layout === null ? <></> : LayoutClient
          return (
            <Route
              key={'public-route' + index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        })}
      </Routes>
    </CustomRouter>
  )
}

export default App
