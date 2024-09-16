# Backend GraphQL API for Job Listings

This is a Node.js-based backend for a job listing application that uses Express, GraphQL, MongoDB, and Mongoose. The server allows you to query, add, and delete job listings via a GraphQL API.

## Features

- **GraphQL API**: A fully functional API with queries and mutations.
- **MongoDB**: A MongoDB database for storing job information.
- **Express**: Used to handle server requests.
- **Mongoose**: An object data modeling (ODM) library for MongoDB.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Minimalist web framework for handling requests.
- **GraphQL**: A query language for interacting with the API.
- **MongoDB**: NoSQL database for storing job information.
- **Mongoose**: Provides schema-based modeling for MongoDB.
- **dotenv**: For loading environment variables.

## Getting Started

### Prerequisites

Before you begin, ensure that you have the following installed on your system:

- **Node.js** (v12+)
- **MongoDB** (local or cloud-hosted)
- **npm** (v6+)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd backend-project
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Create a `.env` file**:

    Create a `.env` file in the root directory and add your MongoDB connection string:

    ```bash
    MONGODB_URI=mongodb://localhost:27017/jobsdb
    ```

    Replace the URI with your own MongoDB connection string if necessary.

### Running the Server

To start the server, run the following command:

```bash
node server.js
