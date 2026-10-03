export type Shift = 'morning' | 'afternoon'
export type SlotStatus = 'available' | 'booked'
export type BookingStatus = 'confirmed' | 'cancelled'
export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'

export interface Doctor {
  id: string
  name: string
  specialty: string
  shift: Shift
}

export interface Slot {
  id: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  shift: Shift
  status: SlotStatus
}

export interface Patient {
  name: string
  contact: string
}

export interface Booking {
  slotId: string
  patient: Patient
  status: BookingStatus
}

export interface ClinicMeta {
  weekStart: string
  weekEnd: string
  generatedFor: string
  note: string
}

export interface ClinicData {
  meta: ClinicMeta
  doctors: Doctor[]
  slots: Slot[]
}