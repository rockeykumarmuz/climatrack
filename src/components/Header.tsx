import { useTheme } from '@/context/theme-provider'
import { Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import CitySearch from './CitySearch'
import ClimaTrackLogo from './LogoGenerator'

const Header = () => {
	const { theme, setTheme } = useTheme()
	const isDark = theme == 'dark'

	return (
		<header className='sticky top-0 z-50 border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60'>
			<div className='container h-16 mx-auto flex items-center justify-between px-4'>
				<Link to='/'>
					{/* <img
						src={isDark ? '/weather-app.png' : '/cloud_sun.svg'}
						alt='weather-app=logo'
						className='h-14 '
					/> */}
					<ClimaTrackLogo />
				</Link>

				<div className='flex gap-4'>
					{/* search box implemenation */}
					<div className='flex gap-4'>
						<CitySearch />
					</div>
					<div
						onClick={() => setTheme(isDark ? 'light' : 'dark')}
						className={`flex items-center cursor-pointer transition-transform duration-500 ${
							isDark ? 'rotate-180' : 'rotate-0'
						} `}>
						{isDark ? (
							<Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all' />
						) : (
							<Moon className='text-blue-500 rotate-0 transition-all' />
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
