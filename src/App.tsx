import { AppointmentProvider } from './context/AppointmentProvider'
import BookingPage from './pages/BookingPage'

function App() {
  return (
    <AppointmentProvider>
      <main>
        <BookingPage />
      </main>
    </AppointmentProvider>
  )
}

export default App
