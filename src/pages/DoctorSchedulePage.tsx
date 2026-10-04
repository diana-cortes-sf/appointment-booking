import { useMemo, useState } from 'react'

import { useAppointments } from '../context/useAppointments'

import {
  getAppointments,
  getConfirmedAppointments,
  getDoctorAppointments,
  groupAppointmentsByDay,
} from '../utils/appointments'

const DoctorSchedulePage = () => {
  const { state } = useAppointments()

  const [selectedDoctorId, setSelectedDoctorId] = useState(
    state.slots[0]?.doctorId ?? '',
  )

  const doctors = useMemo(() => {
    const doctorMap = new Map(
      state.slots.map((slot) => [
        slot.doctorId,
        {
          id: slot.doctorId,
          name: slot.doctorName,
          specialty: slot.specialty,
        },
      ]),
    )

    return Array.from(doctorMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    )
  }, [state.slots])

  const selectedDoctor = doctors.find(
    (doctor) => doctor.id === selectedDoctorId,
  )

  const schedule = useMemo(() => {
    const appointments = getAppointments(
      state.slots,
      state.bookings,
    )

    const confirmedAppointments =
      getConfirmedAppointments(appointments)

    const doctorAppointments = getDoctorAppointments(
      confirmedAppointments,
      selectedDoctorId,
    )

    return groupAppointmentsByDay(doctorAppointments)
  }, [state.slots, state.bookings, selectedDoctorId])

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Schedule</p>
          <h1>Doctor schedule</h1>
          <p className="page-description">
            View confirmed appointments for each doctor.
          </p>
        </div>
      </div>

      <div className="schedule-controls">
        <label className="form-field">
          <span>Doctor</span>

          <select
            value={selectedDoctorId}
            onChange={(event) =>
              setSelectedDoctorId(event.target.value)
            }
          >
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} — {doctor.specialty}
              </option>
            ))}
          </select>
        </label>

        {selectedDoctor && (
          <div className="selected-doctor">
            <span>Selected doctor</span>
            <strong>{selectedDoctor.name}</strong>
            <p>{selectedDoctor.specialty}</p>
          </div>
        )}
      </div>

      <div className="schedule-grid">
        {Object.entries(schedule).map(
          ([day, appointments]) => (
            <section className="day-card" key={day}>
              <div className="day-card-header">
                <h2>{day}</h2>

                {appointments.length > 0 && (
                  <span className="appointment-count">
                    {appointments.length}
                  </span>
                )}
              </div>

              {appointments.length === 0 ? (
                <div className="day-empty-state">
                  <p>No appointments</p>
                </div>
              ) : (
                <div className="day-appointments">
                  {appointments.map((appointment) => (
                    <article
                      className="schedule-appointment"
                      key={appointment.booking.slotId}
                    >
                      <div className="schedule-time">
                        {appointment.slot.startTime}–
                        {appointment.slot.endTime}
                      </div>

                      <div className="schedule-patient">
                        <h3>
                          {appointment.booking.patient.name}
                        </h3>

                        <span className="status-badge confirmed">
                          Confirmed
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ),
        )}
      </div>
    </section>
  )
}

export default DoctorSchedulePage
