import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function UpdateMovie({ onClose, filme, onUpdated }) {
  const [title, setTitle] = useState(filme?.title || '')
  const [genre, setGenre] = useState(filme?.genre || '')
  const [year, setYear] = useState(filme?.year || '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTitle(filme?.title || '')
    setGenre(filme?.genre || '')
    setYear(filme?.year || '')
  }, [filme])

  const handleClose = () => {
    if (onClose) onClose()
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    const dadosAtualizados = {
      title,
      genre,
      year,
      image: filme?.image || ''
    }

    try {
      const response = await api.put(`/movies/${filme.id}`, dadosAtualizados)
      if (onUpdated) onUpdated(response.data)
      handleClose()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
      <div className='bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6 rounded-2xl max-w-xl w-full relative shadow-2xl'>
        <button onClick={handleClose} className='absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition'>
          <X size={20} />
        </button>

        <h1 className='text-3xl font-bold mb-6'>
          Alterar Filme
        </h1>

        <form onSubmit={handleUpdate} className='flex flex-col gap-4'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-200 dark:border-neutral-700 p-3 rounded bg-transparent'
          />

          <input
            type='text'
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className='border border-gray-200 dark:border-neutral-700 p-3 rounded bg-transparent'
          />

          <input
            type='number'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='border border-gray-200 dark:border-neutral-700 p-3 rounded bg-transparent'
          />

          <button type='submit' disabled={loading} className='bg-yellow-500 hover:bg-yellow-600 transition text-black p-3 rounded disabled:opacity-60'>
            {loading ? 'Salvando...' : 'Atualizar Filme'}
          </button>
        </form>
      </div>
    </div>
  )
}
