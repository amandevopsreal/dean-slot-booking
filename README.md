# Dean Slot Booking System Server

Welcome to the Dean Slot Booking System Server repository. This server is built using PostgreSQL, Express.js, and Node.js to support the Dean Slot Booking System, a web application for scheduling appointments with the dean.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Users can create accounts, log in, and log out securely.
- **Appointment Booking:** Students can request appointments with the dean based on available time slots.
- **Admin Dashboard:** Admins can manage appointments, view booking statistics, and manage user accounts.
- **Email Notifications:** Automatic email notifications for appointment confirmations and reminders.
- **Role-based Access:** Different roles for students and admins with appropriate permissions.

## Getting Started

Follow these steps to set up and run the Dean Slot Booking System Server locally.

### Prerequisites

- Node.js (v14.x or higher)
- PostgreSQL database
- SMTP server for sending email notifications (e.g., Gmail)

### Installation

1. Clone this repository to your local machine.
2. Install the required npm packages by running:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the project root based on the `.env.example` provided.
2. Configure the following environment variables in the `.env` file:
   - `DATABASE_URL`: Connection URL for your PostgreSQL database.
   - `SMTP_HOST`: SMTP server host for sending email notifications.
   - `SMTP_PORT`: SMTP server port.
   - `SMTP_USER`: SMTP username.
   - `SMTP_PASS`: SMTP password.
   - `JWT_SECRET`: Secret key for JWT token generation.
   
3. Run database migrations to set up the schema:

   ```bash
   npx knex migrate:latest
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server should now be running at `http://localhost:3000`.

## API Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.
- `POST /api/auth/logout`: Log out the currently logged-in user.
- `POST /api/appointments`: Book a new appointment.
- `GET /api/appointments`: Get a list of upcoming appointments.
- `GET /api/appointments/:id`: Get details of a specific appointment.
- `PUT /api/appointments/:id`: Update an appointment (admin only).
- `DELETE /api/appointments/:id`: Cancel an appointment (admin only).

## Database Schema

The database schema consists of the following tables:

- `users`: Stores user account information.
- `appointments`: Stores appointment details.

## Contributing

Contributions to the Dean Slot Booking System Server are welcome! If you find a bug or want to add new features, please submit an issue or a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README to fit your project's specific details and requirements. Good luck with your Dean Slot Booking System Server!
