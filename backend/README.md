# Backend

This is the backend module of the application.
Here we are using: Python + Flask and SQLAlchemy to create the endpoints.

## Folder Structure
- /backend
    - /migrations: all generated migrations files from models
    - /models: all models of the app
    - /routes: all routes of app APIs and also contains the implementation of APIs
    - /static: static files like css and js files to use in backend pages (not for frontend)
    - /templates: all templates for backend pages (not for frontend)
    - .env.sample: a `.env` sample
    - app.py: app file
    - database.py: database config file
    - Dockerfile: Dockerfile config for backend container
    - requirements.txt: all requirements/dependencies of the backend app


## API documentation
- Acesse a Documentação no Swagger: http://127.0.0.1:5000/apidocs/#/
