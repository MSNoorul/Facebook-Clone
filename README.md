# Facbook Clone

Facebook Clone is a photo-sharing web application developed using the MERN stack. It uses React.js for the frontend, Node.js for the backend, MongoDB as the database, and Cloudinary for image storage.

- To see the project [Live link](https://face-book-social.netlify.app).

<img src='./Screenshot.png' alt = 'broken Image'/>

## How to Run

1. **Clone the Repository**: 
   ```bash
   git clone <repository-url>
   cd Facbook-clone

2. **Install Backend Dependencies**: 
   ```bash
   npm install

3. **Install Frontend Dependencies**: 
   ```bash
   cd frontend
   npm install


4. **Run Frontend**: 
   ```bash
   npm run dev

5. **Run Backend**: 
   ```bash
   cd backend
   node server

6. **Set Environment Variables**:

**For backend**
- Create a `.env` file in the root folder of the project.
- Add the following environment variables:
  - `DATABASE_URI`: MongoDB connection URI.
  - `ACCESS_TOKEN_SECRET`: Secret key for JWT access tokens.
  - `REFRESH_TOKEN_SECRET`: Secret key for JWT refresh tokens.
  - Cloudinary details:
    - `CLOUD_NAME`
    - `API_KEY`
    - `API_SECRET`
  - Environment Mode:
    - `NODE_ENV`
- Example `.env` file:
  ```
  DATABASE_URI=mongodb://localhost:27017/facbook-clone
  ACCESS_TOKEN_SECRET=myAccessTokenSecret
  REFRESH_TOKEN_SECRET=myRefreshTokenSecret
  CLOUD_NAME=myCloudName
  API_KEY=myApiKey
  API_SECRET=myApiSecret
  NODE_ENV=development
  ```
  **For Frontend**
  - Create a `.env` file in the frontend folder of the project.
  - Add  `VITE_API_URL = http://localhost:3000` 

7. **Set Environment Mode**:
- In the `.env` file in the root folder, set `NODE_ENV` to `development` or `production`.
- Example `.env` file:
  ```
  NODE_ENV=development
  ```

8. **Access the Application**:
- To see the project [Live link](https://face-book-social.netlify.app).

Now you should be able to access the Facbook clone in your browser. Enjoy exploring and learning from the project!
