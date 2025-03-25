import { Skeleton } from '@/components/ui/skeleton'

export function WeatherSkeleton() {
	return (
		<div className='flex flex-col space-y-6'>
			<div className='grid gap-6'>
				<Skeleton className='h-[300px] w-full rounded-lg' />
				<Skeleton className='h-[300px] w-full rounded-lg' />
			</div>
			<div className='grid gap-6 md:grid-cols-2'>
				<Skeleton className='h-[300px] w-full rounded-lg' />
				<Skeleton className='h-[300px] w-full rounded-lg' />
			</div>
		</div>
	)
}
