import {
  useCallback,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import appointmentData from '../data/appointments.json'
import {
  appointmentReducer,
  type AppointmentState,
} from './appointmentReducer'
import type { ClinicData, Patient } from '../types/appointment'
import { AppointmentContext } from './AppointmentContext'

const clinicData = appointmentData as ClinicData

const initialState: AppointmentState = {
  slots: clinicData.slots,
  bookings: [],
  patient: null,
}

interface AppointmentProviderProps {
  children: ReactNode
}

export function AppointmentProvider({
  children,
}: AppointmentProviderProps) {
  const [state, dispatch] = useReducer(
    appointmentReducer,
    initialState,
  )

  const setPatient = useCallback((patient: Patient) => {
    dispatch({
      type: 'SET_PATIENT',
      payload: patient,
    })
  }, [])

  const bookSlot = useCallback((slotId: string) => {
    dispatch({
      type: 'BOOK_SLOT',
      payload: { slotId },
    })
  }, [])

  const cancelBooking = useCallback((slotId: string) => {
    dispatch({
      type: 'CANCEL_BOOKING',
      payload: { slotId },
    })
  }, [])

  const value = useMemo(
    () => ({
      state,
      setPatient,
      bookSlot,
      cancelBooking,
    }),
    [state, setPatient, bookSlot, cancelBooking],
  )

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  )
}