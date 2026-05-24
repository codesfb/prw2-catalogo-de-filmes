import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Film,
    Home,
    Plus,
    Moon,
    Sun
} from 'lucide-react'

export default function Navbar({ openModal }) {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setIsDarkMode(true)
        }
    }, [])

    function toggleTheme() {
        document.documentElement.classList.toggle('dark')
        
        const isDark = document.documentElement.classList.contains('dark')
        setIsDarkMode(isDark)
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }

    return (
        <header className='sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80'>

            <nav className='max-w-7xl mx-auto px-4 md:px-6 py-4'>

                <div className='flex flex-col md:flex-row md:items-center gap-4'>

                    <div className='flex items-center gap-3'>

                        <Link to='/'>
                                <div className='bg-neutral-900 dark:bg-white p-2 rounded-2xl'>

                                <Film className='text-white dark:text-black' size={22} />


                            </div>
                        </Link>

                        <Link to='/'>
                            <div>
                                <h1 className='text-lg md:text-xl font-bold'>
                                    Catálogo de Filmes
                                </h1>


                            </div>
                        </Link>

                    </div>

                    <div className='flex flex-wrap items-center gap-2 md:ml-auto'>

                        <Link
                            to='/'
                                className='flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition text-sm md:text-base'
                        >
                            <Home size={18} />
                            Início
                        </Link>

                        <button
                            onClick={() => openModal('create')}
                            className='flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition text-sm md:text-base cursor-pointer'
                        >
                            <Plus size={18} />
                            Criar
                        </button>

                        <button
                            onClick={toggleTheme}
                                className='p-3 rounded-2xl border border-gray-200 dark:border-neutral-700 hover:scale-105 transition'
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                    </div>

                </div>

            </nav>

        </header>
    )
}