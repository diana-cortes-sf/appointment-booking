import { useContext } from 'react'
import { AppointmentContext } from './AppointmentContext'

export function useAppointments() {
  const context = useContext(AppointmentContext)

  if (!context) {
    throw new Error(
      'useAppointments must be used within an AppointmentProvider',
    )
  }

  return context
}