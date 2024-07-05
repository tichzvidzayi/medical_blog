# Med Blog API

This is a RESTful API for a personal blog platform focused on medical or health-related content.

## Installation

To set up the project, follow these steps:

1. Clone the repository:# med_blog
   git clone https://github.com/tichzvidzayi/med-blog-api.git
   
   2. Navigate to the project directory:
    cd med-blog-api

    
    3. Install the required dependencies:

    
    4. Create a `.env` file and add your environment variables (if needed).
    
    5. Start the development server:
  npm run dev

  
  ## API Endpoints
  
  Here are the available API endpoints:
  
  ### Users
  
  - `GET /api/users`: Retrieve a list of all users.
  - `GET /api/users/:id`: Retrieve details for a specific user by their ID.
  - `POST /api/users`: Create a new user.
  - `PUT /api/users/:id`: Update details for a specific user by their ID.
  - `DELETE /api/users/:id`: Delete a specific user by their ID.
  
  ### Posts
  
  - `GET /api/posts`: Retrieve a list of all posts.
  - `GET /api/posts/:id`: Retrieve details for a specific post by their ID.
  - `POST /api/posts`: Create a new post.
  - `PUT /api/posts/:id`: Update details for a specific post by their ID.
  - `DELETE /api/posts/:id`: Delete a specific post by their ID.
  
  ## Authentication
  
  The API supports authentication using JSON Web Tokens (JWT). To authenticate, include the JWT in the `Authorization` header of your requests, using the `Bearer` scheme.
  

## Testing

To run the test suite, use the following command:



## Documentation

You can generate API documentation using Swagger or other tools. To set up Swagger, follow these steps:

1. Install the required dependencies:

  npm install swagger-jsdoc swagger-ui-express



Access the Swagger UI by navigating to http://localhost:<your_port>/docs.

## .ENV file
.envexample File
The .envexample file serves as a template for setting up environment variables. Copy and rename it to .env and update with your specific configurations:

### Database configuration
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=med_blog_db

### JWT Secret
JWT_SECRET=your_jwt_secret_here

### Other configurations (if applicable)
PORT=3000
