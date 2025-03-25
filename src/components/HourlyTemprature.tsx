import { ForecastData } from '@/api/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { format } from 'date-fns'

interface HourlyTempratureProps {
	data: ForecastData
}

const HourlyTemprature = ({ data }: HourlyTempratureProps) => {
	const chartData = data.list.slice(0, 8).map(item => ({
		time: format(new Date(item.dt * 1000), 'ha'),
		temp: Math.round(item.main.temp),
		feels_like: Math.round(item.main.feels_like),
	}))

	return (
		<Card className='flex-1'>
			<CardHeader>
				<CardTitle>Today's Temprature</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='h-[200px] w-full'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart data={chartData}>
							<XAxis dataKey='time' stroke='#888888' fontSize={12} tickLine={true} axisLine={false} />
							<YAxis
								dataKey=''
								stroke='#888888'
								fontSize={12}
								tickLine={false}
								axisLine={false}
								tickFormatter={value => `${value}°`}
							/>
							{/* Tooltip */}
							<Tooltip
								content={({ active, payload }) => {
									if (active && payload && payload.length) {
										return (
											<div className='rounded-lg bg-background border p-2 shadow-sm'>
												<div className='grid grid-cols-2 gap-2'>
													<div className='flex flex-col'>
														<span className='text-[0.70rem] uppercase text-muted-foreground'>Temprature </span>
														<span>{payload[0].value}°</span>
													</div>
													<div className='flex flex-col'>
														<span className='text-[0.70rem] uppercase text-muted-foreground'>Feels Like </span>
														<span>{payload[1].value}°</span>
													</div>
												</div>
											</div>
										)
									}
									return null
								}}
							/>
							<Line type='monotone' dataKey='temp' stroke='#2563eb' strokeWidth={2} dot={true} />
							<Line
								type='monotone'
								dataKey='feels_like'
								stroke='#64748b'
								strokeWidth={2}
								dot={true}
								strokeDasharray='5 5'
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

export default HourlyTemprature
