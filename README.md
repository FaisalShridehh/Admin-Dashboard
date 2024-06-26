# Admin Dashboard

This project is a web application built with React and TypeScript, utilizing Vite as the build tool, various hooks, context providers, and React Router for efficient state management and routing.

## Table of Contents

- [Admin Dashboard](#admin-dashboard)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Project](#running-the-project)
  - [Key Features](#key-features)
  - [Usage](#usage)
  - [License](#license)

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/FaisalShridehh/Admin-Dashboard.git
   cd repo-name
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Project

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:5173`.

## Key Features

- **Vite:** Fast and efficient build tool for modern web projects.
- **Lazy Loading and Code Splitting:** Improve performance by loading components only when needed.
- **Context API:** Manage global state efficiently with React Context Providers.
- **Protected Routes:** Restrict access based on user roles using `RoleProtectedRoute`.
- **API Integration:** Communicate with backend services using Axios and custom API utilities.
- **React Query:** Handle server-state management, caching, and synchronization.
- **TypeScript:** Strongly typed code to improve code quality and reduce bugs.

## Usage

- **Login:** Navigate to `/login` to access the login form.
- **Dashboard:** Navigate to `/dashboard` for the main dashboard layout.
  - **End Users:** Manage end users under `/dashboard/end-users`.
  - **Admins:** Manage admins under `/dashboard/admins` (super admin access required).
  - **Suppliers:** Manage suppliers under `/dashboard/suppliers`.
  - **Financial Transactions:** Manage financial transactions under `/dashboard/financial-transactions`.
  - **Orders:** Manage orders under `/dashboard/orders`.
  - **Items:** Manage items under `/dashboard/items`.
- **Profile:** View and edit user profile at `/profile`.
- **404 Page:** Any undefined routes will render the `PageNotFound` component.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
