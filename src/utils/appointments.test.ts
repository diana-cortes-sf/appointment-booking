import { describe, expect, it } from 'vitest'
import { filterSlots, getAppointments, getAvailableSlots, sortSlots } from './appointments'
import type { Booking, Slot } from '../types/appointment'

describe('getAvailableSlots', () => {
  const slots: Slot[] = [
    {
      id: 'slot-001',
      doctorId: 'doc-001',
      doctorName: 'Dr. Maria Torres',
      specialty: 'Cardiology',
      date: '2026-06-01',
      dayOfWeek: 'Monday',
      startTime: '08:00',
      endTime: '09:00',
      shift: 'morning',
      status: 'booked',
    },
    {
      id: 'slot-002',
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
  ]

  it('returns only slots that are available in the source data', () => {
    expect(getAvailableSlots(slots, [])).toEqual([slots[1]])
  })

  it('excludes slots with a confirmed booking', () => {
    const bookings: Booking[] = [
      {
        slotId: 'slot-002',
        patient: {
          name: 'Diana',
          contact: 'diana@example.com',
        },
        status: 'confirmed',
      },
    ]

    expect(getAvailableSlots(slots, bookings)).toEqual([])
  })

  it('makes a slot available again when its booking is cancelled', () => {
    const bookings: Booking[] = [
      {
        slotId: 'slot-002',
        patient: {
          name: 'Diana',
          contact: 'diana@example.com',
        },
        status: 'cancelled',
      },
    ]

    expect(getAvailableSlots(slots, bookings)).toEqual([slots[1]])
  })
})

describe('filterSlots', () => {
  const slots: Slot[] = [
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
    {
      id: 'slot-002',
      doctorId: 'doc-003',
      doctorName: 'Dr. Ana López',
      specialty: 'Dermatology',
      date: '2026-06-01',
      dayOfWeek: 'Monday',
      startTime: '10:00',
      endTime: '11:00',
      shift: 'morning',
      status: 'available',
    },
    {
      id: 'slot-003',
      doctorId: 'doc-001',
      doctorName: 'Dr. Maria Torres',
      specialty: 'Cardiology',
      date: '2026-06-02',
      dayOfWeek: 'Tuesday',
      startTime: '09:00',
      endTime: '10:00',
      shift: 'morning',
      status: 'available',
    },
  ]

  it('combines specialty and date filters', () => {
    expect(
      filterSlots(slots, {
        specialty: 'Cardiology',
        date: '2026-06-01',
      }),
    ).toEqual([slots[0]])
  })
})

describe('sortSlots', () => {
  it('sorts slots by date and start time', () => {
    const slots: Slot[] = [
      {
        id: 'slot-003',
        doctorId: 'doc-001',
        doctorName: 'Dr. Maria Torres',
        specialty: 'Cardiology',
        date: '2026-06-02',
        dayOfWeek: 'Tuesday',
        startTime: '10:00',
        endTime: '11:00',
        shift: 'morning',
        status: 'available',
      },
      {
        id: 'slot-001',
        doctorId: 'doc-001',
        doctorName: 'Dr. Maria Torres',
        specialty: 'Cardiology',
        date: '2026-06-01',
        dayOfWeek: 'Monday',
        startTime: '10:00',
        endTime: '11:00',
        shift: 'morning',
        status: 'available',
      },
      {
        id: 'slot-002',
        doctorId: 'doc-001',
        doctorName: 'Dr. Maria Torres',
        specialty: 'Cardiology',
        date: '2026-06-01',
        dayOfWeek: 'Monday',
        startTime: '08:00',
        endTime: '09:00',
        shift: 'morning',
        status: 'available',
      },
    ]

    expect(sortSlots(slots).map((slot) => slot.id)).toEqual([
      'slot-002',
      'slot-001',
      'slot-003',
    ])
  })
})

it('does not mutate the original slots array', () => {
  const slots: Slot[] = [
    {
      id: 'slot-002',
      doctorId: 'doc-001',
      doctorName: 'Dr. Maria Torres',
      specialty: 'Cardiology',
      date: '2026-06-01',
      dayOfWeek: 'Monday',
      startTime: '10:00',
      endTime: '11:00',
      shift: 'morning',
      status: 'available',
    },
    {
      id: 'slot-001',
      doctorId: 'doc-001',
      doctorName: 'Dr. Maria Torres',
      specialty: 'Cardiology',
      date: '2026-06-01',
      dayOfWeek: 'Monday',
      startTime: '08:00',
      endTime: '09:00',
      shift: 'morning',
      status: 'available',
    },
  ]

  const originalOrder = slots.map((slot) => slot.id)

  sortSlots(slots)

  expect(slots.map((slot) => slot.id)).toEqual(originalOrder)
})

describe('getAppointments', () => {
  const slots: Slot[] = [
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
    {
      id: 'slot-002',
      doctorId: 'doc-003',
      doctorName: 'Dr. Ana López',
      specialty: 'Dermatology',
      date: '2026-06-02',
      dayOfWeek: 'Tuesday',
      startTime: '10:00',
      endTime: '11:00',
      shift: 'morning',
      status: 'available',
    },
  ]

  it('combines bookings with their corresponding slots', () => {
    const bookings: Booking[] = [
      {
        slotId: 'slot-001',
        patient: {
          name: 'Diana',
          contact: 'diana@example.com',
        },
        status: 'confirmed',
      },
    ]

    expect(getAppointments(slots, bookings)).toEqual([
      {
        booking: bookings[0],
        slot: slots[0],
      },
    ])
  })

  it('ignores bookings whose slot no longer exists', () => {
    const bookings: Booking[] = [
      {
        slotId: 'missing-slot',
        patient: {
          name: 'Diana',
          contact: 'diana@example.com',
        },
        status: 'confirmed',
      },
    ]

    expect(getAppointments(slots, bookings)).toEqual([])
  })
})