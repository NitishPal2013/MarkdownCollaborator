import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Collab from './pages/Collab.tsx'
import Join from './pages/Join.tsx'
import Create from './pages/Create.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/:id',
    element: <Collab/>
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
