import { useState } from 'react'
import { useAppointments } from '../context/useAppointments'

const PatientForm = () => {
  const { setPatient } = useAppointments()

  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !contact.trim()) {
      return
    }

    setPatient({
      name: name.trim(),
      contact: contact.trim(),
    })
  }

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <div className="card-heading">
        <h2>Patient information</h2>
        <p>Save your details before booking.</p>
      </div>

      <label className="form-field">
        <span>Name</span>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your full name"
          required
        />
      </label>

      <label className="form-field">
        <span>Contact</span>

        <input
          type="text"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          placeholder="Email or phone"
          required
        />
      </label>

      <button type="submit" className="primary-button">
        Save patient information
      </button>
    </form>
  )
}

export default PatientForm