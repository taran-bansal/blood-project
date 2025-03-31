# Blood Network Backend

This is the backend server for the Blood Network application, built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Donor profile management
- Emergency blood request system
- Blood bank network management
- Location-based search for blood banks and donors

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blood_network
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Donors
- POST `/api/donors` - Create donor profile
- GET `/api/donors` - Get all donors (with filters)
- GET `/api/donors/:id` - Get donor by ID
- PUT `/api/donors/:id` - Update donor profile
- PATCH `/api/donors/:id/donate` - Update donation count
- PATCH `/api/donors/:id/toggle-availability` - Toggle availability

### Emergency Requests
- POST `/api/emergency` - Create emergency request
- GET `/api/emergency` - Get all emergency requests (with filters)
- GET `/api/emergency/:id` - Get emergency request by ID
- PUT `/api/emergency/:id` - Update emergency request
- POST `/api/emergency/:id/fulfill` - Fulfill emergency request
- PATCH `/api/emergency/:id/expire` - Mark request as expired

### Blood Banks
- POST `/api/blood-banks` - Create blood bank (admin only)
- GET `/api/blood-banks` - Get all blood banks (with filters)
- GET `/api/blood-banks/:id` - Get blood bank by ID
- PUT `/api/blood-banks/:id` - Update blood bank (admin only)
- PATCH `/api/blood-banks/:id/inventory` - Update inventory
- GET `/api/blood-banks/search/availability` - Search by blood group availability
- GET `/api/blood-banks/search/nearby` - Get nearby blood banks

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:
```json
{
  "message": "Error message here",
  "error": "Detailed error information (development only)"
}
```

## Security

- JWT-based authentication
- Password hashing using bcryptjs
- Role-based access control
- Request validation
- Error handling middleware

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 