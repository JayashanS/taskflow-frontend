
# Task Flow Microfrontend Project

This repository contains a **Microfrontend architecture** for the **Task Flow** system. The project is split into two main applications:

1. **Host** (Main application for integrating the federated modules)
2. **Task Management** (Microfrontend for task management functionality)



## Project Structure

The project consists of two main parts:

- **Host**: The main application that loads and integrates the federated modules, including the task management module.
- **Task Management**: A federated module that exposes the task management functionality.

Both applications are contained within the same repository.



## Setup Instructions

### Clone the Repository

1. Clone the repository:

   ```bash
   git clone https://github.com/JayashanS/taskflow-frontend.git
   cd taskflow-frontend
   ```



### 1. Host (Main Application)

#### Setup and Run Host

1. Navigate to the `host` directory:

   ```bash
   cd host
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a .env file in the root directory and include following
   ```bash
   REACT_APP_API_URL=http://localhost:5000/api || or your backend URL
   REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```

4. Run the application in development mode:

   ```bash
   npm start
   ```

   The Host application will be available at `http://localhost:4000/`.

5. **ModuleFederationPlugin** in the Host application is set up to consume the task management module from `task-management` and expose shared components such as Redux slices and custom hooks.



### 2. Task Management (Microfrontend)

#### Setup and Run Task Management

1. Navigate to the `task-management` directory:

   ```bash
   cd ../task-management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application in development mode:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:4002/`.

4. **ModuleFederationPlugin** will expose the `TaskModule` to be consumed by the Host application.



## Available Scripts

In both the **Host** and **Task Management** directories, the following npm scripts are available:

- **Start the development server**:

   ```bash
   npm start
   ```


## Testing

### Task Management Module

- **Run unit tests** for the Task Management module:

   ```bash
   npm run test
   ```

- **Run Jest in watch mode for continuous testing** (for the Task Management module):

   ```bash
   npm run test:watch
   ```

- **Run Jest with code coverage** (for the Task Management module):

   ```bash
   npm run test:coverage
   ```



## Technologies Used

- **React**: For building the user interface.
- **Redux**: For state management.
- **Webpack**: For bundling and Module Federation.
- **TypeScript**: For type safety and development tooling.
- **Ant Design**: For UI components and design.
- **Jest**: For unit testing.

---

## License

This project is licensed under the ISC License.
