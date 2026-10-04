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
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Appointments</p>
          <h1>Book an appointment</h1>
          <p className="page-description">
            Choose a specialist and a convenient time for your
            consultation.
          </p>
        </div>
      </div>

      <div className="booking-layout">
        <aside className="booking-sidebar">
          {state.patient ? (
            <div className="patient-card">
              <p className="card-label">Booking for</p>

              <p className="patient-name">
                {state.patient.name}
              </p>

              <p className="patient-contact">
                {state.patient.contact}
              </p>
            </div>
          ) : (
            <PatientForm />
          )}

          <div className="filter-card">
            <div className="card-heading">
              <h2>Find a time</h2>
              <p>Filter available appointments.</p>
            </div>

            <label className="form-field">
              <span>Specialty</span>

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

            <label className="form-field">
              <span>Date</span>

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
        </aside>

        <div className="booking-results">
          <div className="results-header">
            <div>
              <h2>Available appointments</h2>
              <p>
                {visibleSlots.length}{' '}
                {visibleSlots.length === 1
                  ? 'appointment'
                  : 'appointments'}{' '}
                available
              </p>
            </div>
          </div>

          {visibleSlots.length === 0 ? (
            <div className="empty-state">
              <h3>No appointments found</h3>
              <p>
                Try changing the specialty or date filters.
              </p>
            </div>
          ) : (
            <div className="slot-grid">
              {visibleSlots.map((slot) => (
                <article className="slot-card" key={slot.id}>
                  <div className="slot-card-header">
                    <div>
                      <h3>{slot.doctorName}</h3>
                      <p>{slot.specialty}</p>
                    </div>

                    <span className="shift-badge">
                      {slot.shift}
                    </span>
                  </div>

                  <div className="slot-details">
                    <p>{slot.date}</p>
                    <strong>
                      {slot.startTime}–{slot.endTime}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => bookSlot(slot.id)}
                    disabled={!state.patient}
                  >
                    {state.patient
                      ? 'Book appointment'
                      : 'Add patient information'}
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BookingPage