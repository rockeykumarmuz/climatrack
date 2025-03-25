import { useState } from 'react'
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from './ui/command'
import { Button } from './ui/button'
import { Clock, Loader2, Search, Star, XCircle } from 'lucide-react'
import { useLocationSearch } from '@/hooks/use-weather'
import { useNavigate } from 'react-router-dom'
import { useSearchHistory } from '@/hooks/use-search-history'
import { CommandSeparator } from 'cmdk'
import { format } from 'date-fns'
import useFavourite from '@/hooks/use-favourite'

const CitySearch = () => {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')
	const navigate = useNavigate()
	const { data: locations, isLoading } = useLocationSearch(query)
	const { history, addToHistory, clearHistory } = useSearchHistory()
	const { favourites } = useFavourite()

	const handleSelect = (cityData: string) => {
		const [lat, lon, name] = cityData.split('|')

		// add to the search history
		addToHistory.mutate({
			query,
			name,
			lat: parseFloat(lat),
			lon: parseFloat(lon),
			country: name,
		})

		setOpen(false)
		setQuery('')
		navigate(`/city/${name}?lat=${lat}&long=${lon}`)
	}

	return (
		<>
			<Button
				variant={'outline'}
				className='relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
				onClick={() => setOpen(true)}>
				<Search className='mr-2 h-4 w-4'>Search cities...</Search>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command>
					<CommandInput placeholder='Search cities...' value={query} onValueChange={setQuery} />
					<CommandList>
						{query.length > 1 && !isLoading && <CommandEmpty>No cities found.</CommandEmpty>}
						{/* Favourite section codes for search input */}

						{favourites.length > 0 && (
							<>
								<CommandGroup heading='Favourites'>
									<CommandSeparator />
									<CommandGroup>
										{favourites.map(fav => (
											<CommandItem
												key={`${fav.lat}-${fav.lon}`}
												value={`${fav.lat}|${fav.lon}|${fav.name}|${fav.country}`}
												onSelect={handleSelect}>
												<Star className='mr-2 h-4 w-4 text-yellow-500' />
												<span>{fav.name}</span>
												{fav.state && <span className='text-sm text-muted-foreground'>, {fav.state}</span>}
												<span className='ml-auto text-xs text-muted-foreground'>, {fav.country}</span>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandGroup>
							</>
						)}

						{/* Search history section codes */}
						{history.length > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<div className='flex items-center justify-between px-2 my-2'>
										<p className='text-sm text-muted-foreground'>Recenet Searches</p>
										<Button variant={'ghost'} size='sm' onClick={() => clearHistory.mutate()} className='p-1'>
											<XCircle className='h-4 w-4' />
											Clear
										</Button>
									</div>

									{history.map(item => (
										<CommandItem
											key={`${item.lat} ${item.lon}`}
											value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
											onSelect={handleSelect}>
											<Clock className='mr-2 h-4 w-4 text-muted-foreground' />
											<span>{item.name}</span>
											{item.state && <span className='text-sm text-muted-foreground'>, {item.state}</span>}
											<span className='ml-auto text-xs text-muted-foreground'>, {item.country}</span>
											<span className='ml-auto text-xs text-muted-foreground'>
												{format(item.searchedAt, 'MMM, d, h:mm a')}
											</span>
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}

						{/* Search Results section codes in seach city sections */}
						<CommandSeparator />
						{locations && locations.length > 0 && (
							<CommandGroup heading='Suggestions'>
								{isLoading && (
									<div className='flex items-center justify-center p-4'>
										<Loader2 className='h-4 w-4 animate-spin' />
									</div>
								)}
								{locations.map(location => {
									return (
										<div>
											<CommandItem
												key={`${location.lat} ${location.lon}`}
												value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
												onSelect={handleSelect}>
												<Search className='mr-2 h-4 w-4' />
												<span>{location.name}</span>
												{location.state && <span className='text-sm text-muted-foreground'>, {location.state}</span>}
												{location.country && (
													<span className='text-sm text-muted-foreground'>, {location.country}</span>
												)}
											</CommandItem>
										</div>
									)
								})}
							</CommandGroup>
						)}
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	)
}

export default CitySearch
