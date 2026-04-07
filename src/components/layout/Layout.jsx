import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { BookingProvider } from '../../context/BookingContext'
import { SkipLink } from './SkipLink'
import { Header } from './Header'
import { Footer } from './Footer'
import { BookingModal } from './BookingModal'
import { OrganizationSchema } from '../shared/OrganizationSchema'

function LayoutInner() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const openBooking = () => setBookingOpen(true)
  const closeBooking = () => setBookingOpen(false)

  return (
    <BookingProvider value={openBooking}>
      <SkipLink />
      <Header onOpenBooking={openBooking} />
      <main id="main" className="main-content">
        <Outlet />
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={closeBooking} />
      <OrganizationSchema />
    </BookingProvider>
  )
}

export function Layout() {
  return <LayoutInner />
}
