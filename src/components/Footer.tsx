const Footer = () => {
	return (
		// <footer className='border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6'>
		// 	<div className='container mx-auto text-center px-4 text-gray-200'>
		// 		<p>Made with ❤️ by Rockey Kumar.</p>
		// 	</div>
		// </footer>

		// <footer className='border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6'>
		// 	<div className='container mx-auto text-center px-4'>
		// 		<p className='text-gray-800 dark:text-gray-100 text-lg font-light tracking-wide'>
		// 			Developed with passion <span className='text-red-500'>❤️</span> by Rockey Kumar.
		// 		</p>
		// 	</div>
		// </footer>

		<footer className='border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4'>
			<div className='container mx-auto text-center px-4'>
				<p className='text-lg font-light tracking-wide text-gray-800 dark:text-gray-100'>
					<span className='text-transparent font-medium bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:underline hover:cursor-pointer'>
						Developed with passion
					</span>
					<span className='text-red-500 font-medium'> ❤️ by </span>
					<span className='text-transparent font-medium bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500'>
						Rockey Kumar
					</span>
					.
				</p>
				<div className='mt-4 flex items-center justify-center gap-2'>
					<a href='https://github.com/rockeykumarmuz' target='_blank' rel='noopener noreferrer'>
						<img
							src='../../public/github-removebg-preview.png'
							alt='Github logo'
							className='h-8 bg-white rounded-lg border-none outline-0'
						/>
					</a>
					<a
						href='https://www.linkedin.com/in/rockey-kumar707/'
						target='_blank'
						rel='noopener noreferrer'
						className='ml-4'>
						<img src='../../public/linkedin.png' alt='Linkedin logo' className='h-8' />
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
