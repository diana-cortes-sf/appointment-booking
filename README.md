# MediCare Appointment Booking

A React + TypeScript appointment booking application built as a promotion assessment. The application allows patients to browse available appointment slots, book and cancel appointments, view their appointment history, and review confirmed appointments by doctor and day.

## Features

* Browse available appointment slots by doctor, specialty, date, and shift.
* Combine specialty and date filters.
* Collect patient information before the first booking.
* Book an available appointment slot.
* Prevent double-booking of the same slot during the session.
* Cancel confirmed appointments.
* Automatically make cancelled slots available for booking again.
* View confirmed and cancelled appointments separately.
* View a doctor's confirmed appointments organized by day from Monday through Saturday.
* Display explicit empty states for days without appointments.
* Responsive layout for desktop and mobile screens.

## Tech Stack

* React 19
* TypeScript
* Vite
* Vitest
* React Testing Library
* CSS
* ESLint

## Getting Started

### Prerequisites

* Node.js 20+
* npm

### Installation

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

### Run tests

```bash
npm test
```

### Build for production

```bash
npm run build
```

## Project Structure

```text
src/
├── components/
│   └── PatientForm.tsx
├── context/
│   ├── AppointmentContext.ts
│   ├── AppointmentProvider.tsx
│   └── useAppointments.ts
├── data/
│   └── appointments.json
├── pages/
│   ├── BookingPage.tsx
│   ├── DashboardPage.tsx
│   └── DoctorSchedulePage.tsx
├── types/
│   └── appointment.ts
├── utils/
│   └── appointments.ts
├── App.tsx
└── main.tsx
```

## Notes

The application is intentionally scoped to the assessment requirements. It uses static appointment data and session state rather than a backend or persistence layer.

The architecture is designed to keep business rules centralized, derived state predictable, and UI components focused on presentation and user interaction.
