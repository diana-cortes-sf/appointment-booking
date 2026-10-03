import { createContext } from 'react'
import type { Patient } from '../types/appointment'
import type { AppointmentState } from './appointmentReducer'

export interface AppointmentContextValue {
  state: AppointmentState
  setPatient: (patient: Patient) => void
  bookSlot: (slotId: string) => void
  cancelBooking: (slotId: string) => void
}

export const AppointmentContext = createContext<
  AppointmentContextValue | undefined
>(undefined)