# Plannerly - MERN Stack Task Management System

**Plannerly** is a task management application designed to help users plan and organize their daily tasks effectively. With a simple, user-friendly interface, Plannerly allows users to add, edit, view, and delete tasks, helping them keep track of their daily activities in an organized way.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Add New Task**: Create tasks with titles, descriptions, and specific due dates and times.
- **Edit and Update**: Modify task details and mark tasks as completed or pending.
- **View All Tasks**: Display all tasks in a visually engaging card layout.
- **Delete Task**: Remove any task no longer needed.
- **Responsive UI**: Mobile and desktop friendly.
  
## Tech Stack
- Frontend: React, Axios
- Backend: Node.js, Express
- Database: MongoDB

## Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v14+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [vite](https://vite.dev/guide/)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Usage
1. Open your browser and go to [http://localhost:3000](http://localhost:3000).
2. Create, view, edit, and manage tasks to organize your daily activities.
3. To access the API, ensure your backend server runs on [http://localhost:5000](http://localhost:5000).

## Folder Structure
```plaintext
Plannerly/
├── backend/
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public
│   ├── src/
│   │   ├── assets
│   │   ├── components/
│   │   │   └── BackButton.jsx
│   │   ├── pages/
│   │   │   ├── AddTask.jsx
│   │   │   ├── DeleteTask.jsx
│   │   │   ├── EditTask.jsx
│   │   │   ├── Home.jsx
│   │   │   └── ViewTask.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.congfig.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js
└── readme.md
```
## Contributing
1. Fork the project.
2. Create a new feature branch: ```git checkout -b feature-name```
3. Commit your changes: ```git commit -m 'Add feature'```
4. Push to the branch: ```git push origin feature-name```
5. Open a pull request.

## License
This file will give users a quick project overview, including setup instructions, folder structure, and features. Feel free to adjust any specific details as needed!
