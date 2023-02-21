# Agenda Hair App


## About
This project implements a simple app for scheduling, using React.js in the Front-end and Flask in the Back-end

We developed this app as requested for the Web Development discipline of the BSI graduation course.
This course is offered by IFNMG Campus Januária.

### Project Specification
- Create a scheduling App with a static and form pages using resources of the React.js Framework.
- Provide APIs to get, edit and make schedules.
- (optional) Provide a API to Login
- Use a database to saves the infos.

**Obs:** This is a simple app, some features, errors and security threatments may be not available.


## Technologies

The app is containerized with Docker, and the features are developed using React and Flask to provide the APIs

- Docker
- Docker-compose

**Front-end**
- React.js

**Back-end**
- Python
- Flask Framework 

**Database**
- Postgresql


## How to Set-up the project

**Requirements:**
- Docker and Docker-compose must be installed in your local machine
- Is prefered to run this app in Linux envrioment (also can be Windows WSL)

**How to run**
- Clone this repository: `git clone https://github.com/bernardoadribeiro/agendahair-app.git`
- Go to project folder: `cd agendahair-app`
- (open Docker Desktop before continue if you are using WSL)
- Run: `docker-compose up` and wait.
- You will see a success message in the terminal

**How to access the app**
- Front-end URL: http://localhost:3000
- Back-end URL: http://localhost:5000

**Useful commands**
- `docker-compose up`: Run all containers
- `docker-compose down`: Stop all containers
