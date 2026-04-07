import { createContext, useContext } from 'react'

const BookingContext = createContext(() => {})

export function useOpenBooking() {
  return useContext(BookingContext)
}

export const BookingProvider = BookingContext.Provider
