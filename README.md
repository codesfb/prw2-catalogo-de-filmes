# estrutura do projeto

src/
 ├── pages/
 │    ├── Home.jsx
 │    ├── ReadMovie.jsx
 │    ├── CreateMovie.jsx
 │    ├── UpdateMovie.jsx
 │    └── DeleteMovie.jsx
 │
 ├── components/
 │    └── Navbar.jsx
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css


 ``` jsx 

 export default function Home() {

  const filmes = [
    {
      id: 1,
      titulo: 'Interestelar',
      genero: 'Ficção Científica'
    },
    {
      id: 2,
      titulo: 'Batman',
      genero: 'Ação'
    },
    {
      id: 3,
      titulo: 'Toy Story',
      genero: 'Animação'
    }
  ]

  return (
<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-4'>

  {filmes.map(filme => (

    <div
      key={filme.id}
      className='group overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
    >

      <div className='h-30 overflow-hidden bg-gray-200 dark:bg-neutral-800'>

        <img
          src={
            filme.imagem ||
            'https://placehold.co/600x400?text=Sem+Imagem'
          }
          alt={filme.titulo}
          className='w-full h-full object-cover group-hover:scale-105 transition duration-300'
        />

      </div>

      <div className='p-4'>

        <h2 className='text-lg font-bold line-clamp-1'>
          {filme.titulo}
        </h2>

        <p className='text-sm text-gray-500 dark:text-neutral-400 mt-1'>
          {filme.genero}
        </p>

        <div className='mt-4 flex items-center justify-between'>

          <span className='text-xs bg-gray-100 dark:bg-neutral-800 px-3 py-1 rounded-full'>
            Filme
          </span>

          <button className='text-sm font-medium hover:underline'>
            Detalhes
          </button>

        </div>

      </div>

    </div>

  ))}

</div>
  )
}