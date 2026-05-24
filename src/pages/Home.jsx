import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Home({ openModal }) {

    const [filmes, setFilmes] = useState([])

    async function carregarFilmes() {

        try {

            const response = await api.get('/movies')

            setFilmes(response.data)

        } catch (error) {

            console.log(error)

        }
    }

    useEffect(() => {
        carregarFilmes()
    }, [])

    return (

        <div>


            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-4'>

                {filmes.map(filme => (

                    <div
                        key={filme.id}
                        className='overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
                    >

                        <div className='h-60 overflow-hidden bg-zinc-200 dark:bg-zinc-800'>

                            <img
                                src={
                                    filme.image ||
                                    'https://placehold.co/600x400?text=Sem+Imagem'
                                }
                                alt={filme.title}
                                className='w-full h-full object-cover group-hover:scale-105 transition duration-300'
                            />

                        </div>

                        <div className='p-3'>

                            <h2 className='text-base font-bold line-clamp-1'>
                                {filme.title}
                            </h2>

                            <p className='text-sm text-zinc-500'>
                                {filme.genre}
                            </p>

                            <div className='flex items-center justify-between mt-3'>
                                <button onClick={() => openModal('read', filme)} className='text-sm font-medium hover:underline text-blue-600 dark:text-blue-400'>
                                    Detalhes
                                </button>
                                <div className='flex items-center gap-3'>
                                    <button onClick={() => openModal('update', filme)} className='text-sm font-medium hover:underline text-yellow-600 dark:text-yellow-400'>
                                        Editar
                                    </button>
                                    <button onClick={() => openModal('delete', filme)} className='text-sm font-medium hover:underline text-red-600 dark:text-red-400'>
                                        Apagar
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}