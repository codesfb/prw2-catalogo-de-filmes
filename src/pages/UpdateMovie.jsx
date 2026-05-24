import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UpdateMovie({ onClose, filme, route = '/update' }) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(route, { replace: false })
  }, [navigate, route])

  const handleClose = () => {
    navigate('/')
    if (onClose) onClose()
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

      <form className='flex flex-col gap-4'>

        <input
          type='text'
          defaultValue={filme?.title || 'Interestelar'}
          className='border border-gray-200 dark:border-neutral-700 p-3 rounded bg-transparent'
        />

        <input
          type='text'
          defaultValue={filme?.genre || 'Ficção Científica'}
          className='border border-gray-200 dark:border-neutral-700 p-3 rounded bg-transparent'
        />

        <button type='button' onClick={handleClose} className='bg-yellow-500 hover:bg-yellow-600 transition text-black p-3 rounded'>
          Atualizar Filme
        </button>

      </form>

      </div>

    </div>
  )
}