import { X } from 'lucide-react'
import { useState } from 'react'
import { api } from '../services/api'

export default  function CreateMovie({ onClose, onCreated }) {
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [year, setYear] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        if (onClose) onClose()
    }



    async function criarFilme(e) {

        e.preventDefault()
        const imagemAutomatica = await buscarImagemFilme(title)

        const filme = {
            title,
            genre,
            year,
            image:imagemAutomatica
        }

        try {
            setLoading(true)
            //const response = await api.post('/movies', filme)
            if (onCreated) await onCreated(filme)
            handleClose()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    async function buscarImagemFilme(nomeFilme) {

        try {

            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=f69878b76bd4902f13b9a865b82e2bb1&query=${nomeFilme}`
            )

            const data = await response.json()

            if (data.results.length > 0) {

                const poster = data.results[0].poster_path

                return `https://image.tmdb.org/t/p/w500${poster}`
            }

            return ''

        } catch (error) {

            console.log(error)

            return ''
        }
    }


    

    return (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>

            <div className='bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6 rounded-2xl max-w-xl w-full relative shadow-2xl'>

                <button onClick={handleClose} className='absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition'>
                    <X size={20} />
                </button>

                <h1 className='text-3xl font-bold mb-6'>
                    Criar Filme
                </h1>

                <form
                    onSubmit={criarFilme}
                    className='flex flex-col gap-4'
                >

                    <input
                        type='text'
                        placeholder='Título'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border border-gray-200 dark:border-neutral-700 p-3 rounded bg-transparent'
                    />

                    <input
                        type='text'
                        placeholder='Gênero'
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className='border border-gray-200 dark:border-neutral-700 p-3 rounded bg-transparent'
                    />

                    <input
                        type='number'
                        placeholder='Ano'
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className='border border-gray-200 dark:border-neutral-700 p-3 rounded bg-transparent'
                    />

                    <button type='submit' disabled={loading} className='bg-green-600 hover:bg-green-700 transition text-white p-3 rounded disabled:opacity-60'>
                        {loading ? 'Salvando...' : 'Salvar Filme'}
                    </button>

                </form>

            </div>

        </div>
    )
}