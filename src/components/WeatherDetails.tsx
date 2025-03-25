import { WeatherData } from '@/api/types'
import { format } from 'date-fns'
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface WeatherDetailProps {
	data: WeatherData
}

const WeatherDetails = ({ data }: WeatherDetailProps) => {
	const { wind, main, sys } = data

	// function to format time
	const formatTime = (timestamp: number) => {
		return format(new Date(timestamp * 1000), 'h: mm a')
	}

	// this function calculate wind direction based on eight direction and at last mod 8 for decimal values so that it mod lies in between 0-7
	const getWindDirection = (degree: number) => {
		const direction = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

		const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8
		return direction[index]
	}

	// weather details for two section like sunrise and sunset
	const details = [
		{
			title: 'Sunrise',
			value: formatTime(sys.sunrise),
			icon: Sunrise,
			color: 'text-orange-500',
		},
		{
			title: 'Sunset',
			value: formatTime(sys.sunset),
			icon: Sunset,
			color: 'text-blue-500',
		},
		{
			title: 'Wind Direction',
			value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
			icon: Compass,
			color: 'text-green-500',
		},
		{
			title: 'Pressure',
			value: `${main.pressure} hPa`,
			icon: Gauge,
			color: 'text-red-500',
		},
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle>Weather Details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid gap-6 sm:grid-cols-2'>
					{details.map(detail => {
						return (
							<div key={detail.title} className='flex items-center gap-3 rounded-lg border p-4'>
								<detail.icon className={`h-5 w-5 ${detail.color}`} />
								<div>
									<p className='text-sm font-medium leading-none'>{detail.title}</p>
									<p className='text-sm text-muted-foreground'>{detail.value}</p>
								</div>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}

export default WeatherDetails
