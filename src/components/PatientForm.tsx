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
    <form onSubmit={handleSubmit}>
      <h2>Patient information</h2>

      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>

      <label>
        Contact
        <input
          type="text"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          required
        />
      </label>

      <button type="submit">
        Save patient information
      </button>
    </form>
  )
}

export default PatientForm