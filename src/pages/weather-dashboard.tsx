import { Button } from '@/components/ui/button'
import { useGeoLocation } from '@/hooks/use-geolocation'
import { RefreshCcw } from 'lucide-react'
import { WeatherSkeleton } from './loading-skeleton'
import { ErrorPageAlert } from './error-page'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather'
import CurrentWeather from '@/components/CurrentWeather'
import HourlyTemprature from '@/components/HourlyTemprature'
import WeatherDetails from '@/components/WeatherDetails'
import WeatherForecast from '@/components/WeatherForecast'
import FavouriteCities from '@/components/FavouriteCities'

const WeatherDashboard = () => {
	const { coordinates, error: locationError, geoLocation, isLoading: isLocationLoading } = useGeoLocation()

	const locationQuery = useReverseGeocodeQuery(coordinates)
	const forecastQuery = useForecastQuery(coordinates)
	const weatherQuery = useWeatherQuery(coordinates)

	const locationName = locationQuery.data?.[0]

	const handleRefresh = () => {
		geoLocation()
		if (coordinates) {
			locationQuery.refetch()
			forecastQuery.refetch()
			weatherQuery.refetch()
		}
	}

	if (isLocationLoading) {
		return <WeatherSkeleton />
	}

	if (locationError) {
		console.log(locationError)
		return <ErrorPageAlert error={locationError} geoLocation={geoLocation} variant={'destructive'} />
	}

	if (!coordinates) {
		return <ErrorPageAlert error='Unable to get your location' geoLocation={geoLocation} variant={'destructive'} />
	}

	if (!weatherQuery.data || !forecastQuery.data) {
		return <WeatherSkeleton />
	}

	return (
		<div className='space-y-4'>
			{/* Favourite cities */}
			<div className='overflow-x-auto'>
				<FavouriteCities />
			</div>

			<div className='flex items-center justify-between'>
				<h1 className='text-xl font-bold tracking-tight'>My Location</h1>
				<Button
					variant={'outline'}
					size={'icon'}
					onClick={handleRefresh}
					className='w-fit p-2 cursor-pointer'
					disabled={weatherQuery.isFetching || forecastQuery.isFetching}>
					<RefreshCcw className={`mr-2 h-4 w-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`} />
					Retry
				</Button>
			</div>

			<div className='grid gap-6'>
				<div className='flex flex-col lg:flex-row gap-4'>
					<CurrentWeather data={weatherQuery.data} locationName={locationName} />
					<HourlyTemprature data={forecastQuery.data} />
				</div>

				<div className='grid gap-6 md:grid-cols-2 items-start'>
					<WeatherDetails data={weatherQuery.data} />
					<WeatherForecast data={forecastQuery.data} />
				</div>

				<div></div>
			</div>
		</div>
	)
}

export default WeatherDashboard
