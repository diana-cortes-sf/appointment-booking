import type { Booking, Slot } from '../types/appointment'

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