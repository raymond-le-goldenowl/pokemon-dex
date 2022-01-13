import React, { lazy } from 'react'
import { createBrowserHistory } from 'history'
import { Navigate, Route, Routes } from 'react-router-dom'
import { nanoid } from 'nanoid'
const HomePage = lazy(() => import('./pages/Home'))
const DetailPage = lazy(() => import('./pages/Detail'))

export const history = createBrowserHistory()

export const routes = {
  homePage: {
    path: '/home',
    exact: true,
    component: HomePage
  },
  detailPage: {
    path: '/detail/:id',
    exact: true,
    component: DetailPage
  },
  default: {
    path: '/',
    component: () => <Navigate to={`/home`} />
  }
}

export const renderRouteConfigs = routes => {
  return (
    <Routes>
      {Object.values(routes).map((route, index) => {
        const Layout = route.layout || React.Fragment

        return (
          <Route
            key={nanoid()}
            path={route.path}
            exact={route.exact}
            element={
              <Layout>
                <route.component />
              </Layout>
            }
          />
        )
      })}
    </Routes>
  )
}
