# Student Portal (MERN Stack)

A full-stack student portal application built using the MERN stack that enables students to interact through forums, manage clubs, and explore job opportunities.

---

## Features

- Forum Posting – Create, view, and delete discussion posts  
- Club Management – Add, view, and manage student clubs  
- Job Board – Post and browse job opportunities  
- Dynamic Dashboard – Real-time UI updates using React  
- REST APIs – Efficient communication between frontend and backend  

---

## Tech Stack

Frontend:
- React.js
- HTML, CSS, JavaScript

Backend:
- Node.js
- Express.js

Database:
- MongoDB (with Mongoose)

---

## Project Structure

The repository is organized into separate frontend and backend directories:

student-portal/
│
├── Student-Portal-FE-main/   # Contains the React frontend
├── Student-Portal-BE-main/   # Contains the Express backend and APIs
├── .gitignore                # Specifies ignored files
└── README.md                # Project documentation

---

## Installation and Setup

1. Clone the repository

git clone https://github.com/ALANPRAFUL-A/student-portal.git  
cd student-portal  

---

2. Install dependencies

Backend:

cd backend  
npm install  

Frontend:

cd frontend  
npm install  

---

3. Setup environment variables

Create a .env file in the backend folder and add:

MONGO_URI=your_mongodb_connection_string  
PORT=5000  

---

4. Run the application

Start backend:

npm run dev  

Start frontend:

npm run dev  

---

## Future Improvements

- Authentication (JWT-based login and signup)  
- Role-based access (Admin and User)  
- Real-time features using Socket.IO  
- Deployment on cloud platforms  

---

## Contributing

Contributions are welcome. You can fork the repository and submit a pull request.

---

## Contact

LinkedIn: https://www.linkedin.com/in/alan-praful-a-68793428b/  
GitHub: https://github.com/ALANPRAFUL-A  

---

## Acknowledgement

This project was developed as part of learning full-stack web development using the MERN stack.
