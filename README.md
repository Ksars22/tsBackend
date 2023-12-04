# MacroSolver Backend REST API

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

6. Assign a Dev User.

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
    
##### 2. POST /signup

    Content-Type: application/json

    {
        "username": "...",
        "password": "...",
        "email": "...",
        "phone": "..."
    }

##### 3. POST /checkLogin

##### 4. POST /forgot-password

    Content-Type: application/json

    {
        "email": "..."
    }

##### 5. POST /reset-password/:token

    Content-Type: application/json

    {
        "password": "..."
    } 

### License
