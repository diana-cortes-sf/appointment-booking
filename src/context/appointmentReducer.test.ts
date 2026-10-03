import { describe, expect, it } from 'vitest'
import {
  appointmentReducer,
  type AppointmentState,
} from './appointmentReducer'

const initialState: AppointmentState = {
  slots: [
    {
      id: 'slot-001',
      doctorId: 'doc-001',
      doctorName: 'Dr. Maria Torres',
      specialty: 'Cardiology',
      date: '2026-06-01',
      dayOfWeek: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      shift: 'morning',
      status: 'available',
    },
  ],
  bookings: [],
  patient: {
    name: 'Diana',
    contact: 'diana@example.com',
  },
}

describe('appointmentReducer', () => {
  it('creates a confirmed booking', () => {
    const nextState = appointmentReducer(initialState, {
      type: 'BOOK_SLOT',
      payload: {
        slotId: 'slot-001',
      },
    })

    expect(nextState.bookings).toEqual([
      {
        slotId: 'slot-001',
        patient: initialState.patient,
        status: 'confirmed',
      },
    ])
  })

  it('does not book the same slot twice', () => {
    const bookedState = appointmentReducer(initialState, {
      type: 'BOOK_SLOT',
      payload: {
        slotId: 'slot-001',
      },
    })

    const nextState = appointmentReducer(bookedState, {
      type: 'BOOK_SLOT',
      payload: {
        slotId: 'slot-001',
      },
    })

    expect(nextState.bookings).toHaveLength(1)
  })

  it('cancels a confirmed booking', () => {
    const bookedState = appointmentReducer(initialState, {
      type: 'BOOK_SLOT',
      payload: {
        slotId: 'slot-001',
      },
    })

    const nextState = appointmentReducer(bookedState, {
      type: 'CANCEL_BOOKING',
      payload: {
        slotId: 'slot-001',
      },
    })

    expect(nextState.bookings[0].status).toBe('cancelled')
  })
})