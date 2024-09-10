# Database Integration

This project is a REST API that facilitates data transfer between a website and a game, allowing interaction with a MySQL database. The API is entirely written in JavaScript using Node.js and Express.js. It can be run locally or within a Docker container.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the API Locally](#running-the-api-locally)
- [Running the API with Docker](#running-the-api-with-docker)
- [API Endpoints](#api-endpoints)
  - [POST /aspectus/users/createAccount](#post-aspectususerscreateaccount)
  - [PUT /aspectus/users/login](#put-aspectususerslogin)
  - [DELETE /aspectus/users/deleteAccount](#delete-aspectususersdeleteaccount)
  - [PUT /aspectus/users/changePassword](#put-aspectususerschangepassword)
  - [PUT /aspectus/users/updateName](#put-aspectususersupdatename)
  - [GET /aspectus/users/getName](#get-aspectususersgetname)
  - [GET /aspectus/game/getData](#get-aspectusgamegetdata)
  - [PUT /aspectus/game/updateData](#put-aspectusgameupdatedata)
- [Error Handling](#error-handling)

## Features

- RESTful API for CRUD operations on game data.
- MySQL database integration for persistent data storage.
- Node.js and Express.js as backend frameworks.
- Docker support for easy deployment in containerized environments.
- Environment variable support via `.env` file.
- Error handling and validation for secure and reliable data transactions.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side code.
- **Express.js**: Web framework for creating API routes.
- **MySQL**: Relational database management system.
- **Docker**: Containerization platform for creating and managing containers.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) (v20 or higher)
- [MySQL](https://dev.mysql.com/downloads/)
- [Docker](https://www.docker.com/) (if running the API in a container)
- [Git](https://git-scm.com/) (optional, if cloning the repository)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/BrainForgeAI/Database-Integration.git
cd game-database-api
```

### 2. Install dependencies

```bash
npm install
```
OR
```bash
npm ci
```

## Configuration

Create a .env file in the root of your project to define your MySQL configuration, # of password hashes with salt, and docker port numbers
```
DB_PORT=db_port_number
DB_USER=user_account
DB_NAME=db_name
DB_PASSWORD=db_password
DB_HOST=db_host
SALT=salt_value
CONTAINER_PORT=container_port_number
HOST_PORT=host_port_number
```

## Running the API Locally

### 1. Ensure MySQL database is running correctly

### 2. Run the API

```bash
node app.js
```

## Running the API with docker

### 1. Build docker image

```bash
docker build --pull . -t [image_name]
```

### 2. Run docker container with docker-compose

```bash
docker compose up
```

### 3. Start docker container

```bash
docker start [container_name]
```

## API Endpoints

### POST /aspectus/users/createAccount

Description: Create a user and add it to database

Request:
```json
{
  "email": "email",
  "password": "password",
  "name": "name"
}
```

Response: 
```json
{
  "code": 200,
  "message": "Congratulations! Thank you for signing up to Brainforge"
}
```

### PUT /aspectus/users/login

Description: Confirm user credentials and update the last login

Request:
```json
{
  "email": "email",
  "password": "password"
}
```

Response:
```json
{
  "code": 200,
  "message": "User successfully logged in"
}
```

### DELETE /aspectus/users/deleteAccount

Description: Delete user account from database

Request:
```json
{
  "email": "email",
  "password": "password"
}
```

Response:
```json
{
  "code": 200,
  "message": "Account successfully deleted"
}
```

### PUT /aspectus/users/changePassword

Description: Change the password of the account and update the database with the new password

Request:
```json
{
  "email": "email",
  "password": "password",
  "newPassword": "newPassword"
}
```

Response:
```json
{
  "code": 200,
  "message": "Password has been successfully changed"
}
```

### PUT /aspectus/users/updateName

Description: Change the name of the account and update the database with the new name

Request:
```json
{
  "email": "email",
  "newName": "newName"
}
```

Response:
```json
{
  "code": 200,
  "message": "Name has been successfully changed"
}
```

### GET /aspectus/users/getName

Description: Get the name of the account 

Request:
```json
{
  "email": "email"
}
```

Response:
```json
{
  "code": 200,
  "message": "Name has been grabbed",
  "result": "[new-name]"
}
```

### GET /aspectus/game/getData

Description: Get stats belonging to the selected user

Request:
```json
{
  "email": "email"
}
```

Response:
```json
{
  "code": 200,
  "message": "Game data for account [email]",
  "result": {
    "level": 1,
    "exp": 0,
    "currency": 0
  }
}
```

### PUT /aspectus/game/updateData

Description: Update game stats belonging to a specific user

Request:
```json
{
  "email": "email",
  "level": 1,
  "exp": 0,
  "currency": 0
}
```

Response:
```json
{
  "code": 200,
  "message": "Game data for account ${email} has successfully been updated",
  "result": {
    "level": 1,
    "exp": 0,
    "currency": 0
  }
}
```

## Error Handling 
500 Internal Server Error: If there are any server-side issues (e.g., database connection issues).

400 Bad Request: If the request body contains invalid or incomplete data.
