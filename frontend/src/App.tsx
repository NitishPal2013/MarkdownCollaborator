import './App.css'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Join from './pages/Join.tsx'
import Create from './pages/Create.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/join',
    element: <Join/>
  },
  {
    path: '/create',
    element: <Create/>
  },
])

function App() {

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
