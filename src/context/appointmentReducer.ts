import type { Booking, Patient, Slot } from '../types/appointment'

export interface AppointmentState {
  slots: Slot[]
  bookings: Booking[]
  patient: Patient | null
}

export type AppointmentAction =
  | {
      type: 'SET_PATIENT'
      payload: Patient
    }
  | {
      type: 'BOOK_SLOT'
      payload: {
        slotId: string
      }
    }
  | {
      type: 'CANCEL_BOOKING'
      payload: {
        slotId: string
      }
    }

export function appointmentReducer(
  state: AppointmentState,
  action: AppointmentAction,
): AppointmentState {
  switch (action.type) {
    case 'SET_PATIENT':
      return {
        ...state,
        patient: action.payload,
      }

    case 'BOOK_SLOT': {
      if (!state.patient) {
        return state
      }

      const slot = state.slots.find(
        (currentSlot) => currentSlot.id === action.payload.slotId,
      )

      if (!slot || slot.status !== 'available') {
        return state
      }

      const alreadyBooked = state.bookings.some(
        (booking) =>
          booking.slotId === slot.id && booking.status === 'confirmed',
      )

      if (alreadyBooked) {
        return state
      }

      return {
        ...state,
        bookings: [
          ...state.bookings,
          {
            slotId: slot.id,
            patient: state.patient,
            status: 'confirmed',
          },
        ],
      }
    }

    case 'CANCEL_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking.slotId === action.payload.slotId &&
          booking.status === 'confirmed'
            ? { ...booking, status: 'cancelled' }
            : booking,
        ),
      }

    default:
      return state
  }
}