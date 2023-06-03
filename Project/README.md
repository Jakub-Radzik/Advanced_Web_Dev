# Cinema site project

## 1. Backend development

### Setting up the environment

For development, use docker-compose.dev.yaml file. It has mounted volume for backend source code and fastAPI app has --reload flag so any changes will be automaticlly reflected inside the container.
You will also need 2 .env files:

- One located in Project directory,
- Second one located in Project/backend directory

Use sample.env files to create them. (rename to .env, fill and change environment variables)
To use mailing service you can create free account at mailtrap
Use username and password in .env file

### Migrations and models management

To initialize migration tool, run these commands:

```bash
docker exec [backend container name] aerich init -t src.settings.TORTOISE_ORM
docker exec [backend container name] aerich init-db
```

When adding models in new file you should register this file in 2 places:

- One in reqister_tortoise call in main.py
- Second one in settings.py TORTOISE_ORM config

Then you have to execute migrate and upgrade commands inside the container

```bash
docker exec [backend container name] aerich migrate
docker exec [backend container name] aerich upgrade
```

### Adding poetry dependency

To add poetry dependency go to backend folder and execute

```bash
poetry add [dependency_name]
```

Then rebuild and run docker-compose file

### How to run containers (because maybe someone do not know docker):

```zsh
docker compose -f docker-compose.dev.yaml up
```

## Frontend

### How to run frontend

1. Use nvm to manage Node version
2. In /frontend write:

```
nvm use
```

3. Now you are in correct Node version

```
npm i
npm start
```

### New packages:

Before every package installation please use node version from .nvmrc

## Rules of development

## Gitflow:

- Create a branch from current **main** branch
- Write a feature
- push changes to repository
- create pull request to **main** branch
- write to Jakub Radzik (frontend) or Kamil Herbetko (backend) to check changes
