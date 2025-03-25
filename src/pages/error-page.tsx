import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircle, MapPin } from 'lucide-react'

type Props = {
	error: string
	geoLocation: () => void
	variant: string
}

export function ErrorPageAlert({ error, geoLocation }: Props) {
	return (
		<Alert variant='destructive'>
			<AlertCircle className='h-4 w-4' />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription className='flex flex-col gap-4'>
				<p>{error}</p>
				<Button onClick={geoLocation} variant={'outline'} className='w-fit'>
					<MapPin className='mr-2 h-4 w-4' />
					Enable Location
				</Button>
			</AlertDescription>
		</Alert>
	)
}
