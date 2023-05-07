# Cinema site project

## 1. Development

For development, use docker-compose.dev.yaml file. It has mounted volume for backend source code and fastAPI app has --reload flag so any changes will be automaticlly reflected inside the container.
You will also need 2 .env files:
- One located in Project directory,
- Second one located in Project/backend directory

Use sample.env files to create them. (rename to .env, fill and change environment variables)
To use mailing service you can create free account at mailtrap
Use username and password in .env file

When adding models in new file you should register this file in 2 places:
- One in reqister_tortoise call in main.py
- Second one in settings.py TORTOISE_ORM config
