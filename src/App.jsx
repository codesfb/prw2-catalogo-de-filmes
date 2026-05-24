import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import ReadMovie from './pages/ReadMovie'
import CreateMovie from './pages/CreateMovie'
import UpdateMovie from './pages/UpdateMovie'
import DeleteMovie from './pages/DeleteMovie'

export default function App() {
  const [modal, setModal] = useState({ type: null, data: null })

  const openModal = (type, data = null) => setModal({ type, data })
  const closeModal = () => setModal({ type: null, data: null })

  return (
    <div className='min-h-screen bg-white text-black dark:bg-neutral-900 dark:text-white transition-all duration-300'>

      <Navbar openModal={openModal} />

      <div className='max-w-7xl mx-auto px-4 md:px-6 py-6'>
        <Routes>
          <Route path='/' element={<Home openModal={openModal} />} />
          <Route path='/read' element={<Home openModal={openModal} />} />
          <Route path='/create' element={<Home openModal={openModal} />} />
          <Route path='/update' element={<Home openModal={openModal} />} />
          <Route path='/delete' element={<Home openModal={openModal} />} />
        </Routes>
      </div>

      {modal.type === 'create' && <CreateMovie onClose={closeModal} />}
      {modal.type === 'read' && <ReadMovie onClose={closeModal} filme={modal.data} />}
      {modal.type === 'update' && <UpdateMovie onClose={closeModal} filme={modal.data} />}
      {modal.type === 'delete' && <DeleteMovie onClose={closeModal} filme={modal.data} />}

    </div>
  )
}