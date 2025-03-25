import { Route, Routes } from 'react-router-dom'
import WeatherDashboard from './pages/weather-dashboard'
import CityPage from './pages/city-page'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<WeatherDashboard />} />
				<Route path='/city/:cityName' element={<CityPage />} />
			</Routes>
		</>
	)
}

export default App
