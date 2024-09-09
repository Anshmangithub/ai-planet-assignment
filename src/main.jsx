import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import { Provider } from 'react-redux'
import { store } from './store/store.js'
import CreateHack from './components/CreateHack.jsx'
import Hackathon from './components/Hackathon.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
  },
  {
    path : "/createhack",
    element : <CreateHack/>
  },
  {
   path : "/hackathon/:id",
   element : <Hackathon/>
  },
  {
    path : "/createhack/:id",
    element : <CreateHack/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <RouterProvider ovider router={router}/>
    </Provider>
  </StrictMode>,
)
