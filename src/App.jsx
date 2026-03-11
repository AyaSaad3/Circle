import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import Feed from './Pages/Feed'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'
import Settings from './Pages/Settings'
import NotFound from './Pages/NotFound'
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import ProtectedRoute from './protectedRoutes/protectedRoutes'
import ProtectedAuthRoute from './protectedRoutes/protectedAuthRoute'
import CounterContextProvider from './contexts/counterContext'
import AuthContextProvider from './contexts/authContext'
import PostDetails from './Pages/PostDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path: '', element: <MainLayout />, children: [
      { index: true, element: <ProtectedRoute><Feed /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'posts/:postId', element: <ProtectedRoute><PostDetails /></ProtectedRoute> },
      { path: 'settings', element: <ProtectedRoute><Settings /></ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ]
  },
  {
    path: '', element: <AuthLayout />, children: [
      { path: 'signin', element: <ProtectedAuthRoute><SignIn /></ProtectedAuthRoute> },
      { path: 'signup', element: <ProtectedAuthRoute><SignUp /></ProtectedAuthRoute> },
    ]
  }
])

export const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CounterContextProvider>
            <HeroUIProvider>
              <ToastProvider />
              <RouterProvider router={router} />
            </HeroUIProvider>
          </CounterContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App