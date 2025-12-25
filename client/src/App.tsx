
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'  // Change this line
import Projects from './pages/Projects'
import Pricing from './pages/Pricing'
import Preview from './pages/Preview'
import View from './pages/View'
import Community from './pages/Community'
import MyProjects from './pages/MyProjects'
import Navbar from './components/Navbar'
import { Toaster, } from 'sonner'
import AuthPage from './pages/auth/AuthPage'

const App = () => {
  const { pathname } = useLocation()
  const hideNavbar = pathname.startsWith('/projects/') && pathname !== '/projects' || pathname.startsWith('/view/') || pathname.startsWith('/preview/')
  return (
    <div>
      <Toaster />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/preview/:projectId" element={<Preview />} />
        <Route path="/preview/:projectId/:versionId" element={<Preview />} />
        <Route path="/view/:projectId" element={<View />} />
        <Route path="/community" element={<Community />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/auth/:pathname" element={<AuthPage />} />
      </Routes>
    </div>
  )
}

export default App