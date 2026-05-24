import { X } from 'lucide-react'

export default function ReadMovie({ onClose, filme }) {

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>

      <div className='bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6 rounded-2xl max-w-xl w-full relative shadow-2xl'>

        <button onClick={onClose} className='absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition'>
          <X size={20} />
        </button>

      <h1 className='text-3xl font-bold mb-6'>
        Ler Filme
      </h1>

        <div className='flex flex-col gap-2 text-lg'>
          <p><strong>Título:</strong> {filme?.title || 'Interestelar'}</p>
          <p><strong>Gênero:</strong> {filme?.genre || 'Ficção Científica'}</p>
        </div>

      </div>

    </div>
  )
}