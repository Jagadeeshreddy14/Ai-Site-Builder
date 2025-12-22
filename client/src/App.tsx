import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'  // Change this line
import Projects from './pages/Projects'
import Pricing from './pages/Pricing'
import Preview from './pages/Preview'
import View from './pages/View'
import Community from './pages/Community'
import MyProjects from './pages/MyProjects'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/preview/:projectId" element={<Preview />} />
        <Route path="/preview/:projectId/:versionId" element={<Preview />} />
        <Route path="/view/:projectId" element={<View />} />
        <Route path="/community" element={<Community />} />
        <Route path="/projects" element={<MyProjects />} />
      </Routes>
    </div>
  )
}

export default App