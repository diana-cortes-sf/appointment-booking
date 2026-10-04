import type { Booking, Slot, DayOfWeek } from '../types/appointment'

export function getAvailableSlots(
  slots: Slot[],
  bookings: Booking[],
): Slot[] {
  return slots.filter((slot) => {
    if (slot.status !== 'available') {
      return false
    }

    return !bookings.some(
      (booking) =>
        booking.slotId === slot.id && booking.status === 'confirmed',
    )
  })
}

export interface SlotFilters {
  specialty: string
  date: string
}

export function filterSlots(
  slots: Slot[],
  filters: SlotFilters,
): Slot[] {
  return slots.filter((slot) => {
    const matchesSpecialty =
      !filters.specialty || slot.specialty === filters.specialty

    const matchesDate =
      !filters.date || slot.date === filters.date

    return matchesSpecialty && matchesDate
  })
}

export function sortSlots(slots: Slot[]): Slot[] {
  return [...slots].sort(
    (a, b) =>
      a.date.localeCompare(b.date) ||
      a.startTime.localeCompare(b.startTime),
  )
}

export interface Appointment {
  booking: Booking
  slot: Slot
}

export function getAppointments(
  slots: Slot[],
  bookings: Booking[],
): Appointment[] {
  return bookings.flatMap((booking) => {
    const slot = slots.find(
      (currentSlot) => currentSlot.id === booking.slotId,
    )

    if (!slot) {
      return []
    }

    return [{ booking, slot }]
  })
}

export function getConfirmedAppointments(
  appointments: Appointment[],
): Appointment[] {
  return appointments.filter(
    ({ booking }) => booking.status === 'confirmed',
  )
}

export function getCancelledAppointments(
  appointments: Appointment[],
): Appointment[] {
  return appointments.filter(
    ({ booking }) => booking.status === 'cancelled',
  )
}

export function sortAppointments(
  appointments: Appointment[],
): Appointment[] {
  return [...appointments].sort(
    (a, b) =>
      a.slot.date.localeCompare(b.slot.date) ||
      a.slot.startTime.localeCompare(b.slot.startTime),
  )
}

export function getDoctorAppointments(
  appointments: Appointment[],
  doctorId: string,
): Appointment[] {
  return appointments.filter(
    ({ slot }) => slot.doctorId === doctorId,
  )
}

export type DoctorSchedule = Record<
  DayOfWeek,
  Appointment[]
>

export function groupAppointmentsByDay(
  appointments: Appointment[],
): DoctorSchedule {
  const days: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  return days.reduce<DoctorSchedule>(
    (schedule, day) => {
      schedule[day] = appointments.filter(
        ({ slot }) => slot.dayOfWeek === day,
      )

      return schedule
    },
    {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
  )
}