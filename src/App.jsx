import { Suspense, lazy } from 'react'
import './App.less'

const Content = lazy(() => import('./components/Content.jsx'))

function App() {
  
  
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </>
  )
}

export default App


