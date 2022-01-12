import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ErrorFetchDataContextProvider from './contexts/ErrorFetchDataContextProvider'
import { history, renderRouteConfigs, routes } from './Router'

function App() {
  return (
    <ErrorFetchDataContextProvider>
      <div className="App">
        <Suspense fallback={<p>Loading ...</p>}>
          <BrowserRouter history={history}>
            {renderRouteConfigs(routes)}
          </BrowserRouter>
        </Suspense>
      </div>
    </ErrorFetchDataContextProvider>
  )
}

export default App
