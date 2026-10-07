import { useState } from "react";

import { AppointmentProvider } from "./context/AppointmentProvider";

import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/DashboardPage";
import DoctorSchedulePage from "./pages/DoctorSchedulePage";
import { HeartPulseIcon } from "./components/Icons";

type Page = "booking" | "dashboard" | "doctorSchedule";

const App = () => {
  const [page, setPage] = useState<Page>("booking");

  return (
    <AppointmentProvider>
      <div className="app">
        <header className="app-header">
          <div className="app-header-content">
              <div className="app-brand">
                <HeartPulseIcon className="app-brand-icon" />
                <span>MediCare</span>
              </div>

            <nav className="app-nav" aria-label="Main navigation">
              <button
                type="button"
                className={
                  page === "booking" ? "nav-button active" : "nav-button"
                }
                onClick={() => setPage("booking")}
                aria-current={page === "booking" ? "page" : undefined}
              >
                Book appointment
              </button>

              <button
                type="button"
                className={
                  page === "dashboard" ? "nav-button active" : "nav-button"
                }
                onClick={() => setPage("dashboard")}
                aria-current={page === "dashboard" ? "page" : undefined}
              >
                My appointments
              </button>

              <button
                type="button"
                className={
                  page === "doctorSchedule" ? "nav-button active" : "nav-button"
                }
                onClick={() => setPage("doctorSchedule")}
                aria-current={page === "doctorSchedule" ? "page" : undefined}
              >
                Doctor schedule
              </button>
            </nav>
          </div>
        </header>

        <main className="app-content">
          {page === "booking" ? (
            <BookingPage />
          ) : page === "dashboard" ? (
            <DashboardPage />
          ) : (
            <DoctorSchedulePage />
          )}
        </main>
      </div>
    </AppointmentProvider>
  );
};

export default App;
