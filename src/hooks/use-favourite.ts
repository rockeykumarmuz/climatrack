import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalStorage } from './use-localStorgae'

interface FavouriteCity {
	id: string
	lat: number
	lon: number
	name: string
	country: string
	state?: string
	addedAt: number
}

export default function useFavourite() {
	const [favourites, setFavourites] = useLocalStorage<FavouriteCity[]>('favourites', [])

	const queryClient = useQueryClient()

	const favouriteQuery = useQuery({
		queryKey: ['favourites'],
		queryFn: () => favourites,
		initialData: favourites,
	})

	// function to handle the addTo favuorites city section while searching the city weathers
	const addToFavourite = useMutation({
		mutationFn: async (city: Omit<FavouriteCity, 'id' | 'addedAt'>) => {
			const newFavourite: FavouriteCity = {
				...city,
				id: `${city.lat}-${city.lon}`,
				addedAt: Date.now(),
			}

			// chacking that the city is not already in the favourites
			const existedCity = favourites.some(fav => fav.id === newFavourite.id)

			// if exst then return the same city
			if (existedCity) return favourites
			//  else add the new city to the favourites
			const newFavourites = [...favourites, newFavourite].slice(0, 10)

			setFavourites(newFavourites)
			return newFavourites
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['favourites'],
			})
		},
	})

	// function to handle the addto favuorites city section while searching the city weathers
	const removeFavourite = useMutation({
		mutationFn: async (cityId: string) => {
			const newFavourites = favourites.filter(fav => fav.id !== cityId)
			setFavourites(newFavourites)
			return newFavourites
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['favourites'],
			})
		},
	})

	return {
		favourites: favouriteQuery.data ?? [],
		addToFavourite,
		removeFavourite,
		// this function tells that the favourite city is already in the favourites
		isFavourite: (lat: number, lon: number) => favourites.some(city => city.lat === lat && city.lon === lon),
	}
}
