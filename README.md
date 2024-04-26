# shein-micro-frontend

This repository demonstrates the use of a Vite-based module federation architecture for micro-frontends, tailored for Shein.

## Getting Started

These instructions will guide you through the setup and running of the project components: the remote application and the host-react application.

### Prerequisites

Ensure you have `npm` installed on your system to manage dependencies and run the project.

### Setup Remote Application

Follow these steps to prepare the remote application:

1. **Install Dependencies:**

   Navigate to the `/remote` directory and install the necessary dependencies:

   ```
   cd remote
   ```

   ```
   npm install
   ```

2. **Environment Configuration:**

   Create a `.env.production` file in the same directory:

   ```
   touch .env.production
   ```

   Add the following environment variable to the `.env.production` file:

   ```
   VITE_MAPBOX_KEY=your_mapbox_key_here
   ```

   Replace `your_mapbox_key_here` with your actual Mapbox public API key.

3. **Serve the Application:**

   Build and serve the remote server with this command:

   ```
   npm run serve
   ```

### Setup Host-React Application

Follow these steps to get the host-React application running:

1. **Install Dependencies:**

   Change to the `/host-react` directory and install the required dependencies:

   ```
   cd host-react
   ```

   ```
   npm install
   ```

2. **Run the Application:**

   Launch the development server:

   ```
   npm run dev
   ```

This setup will have both the remote and host applications running, allowing you to work with the micro-frontend architecture designed for Shein.
