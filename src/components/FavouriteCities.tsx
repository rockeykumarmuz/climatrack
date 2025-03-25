import useFavourite from '@/hooks/use-favourite'
import { useWeatherQuery } from '@/hooks/use-weather'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Loader2, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { toast } from 'sonner'

interface FavouriteCityTabProps {
	id: string
	name: string
	lat: number
	lon: number
	onRemove: (id: string) => void
}

const FavouriteCity = () => {
	const { favourites, removeFavourite } = useFavourite()

	return (
		<div>
			<h1 className='textxl font-bold tracking-tight'>Favourites</h1>
			<ScrollArea className='w-full pb-4'>
				<div className='flex gap-4'>
					{favourites.map(city => (
						<FavouriteCityTab key={city.id} {...city} onRemove={() => removeFavourite.mutate(city.id)} />
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

function FavouriteCityTab({ id, name, lat, lon, onRemove }: FavouriteCityTabProps) {
	const navigate = useNavigate()
	const { data: weather, isLoading } = useWeatherQuery({ lat, lon })

	return (
		<div
			onClick={() => navigate(`city/${name}?lat=${lat}&lon=${lon}`)}
			role='button'
			tabIndex={0}
			className='relative flex min-w-[250px] cursor-point items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md cursor-pointer'>
			<Button
				className='absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100 cursor-pointer'
				onClick={e => {
					e.stopPropagation()
					onRemove(id)
					toast.error(`Removed ${name} from Favourites`)
				}}>
				<X className='h-4 w-4' />
			</Button>

			{isLoading ? (
				<div className='flex h-8 items-center justify-center'>
					<Loader2 className='animate-spin h-4 w-4' />
				</div>
			) : weather ? (
				<>
					<div className='flex items-center gap-2'>
						<img
							src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
							alt={weather.weather[0].description}
							className='h-8 w-8'
						/>
						<div>
							<p className='font-medium'>{name}</p>
							<p className='text-xs text-muted-foreground'>{weather.sys.country}</p>
						</div>
					</div>
					<div className='ml-auto text-right'>
						<p className='text-xl font-bold'>{Math.round(weather.main.temp)}°C</p>
						<p className='text-xs text-muted-foreground'>{weather.weather[0].description}</p>
					</div>
				</>
			) : null}
		</div>
	)
}

export default FavouriteCity
