import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='max-w-5xl mx-auto px-4 py-8'>
      <div className='rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm'>
        <h1 className='text-3xl font-bold mb-4'>Sobre este projeto</h1>
        <p className='text-gray-700 dark:text-gray-300 leading-7'>
          Este é um trabalho com propósito de estudo e prática em React, rotas e gerenciamento de estado.
          Aqui você pode criar, atualizar, excluir e buscar filmes enquanto explora a interface.
         <p>utilizei o tailwind pela primeira vez nesse projeto </p> 
        </p>
        <p className='mt-4 text-gray-600 dark:text-gray-400'>
          O objetivo é aprender e demonstrar como construir uma aplicação simples de catálogo de filmes.
        </p>
        <Link
          to='/'
          className='inline-flex items-center justify-center mt-6 rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700'
        >
          Voltar para o catálogo
        </Link>
      </div>
    </div>
  )
}
