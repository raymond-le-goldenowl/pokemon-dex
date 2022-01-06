import React, { lazy } from 'react'
import { createBrowserHistory } from 'history'
import { Navigate, Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/Home'))
const DetailPage = lazy(() => import('./pages/Detail'))
const DefaultRouteComponent = () => <Navigate to={_routes.homepage.path} />

export const history = createBrowserHistory()

export const _routes = {
  homepage: {
    path: '/home',
    exact: true,
    component: HomePage
  },
  detailpage: {
    path: '/detail/:id',
    exact: true,
    component: DetailPage
  },
  default: {
    path: '/',
    component: DefaultRouteComponent
  }
}

export const renderRouteConfigs = _routes => {
  return (
    <Routes>
      {Object.values(_routes).map((route, index) => {
        const Layout = route.layout || React.Fragment

        return (
          <Route
            key={index}
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
