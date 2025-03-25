export const API_CONFIG = {
	BASE_URL: 'https://api.openweathermap.org/data/2.5',
	GEO: 'https://api.openweathermap.org/geo/1.0',
	API_KEY: import.meta.env.VITE_OPEN_WEATHER_API_KEY,

	DEFAULT_PARAMS: {
		UNITS: 'metric',
		APPID: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
	},
}
