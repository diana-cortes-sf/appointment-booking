import { useMemo, useState } from 'react'

import { useAppointments } from '../context/useAppointments'

import {
  filterSlots,
  getAvailableSlots,
  sortSlots,
} from '../utils/appointments'

import PatientForm from '../components/PatientForm'

const BookingPage = () => {
  const { state, bookSlot } = useAppointments()

  const [filters, setFilters] = useState({
    specialty: '',
    date: '',
  })

  const visibleSlots = useMemo(() => {
    const availableSlots = getAvailableSlots(
      state.slots,
      state.bookings,
    )

    const filteredSlots = filterSlots(
      availableSlots,
      filters,
    )

    return sortSlots(filteredSlots)
  }, [state.slots, state.bookings, filters])

  const specialties = useMemo(
    () =>
      Array.from(
        new Set(state.slots.map((slot) => slot.specialty)),
      ).sort(),
    [state.slots],
  )

  return (
    <section>
      <h1>Book an appointment</h1>

      {state.patient ? (
        <p>
          Booking for: <strong>{state.patient.name}</strong>
        </p>
      ) : (
        <PatientForm />
      )}

      <div>
        <label>
          Specialty
          <select
            value={filters.specialty}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                specialty: event.target.value,
              }))
            }
          >
            <option value="">All specialties</option>

            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            value={filters.date}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                date: event.target.value,
              }))
            }
          />
        </label>
      </div>

      <div>
        {visibleSlots.length === 0 ? (
          <p>No appointments available for the selected filters.</p>
        ) : (
          visibleSlots.map((slot) => (
            <article key={slot.id}>
              <h2>{slot.doctorName}</h2>
              <p>{slot.specialty}</p>
              <p>
                {slot.date} · {slot.startTime}–{slot.endTime}
              </p>
              <p>{slot.shift}</p>

              <button
                type="button"
                onClick={() => bookSlot(slot.id)}
                disabled={!state.patient}
              >
                Book
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default BookingPage