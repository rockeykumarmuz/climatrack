import { Coordinates } from '@/api/types'
import { weatherAPI } from '@/api/weather'
import { useQuery } from '@tanstack/react-query'

export const WEATHER_KEYS = {
	weather: (coords: Coordinates) => ['weather', coords] as const,
	forecast: (coords: Coordinates) => ['forecast', coords] as const,
	reverseGeocode: (coords: Coordinates) => ['reverseGeoCode', coords] as const,
	search: (query: string) => ['location-search', query] as const,
} as const

export function useWeatherQuery(coordinates: Coordinates | null) {
	const weatherQuery = useQuery({
		queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
		queryFn: () => (coordinates ? weatherAPI.getCurrentWeather(coordinates) : null),
		enabled: !!coordinates,
	})

	return weatherQuery
}

export function useForecastQuery(coordinates: Coordinates | null) {
	const forecastQuery = useQuery({
		queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
		queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
		enabled: !!coordinates,
	})

	return forecastQuery
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
	const reverseGeocodeQuery = useQuery({
		queryKey: WEATHER_KEYS.reverseGeocode(coordinates ?? { lat: 0, lon: 0 }),
		queryFn: () => (coordinates ? weatherAPI.reverseGeoCode(coordinates) : null),
		enabled: !!coordinates,
	})

	return reverseGeocodeQuery
}

export function useLocationSearch(query: string) {
	const reverseGeocodeQuery = useQuery({
		queryKey: WEATHER_KEYS.search(query),
		queryFn: () => weatherAPI.searchLocations(query),
		enabled: query.length > 1,
	})

	return reverseGeocodeQuery
}
