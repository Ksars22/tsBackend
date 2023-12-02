# MacroSolver Backend REST API

Welcome this is the backend for https://bitbucket.org/macroappdev/macroapprepo/src/master/

## Table of Contents

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Configuration](#configuration)
-   [Usage](#usage)
    -   [Authentication](#authentication)
    -   [Endpoints](#endpoints)
-   [Examples](#examples)
-   [Contributing](#contributing)
-   [License](#license)

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

-   Node.js

### Installation

1. Clone this repository and install dependencies:

    ```bash
    git clone https://github.com/Ksars22/tsBackend.git
    cd tsBackend
    npm install
    ```

### Configuration

1. Create .env file and configure enviromental variables:

    ```bash
    cp example-env .env
    ```

2. Generate a secure value for the secret key.

3. Connect MongoDB URI.

4. Assign a Dev User.

    **Depending on the configuration this will choose which database to connect to based on the dev user**

## Usage

### Endpoints

#### Base /auth/...

##### 1. POST /login

    **
    Content-Type: application/json

    {
        "username": "...",
        "password": "...",
        "rememerMe": true/false
    }
    **

##### 2. POST /signup

    **
    Content-Type: application/json

    {
        "username": "...",
        "password": "...",
        "email": "...",
        "phone": "..."
    }
    **

##### 3. GET /checkLogin

    **
    Content-Type: application/json
    Cookie: token=...
    **

### License
