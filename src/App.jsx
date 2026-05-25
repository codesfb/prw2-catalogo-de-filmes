import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'

import { api } from './services/api'

import Home from './pages/Home'
import ReadMovie from './pages/ReadMovie'
import CreateMovie from './pages/CreateMovie'
import UpdateMovie from './pages/UpdateMovie'
import DeleteMovie from './pages/DeleteMovie'
import MovieDetails from './pages/MovieDetails'
import SearchMovie from './pages/SearchMovie'
import About from './pages/About'

export default function App() {
  const [modal, setModal] = useState({ type: null, data: null })

  const [filmes, setFilmes] = useState(() => {
    try {
      const saved = localStorage.getItem('filmes')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      return []
    }
  })

  const openModal = (type, data = null) => setModal({ type, data })
  const closeModal = () => setModal({ type: null, data: null })

  const setFilmesLocal = (movies) => {
    setFilmes((prev) => {
      const next = typeof movies === 'function' ? movies(prev) : movies
      try {
        localStorage.setItem('filmes', JSON.stringify(next))
      } catch (error) {
        console.log(error)
      }
      return next
    })
  }

  async function carregarFilmes() {
    try {
      const response = await api.get('/movies')
      setFilmesLocal(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function adicionarFilme(novoFilme) {
    try {
      const response = await api.post('/movies', novoFilme)
      setFilmesLocal((prev) => [response.data, ...prev.filter((item) => item.id !== response.data.id)])
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async function atualizarFilme(movieUpdated) {
    try {
      setFilmesLocal((prev) => prev.map((item) => (item.id === movieUpdated.id ? movieUpdated : item)))
      return movieUpdated
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async function excluirFilme(id) {
    try {
      await api.delete(`/movies/${id}`)
      setFilmesLocal((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    carregarFilmes()
  }, [])


  return (
    <div className='min-h-screen bg-white text-black dark:bg-neutral-900 dark:text-white transition-all duration-300'>

      <Navbar openModal={openModal} />

      <div className='max-w-7xl mx-auto px-4 md:px-6 py-6'>
        <Routes>
          <Route path='/' element={<Home openModal={openModal} filmes={filmes} />} />
          <Route path='/read' element={<Home openModal={openModal} filmes={filmes} />} />
          <Route path='/create' element={<Home openModal={openModal} filmes={filmes} />} />
          <Route path='/update' element={<Home openModal={openModal} filmes={filmes} />} />
          <Route path='/delete' element={<Home openModal={openModal} filmes={filmes} />} />
          <Route path='/search' element={<SearchMovie />} />
          <Route path='/details/:id/:title' element={<MovieDetails />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>

{modal.type === 'create' && <CreateMovie onClose={closeModal} onCreated={adicionarFilme} />}
      {modal.type === 'read' && <ReadMovie onClose={closeModal} filme={modal.data} />}
      {modal.type === 'update' && <UpdateMovie onClose={closeModal} filme={modal.data} onUpdated={atualizarFilme} />}
      {modal.type === 'delete' && <DeleteMovie onClose={closeModal} filme={modal.data} onDeleted={excluirFilme} />}

      <footer className='border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/80 text-gray-600 dark:text-gray-400 py-6'>
        <div className='max-w-7xl mx-auto px-4 md:px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p>Developed by Fabio Santana</p>
          <Link to='/about' className='text-blue-600 hover:underline dark:text-blue-400'>Sobre este trabalho</Link>
        </div>
      </footer>
    </div>
  )
}