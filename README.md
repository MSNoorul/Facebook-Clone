# Facbook Clone

This project is a simple clone of the popular social media platform Facebook, created as a learning exercise. It uses React.js for the frontend, Node.js for the backend, MongoDB as the database, and Cloudinary for image storage.

## How to Run

1. **Clone the Repository**: 
   ```bash
   git clone <repository-url>
   cd Facbook-clone

2. **Install Backend Dependencies**: 
   ```bash
   cd backend
   npm install

3. **Install Frontend Dependencies**: 
   ```bash
   cd ../frontend
   npm install


4. **Run Frontend**: 
   ```bash
   npm run dev

5. **Run Backend**: 
   ```bash
   cd ../backend
   node server

6. **Set Environment Variables**:
- Create a `.env` file in the root folder of the project.
- Add the following environment variables:
  - `DATABASE_URI`: MongoDB connection URI.
  - `ACCESS_TOKEN_SECRET`: Secret key for JWT access tokens.
  - `REFRESH_TOKEN_SECRET`: Secret key for JWT refresh tokens.
  - Cloudinary details:
    - `CLOUD_NAME`
    - `API_KEY`
    - `API_SECRET`
- Example `.env` file:
  ```
  DATABASE_URI=mongodb://localhost:27017/facbook-clone
  ACCESS_TOKEN_SECRET=myAccessTokenSecret
  REFRESH_TOKEN_SECRET=myRefreshTokenSecret
  CLOUD_NAME=myCloudName
  API_KEY=myApiKey
  API_SECRET=myApiSecret
  ```

7. **Set Environment Mode**:
- In the `.env` file in the root folder, set `NODE_ENV` to `development` or `production`.
- Example `.env` file:
  ```
  NODE_ENV=development
  ```

8. **Access the Application**:
- Open your browser and navigate to `http://localhost:3000`.

Now you should be able to access the Facbook clone in your browser. Enjoy exploring and learning from the project!
