import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { history, renderRouteConfigs, routes } from './Router'

function App() {
  return (
    <div className="App">
      <Suspense fallback={<p>...</p>}>
        <BrowserRouter history={history}>
          {renderRouteConfigs(routes)}
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
