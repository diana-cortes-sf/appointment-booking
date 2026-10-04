import { useMemo } from 'react'

import { useAppointments } from '../context/useAppointments'

import {
  getAppointments,
  getCancelledAppointments,
  getConfirmedAppointments,
  sortAppointments,
} from '../utils/appointments'

const DashboardPage = () => {
  const { state, cancelBooking } = useAppointments()

  const appointments = useMemo(
    () => getAppointments(state.slots, state.bookings),
    [state.slots, state.bookings],
  )

  const confirmedAppointments = useMemo(
    () =>
      sortAppointments(
        getConfirmedAppointments(appointments),
      ),
    [appointments],
  )

  const cancelledAppointments = useMemo(
    () => getCancelledAppointments(appointments),
    [appointments],
  )

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Appointments</p>
          <h1>My appointments</h1>
          <p className="page-description">
            Manage your upcoming and cancelled appointments.
          </p>
        </div>
      </div>

      <div className="dashboard-sections">
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <h2>Upcoming appointments</h2>
              <p>
                {confirmedAppointments.length}{' '}
                {confirmedAppointments.length === 1
                  ? 'appointment'
                  : 'appointments'}{' '}
                confirmed
              </p>
            </div>
          </div>

          {confirmedAppointments.length === 0 ? (
            <div className="empty-state">
              <h3>No upcoming appointments</h3>
              <p>
                Your confirmed appointments will appear here.
              </p>
            </div>
          ) : (
            <div className="appointment-list">
              {confirmedAppointments.map((appointment) => (
                <article
                  className="appointment-card"
                  key={appointment.booking.slotId}
                >
                  <div className="appointment-card-main">
                    <div>
                      <p className="appointment-specialty">
                        {appointment.slot.specialty}
                      </p>

                      <h3>{appointment.slot.doctorName}</h3>
                    </div>

                    <span className="status-badge confirmed">
                      Confirmed
                    </span>
                  </div>

                  <div className="appointment-details">
                    <div>
                      <span>Date</span>
                      <strong>{appointment.slot.date}</strong>
                    </div>

                    <div>
                      <span>Time</span>
                      <strong>
                        {appointment.slot.startTime}–
                        {appointment.slot.endTime}
                      </strong>
                    </div>
                  </div>

                  <div className="appointment-actions">
                    <button
                      type="button"
                      className="secondary-button danger"
                      onClick={() =>
                        cancelBooking(
                          appointment.booking.slotId,
                        )
                      }
                    >
                      Cancel appointment
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <h2>Cancelled appointments</h2>
              <p>Your appointment history.</p>
            </div>
          </div>

          {cancelledAppointments.length === 0 ? (
            <div className="empty-state">
              <h3>No cancelled appointments</h3>
              <p>
                Cancelled appointments will appear here.
              </p>
            </div>
          ) : (
            <div className="appointment-list">
              {cancelledAppointments.map((appointment) => (
                <article
                  className="appointment-card cancelled"
                  key={appointment.booking.slotId}
                >
                  <div className="appointment-card-main">
                    <div>
                      <p className="appointment-specialty">
                        {appointment.slot.specialty}
                      </p>

                      <h3>{appointment.slot.doctorName}</h3>
                    </div>

                    <span className="status-badge cancelled">
                      Cancelled
                    </span>
                  </div>

                  <div className="appointment-details">
                    <div>
                      <span>Date</span>
                      <strong>{appointment.slot.date}</strong>
                    </div>

                    <div>
                      <span>Time</span>
                      <strong>
                        {appointment.slot.startTime}–
                        {appointment.slot.endTime}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default DashboardPage