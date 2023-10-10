# Expenze - Personal Finance Portal

Expenze is a comprehensive personal finance portal designed to help users manage their financial activities effectively. This repository contains the source code for the Expenze application.

## Step-by-step guide to run the project

1. **Prerequisites:**
   - Make sure you have Node.js and npm (Node Package Manager) installed on your system.
   - Install PostgreSQL and create a database for your project if it's not already set up.

2. **Clone the Repository:**
   ```
   git clone https://github.com/tusharag6/Expenze
   cd Expenze
   ```

3. **Backend Setup:**
   - Navigate to the server directory:
     ```
     cd server
     ```
   - Install backend dependencies:
     ```
     npm install
     ```
   - Create a `.env` file in the server directory and configure it with your database connection details. For example:
     ```
     DATABASE_URL=postgres://username:password@localhost:5432/database_name
     ```
   - Run database migrations with Prisma to create tables:
     ```
     npx prisma migrate dev
     ```
   - Start the backend server:
     ```
     npm run dev
     ```

4. **Frontend Setup:**
   - Navigate back to the project root directory:
     ```
     cd ..
     ```
   - Navigate to the client directory:
     ```
     cd client
     ```
   - Install frontend dependencies:
     ```
     npm install
     ```
   - Start the frontend development server:
     ```
     npm start
     ```

5. **Access the Application:**
   - Open your web browser and visit `http://localhost:5173` to access the locally running PERN stack application.
