import { X } from 'lucide-react'
import { useState } from 'react'
import { api } from '../services/api'

export default function DeleteMovie({ onClose, filme, onDeleted }) {
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    if (onClose) onClose()
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await api.delete(`/movies/${filme.id}`)
      if (onDeleted) onDeleted(filme.id)
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

        <h1 className='text-3xl font-bold mb-6 text-red-600'>
          Apagar Filme
        </h1>

        <p className='mb-8 text-lg'>
          Deseja realmente apagar o filme <strong>{filme.title || 'Interestelar'}</strong>?
        </p>

        <div className='flex gap-4'>
          <button onClick={handleClose} className='bg-gray-200 dark:bg-neutral-800 text-black dark:text-white px-6 py-3 rounded flex-1 hover:bg-gray-300 dark:hover:bg-neutral-700 transition'>Cancelar</button>
          <button onClick={handleDelete} disabled={loading} className='bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 rounded flex-1 disabled:opacity-60'>
            {loading ? 'Apagando...' : 'Apagar'}
          </button>
        </div>
      </div>
    </div>
  )
}
