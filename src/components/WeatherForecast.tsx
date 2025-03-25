import { ForecastData } from '@/api/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { format } from 'date-fns'
import { ArrowDown, ArrowUp, Droplet, Wind } from 'lucide-react'

interface WeatherForecastProps {
	data: ForecastData
}

interface DailyForeCast {
	date: number
	temp_min: number
	temp_max: number
	humidity: number
	wind: number
	weather: {
		id: number
		main: string
		description: string
		icon: string
	}
}

// Format temperature
const formatTemp = (temp: number) => `${Math.round(temp)}°`

const WeatherForecast = ({ data }: WeatherForecastProps) => {
	const deailyForcasts = data.list.reduce((acc, forecast) => {
		const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd')

		if (!acc[date]) {
			acc[date] = {
				temp_min: forecast.main.temp_min,
				temp_max: forecast.main.temp_max,
				humidity: forecast.main.humidity,
				wind: forecast.wind.speed,
				weather: forecast.weather[0],
				date: forecast.dt,
			}
		} else {
			acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min)
			acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max)
		}

		return acc
	}, {} as Record<string, DailyForeCast>)

	const nextDays = Object.values(deailyForcasts).slice(0, 6)

	return (
		<Card>
			<CardHeader>
				<CardTitle>5-Day Forecast Details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4'>
					{nextDays.map(forecast => {
						return (
							<div key={forecast.date} className='grid grid-cols-3 gap-4 items-center rounded-lg border p-4'>
								<div>
									<p className='font-medium'>{format(new Date(forecast.date * 1000), 'EEE, MMM, d')}</p>
									<p className='text-sm text-muted-foreground capitalize'>{forecast.weather.description}</p>
								</div>
								<div className='flex gap-4 justify-center'>
									<span className='flex items-center gap-1 text-blue-500'>
										<ArrowDown className='mr-1 h-4 w-4' />
										{formatTemp(forecast.temp_min)}
									</span>
									<span className='flex items-center text-red-500'>
										<ArrowUp className='mr-1 h-4 w-4' />
										{formatTemp(forecast.temp_max)}
									</span>
								</div>
								<div className='flex flex-col justify-end gap-4 sm:flex-col'>
									<span className='flex items-center gap-1'>
										<Droplet className='h-4 w-4 text-blue-500' />
										<span className='text-sm'>{forecast.humidity}</span>
									</span>
									<span className='flex items-center gap-1'>
										<Wind className='h-4 w-4 text-blue-500' />
										<span className='text-sm'>{forecast.wind} m/s</span>
									</span>
								</div>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}

export default WeatherForecast
