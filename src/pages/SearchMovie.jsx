import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SearchMovie() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await api.get('/movies')
        setMovies(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadMovies()
  }, [])

  function handleSearch(event) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) {
      setResults([])
      setStatus('idle')
      return
    }

    const normalizedQuery = trimmed.toLowerCase()
    const numericId = Number(trimmed)

    const filtered = movies.filter((movie) => {
      const matchesId = !Number.isNaN(numericId) && movie.id === numericId
      const matchesTitle = movie.title?.toLowerCase().includes(normalizedQuery)
      return matchesId || matchesTitle
    })

    setResults(filtered)
    setStatus('searched')
  }

  function handleClear() {
    setQuery('')
    setResults([])
    setStatus('idle')
  }

  return (
    <div className='max-w-5xl mx-auto px-4 py-8'>
      <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Buscar Filme</h1>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>Pesquise por ID ou nome e veja apenas o item correspondente.</p>
        </div>

        <Link
          to='/'
          className='inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition'
        >
          <X size={16} />
          Voltar
        </Link>
      </div>

      <form onSubmit={handleSearch} className='mb-6 flex flex-col gap-3 sm:flex-row'>
        <label className='sr-only' htmlFor='search-query'>Pesquisar filme</label>
        <input
          id='search-query'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Digite o ID ou o nome do filme'
          className='min-w-0 flex-1 rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900'
        />

        <button
          type='submit'
          className='inline-flex items-center justify-center gap-2 rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700'
        >
          <Search size={18} />
          Buscar
        </button>

        <button
          type='button'
          onClick={handleClear}
          className='inline-flex items-center justify-center rounded-3xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800'
        >
          Limpar
        </button>
      </form>

      <div className='rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6'>
        {status === 'idle' && (
          <p className='text-gray-600 dark:text-gray-300'>Digite um termo e clique em Buscar para encontrar um filme.</p>
        )}

        {status === 'searched' && results.length === 0 && (
          <p className='text-gray-600 dark:text-gray-300'>Nenhum filme encontrado para &quot;{query}&quot;.</p>
        )}

        {results.length > 0 && (
          <div className='space-y-6'>
            {results.map((filme) => (
              <div key={filme.id} className='grid gap-4 rounded-3xl border border-gray-200 dark:border-neutral-800 bg-gray-50 p-5 dark:bg-neutral-950'>
                <div className='grid gap-4 md:grid-cols-[200px_1fr]'>
                  <img
                    src={filme.image || 'https://placehold.co/600x400?text=Sem+Imagem'}
                    alt={filme.title}
                    className='h-52 w-full rounded-3xl object-cover md:h-full'
                  />
                  <div className='space-y-4'>
                    <div>
                      <p className='text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400'>ID</p>
                      <p className='text-xl font-semibold'>{filme.id}</p>
                    </div>
                    <div>
                      <p className='text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400'>Título</p>
                      <p className='text-xl font-semibold'>{filme.title}</p>
                    </div>
                    <div className='grid gap-3 sm:grid-cols-2'>
                      <div>
                        <p className='text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400'>Gênero</p>
                        <p className='text-base'>{filme.genre}</p>
                      </div>
                      <div>
                        <p className='text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400'>Ano</p>
                        <p className='text-base'>{filme.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
