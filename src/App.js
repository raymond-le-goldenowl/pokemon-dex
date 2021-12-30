import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { history, renderRouteConfigs, _routes } from './Router'

function App() {
  return (
    <div className="App">
      <Suspense fallback={<p>...</p>}>
        <BrowserRouter history={history}>
          {renderRouteConfigs(_routes)}
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
