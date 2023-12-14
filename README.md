# MacroSolver Backend REST API

<style>
    p {
        text-align: center;
    }
</style>

<p>
    <img src="https://img.shields.io/badge/language-typescript-%23f34b7d.svg?style=for-the-badge&logo=appveyor" alt="TypeScript">
    <img src="https://img.shields.io/badge/runtime-NodeJs-0078d7.svg?style=for-the-badge&logo=appveyor" alt="Nodejs">
    <img src="https://img.shields.io/badge/framework-express.js-green.svg?style=for-the-badge&logo=appveyor" alt="x86">
</p>

Welcome this is the backend for https://bitbucket.org/macroappdev/macroapprepo/src/master/

## Table of Contents

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Configuration](#configuration)
-   [Usage](#usage)
    -   [Endpoints](#endpoints)
-   [License](#license)

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

-   Node.js

### Installation

1. Clone this repository and install dependencies:

    ```powershell
    git clone https://github.com/Ksars22/tsBackend.git
    cd tsBackend
    npm install
    ```

### Configuration

1. Create .env file and configure enviromental variables:

    ```powershell
    cp example-env .env
    ```

2. Generate a secure value for the secret key.

    **you can use this powershell command to generate a random key**

    ```powershell
    -join (Get-Random -Count 32 -InputObject 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.ToCharArray())
    ```

3. Connect MongoDB URI.

4. Setup SMTP with https://mailtrap.io/ or the vendor of you choosing.

    **currently using the testing enviroment but will chang when switched to production**

5. Assign a Dev User.

    **Depending on the configuration this will choose which database to connect to based on the dev user**

## Usage

### Endpoints

#### Base /auth/...

##### 1. POST /login

    Content-Type: application/json

    {
        "username": "...",
        "password": "...",
        "rememerMe": true/false
    }

    Desired response:

    *200* { "login": "success" }

##### 2. POST /signup

    Content-Type: application/json

    {
        "username": "...",
        "password": "...",
        "email": "...",
        "phone": "..."
    }

    Desired response:

    *200* { "message": "Signup Success" }

##### 3. POST /checkLogin

    *No body needed*

    Desired response:

    *200* { "token": token } *this code needs changed* should return something like { "message": "user is already logged in" }*

##### 4. POST /forgot-password

    Content-Type: application/json

    {
        "email": "..."
    }

    Desired response:

    *200* { "message": "Password reset email sent" }

##### 5. POST /reset-password/:token

    Content-Type: application/json

    {
        "password": "..."
    }

    Desired response:

    *200* { "message": "Password reset successfully" }

### License
