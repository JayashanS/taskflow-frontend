
# Task Flow Microfrontend Project

This repository contains a **Microfrontend architecture** for the **Task Flow** system. The project is split into two main applications:

1. **Host** (Main application for integrating the federated modules)
2. **Task Management** (Microfrontend for task management functionality)

---

## Project Structure

The project consists of two main parts:

- **Host**: The main application that loads and integrates the federated modules, including the task management module.
- **Task Management**: A federated module that exposes the task management functionality.

---

## Setup Instructions

### 1. Host (Main Application)

#### Setup and Run Host

1. Clone the repository and navigate to the `host` directory:

   ```bash
   git clone <repo-url>
   cd host
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application in development mode:

   ```bash
   npm start
   ```

   The Host application will be available at `http://localhost:4000/`.

4. **ModuleFederationPlugin** in the Host application is set up to consume the task management module from `task-management` and expose shared components such as Redux slices and custom hooks.

---

### 2. Task Management (Microfrontend)

#### Setup and Run Task Management

1. Clone the repository for the `task-management` module:

   ```bash
   git clone <repo-url-for-task-management>
   cd task-management
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

---

## Available Scripts

In both the **Host** and **Task Management** directories, the following npm scripts are available:

- **Start the development server**:

   ```bash
   npm start
   ```

- **Run unit tests**:

   ```bash
   npm run test
   ```

- **Run Jest in watch mode for continuous testing**:

   ```bash
   npm run test:watch
   ```

- **Run Jest with code coverage**:

   ```bash
   npm run test:coverage
   ```

- **Build the application for production**:

   ```bash
   npm run build
   ```

---

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For state management.
- **Webpack**: For bundling and Module Federation.
- **TypeScript**: For type safety and development tooling.
- **Ant Design**: For UI components and design.
- **Jest**: For unit testing.
- **Babel**: For JavaScript and TypeScript compilation.
- **CSS**: For styling the applications.

---

## License

This project is licensed under the ISC License.
