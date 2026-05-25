import { useLocation, useParams } from 'react-router-dom'

export default function MovieDetails() {
  const { id, title } = useParams()
  const location = useLocation()
  const filme = location.state?.filme
  const displayTitle = filme?.title || decodeURIComponent(title || '')
  const displayGenre = filme?.genre || 'Gênero não disponível'
  const displayYear = filme?.year || 'Ano não disponível'
  const displayImage = filme?.image || 'https://placehold.co/600x400?text=Sem+Imagem'

  return (
    <div className='max-w-5xl mx-auto px-4 py-8'>
      <div className='grid gap-6 md:grid-cols-[320px_1fr]'>
        <img
          src={displayImage}
          alt={displayTitle}
          className='w-full h-[420px] object-cover rounded-3xl shadow-2xl'
        />

        <div className='space-y-6'>
          <div>
            <p className='text-sm text-gray-500 dark:text-gray-400'>ID do filme: {id}</p>
            <h1 className='text-4xl font-bold'>{displayTitle}</h1>
            <p className='mt-2 text-base text-gray-600 dark:text-gray-300'>Esta página mostra as informações do filme selecionado na rota.</p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6'>
              <p className='text-sm text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]'>Gênero</p>
              <p className='mt-3 text-xl font-semibold'>{displayGenre}</p>
            </div>
            <div className='rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6'>
              <p className='text-sm text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]'>Ano</p>
              <p className='mt-3 text-xl font-semibold'>{displayYear}</p>
            </div>
          </div>

          <div className='rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6'>
            <h2 className='text-xl font-semibold mb-3'>Sobre este filme</h2>
            <p className='text-gray-600 dark:text-gray-300'>Aqui estão os dados que já temos sobre o filme. Caso você recarregue a página, o título continuará disponível pela rota.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
