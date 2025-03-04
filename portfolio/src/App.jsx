import React from 'react'
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import ProjectView from './pages/ProjectView'
import Footer from './pages/Footer'
import PreLoader from './pages/PreLoader'

const App = () => {
  return (
    <PreLoader>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectView />} />
        </Routes>
        <Footer />
        <ToastContainer position='bottom-right' theme='dark' />
      </Router>
    </ThemeProvider>
    </PreLoader>
  )
}

export default App
