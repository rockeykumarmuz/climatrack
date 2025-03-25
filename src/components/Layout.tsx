import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='bg-gradient-to-br from-background to-muted mx-auto'>
			<Header />
			<main className='min-h-screen container mx-auto px-4 py-8'>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
