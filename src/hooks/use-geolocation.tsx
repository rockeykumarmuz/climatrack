import { useEffect, useState } from 'react'
import { Coordinates } from '@/api/types'

interface GeloLocationState {
	coordinates: Coordinates | null
	error: string | null
	isLoading: boolean
}

export function useGeoLocation() {
	const [location, setLocation] = useState<GeloLocationState>({
		coordinates: null,
		error: null,
		isLoading: true,
	})

	const geoLocation = () => {
		setLocation(prev => ({ ...prev, isLoading: true, error: null }))

		if (!navigator.geolocation) {
			setLocation({
				coordinates: null,
				error: 'Geolocation is not supported by your browser',
				isLoading: false,
			})
			return
		}

		navigator.geolocation.getCurrentPosition(
			position => {
				setLocation({
					coordinates: {
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					},
					error: null,
					isLoading: false,
				})
			},
			error => {
				let errorMsg: string
				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMsg = 'You have denied the request for geolocation.'
						break
					case error.POSITION_UNAVAILABLE:
						errorMsg = 'Location information is unavailable.'
						break
					case error.TIMEOUT:
						errorMsg = 'The request to get user location timed out.'
						break
					default:
						errorMsg = 'An unknown error occurred while retrieving your location.'
				}
				setLocation({
					coordinates: null,
					error: errorMsg,
					isLoading: false,
				})
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			}
		)
	}

	useEffect(() => {
		geoLocation()
	}, [])

	return {
		...location,
		geoLocation,
	}
}
