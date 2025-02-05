# Employee Tracker 
A command-line application for managing company departments, roles, and employees. Users can view, add, update, or remove departments, roles (including salaries), and employees (including name, title, department, salary, and manager).

## Demo
https://drive.google.com/file/d/1hO4wGfS3HVPPJCgYi0MdqYXuU7cyXnw8/view

## Screenshots
![List](/public/Screenshot%202025-02-05%20150114.jpg)

![Options](/public/Screenshot%202025-02-05%20150047.png)   


##  Features
-  View all departments, roles, and employees
-  Add new departments, roles, and employees
-  Update existing roles and employee details
-  Remove departments, roles, and employees
-  Track employee managers and their respective departments

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MySQL
- **CLI Interaction:** Inquirer.js

## Installation & Setup
To run the project locally, follow these steps:

### Clone the repository
```bash
git clone https://github.com/yourusername/employee-tracker.git
cd employee-tracker
```

### Install dependencies
```bash
npm install
```

### Set up environment variables
Create a `.env` file in the root directory and add the following:
```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=5432
```

### Initialize the database
```bash
npm run db:create
```

### Start the application
```bash
npm start
```

## Roadmap / Future Enhancements
-  Add support for exporting reports
-  Include analytics and statistics for employee distribution
-  Improve search and filtering capabilities

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

## License
MIT License
