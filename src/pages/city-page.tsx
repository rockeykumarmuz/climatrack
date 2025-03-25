import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather'
import { AlertTriangle } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'
import { WeatherSkeleton } from './loading-skeleton'
import CurrentWeather from '@/components/CurrentWeather'
import HourlyTemprature from '@/components/HourlyTemprature'
import WeatherDetails from '@/components/WeatherDetails'
import WeatherForecast from '@/components/WeatherForecast'
import FavouritesButton from '@/components/FavouritesButton'

const CityPage = () => {
	const [searchParams] = useSearchParams()
	const params = useParams()

	const lat = parseFloat(searchParams.get('lat') || '0')
	const lon = parseFloat(searchParams.get('lon') || '0')

	const coordinates = {
		lat,
		lon,
	}

	const weatherQuery = useWeatherQuery(coordinates)
	const forecastQuery = useForecastQuery(coordinates)

	if (weatherQuery.error || forecastQuery.error) {
		return (
			<Alert variant='destructive'>
				<AlertTriangle className='h-4 w-4' />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription className='flex flex-col gap-4'>
					Failed to load weather data. Please try again.
				</AlertDescription>
			</Alert>
		)
	}

	if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
		return <WeatherSkeleton />
	}

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-bold tracking-tight'>
					{params.cityName} {weatherQuery.data.sys.country}
				</h1>

				{/* Favourite cities */}
				<div className='flex gap-2'>
					<FavouritesButton data={{ ...weatherQuery.data, name: params.cityName }} />
				</div>
			</div>

			<div className='grid gap-6'>
				<CurrentWeather data={weatherQuery.data} />
				<HourlyTemprature data={forecastQuery.data} />
				<div className='grid gap-6 md:grid-cols-2 items-start'>
					<WeatherDetails data={weatherQuery.data} />
					<WeatherForecast data={forecastQuery.data} />
				</div>
			</div>
		</div>
	)
}

export default CityPage
