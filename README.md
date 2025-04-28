# PetTracker

PetTracker is a web application designed to help pet owners manage their pets' information, track lost pets, and explore lost pet reports in their area. Built with modern web technologies, PetTracker provides a user-friendly interface for pet management and community collaboration.

## Features

- **Pet Management**: Add, edit, and view details about your pets.
- **Lost Pet Reports**: Report lost pets and explore lost pet reports in your area.
- **Found Pet Reports**: Report found pets to help reunite them with their owners.
- **User Authentication**: Secure login and registration system.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dynamic Navigation**: Seamless navigation between pages using React Router.

## Technologies Used

### **Frontend**
- **React with TypeScript**:
  - **Purpose**: React is used to build the user interface with reusable components, while TypeScript ensures type safety and reduces runtime errors.
  - **Advantages**:
    - Component-based architecture for better code organization.
    - TypeScript provides static type checking, improving code quality and maintainability.

- **React Router**:
  - **Purpose**: React Router is used for client-side routing to enable seamless navigation between pages.
  - **Advantages**:
    - Declarative routing for better readability and maintainability.
    - Dynamic route matching for handling parameters like pet IDs.
    - Enables single-page application (SPA) behavior with no full-page reloads.

- **Tailwind CSS**:
  - **Purpose**: Tailwind CSS is used for styling the application with utility-first classes.
  - **Advantages**:
    - Rapid development with pre-defined utility classes.
    - Consistent design system without writing custom CSS.
    - Highly customizable for unique designs.

- **ShadCN UI**:
  - **Purpose**: Provides pre-built, accessible UI components for faster development.
  - **Advantages**:
    - Ensures accessibility compliance.
    - Reduces development time with ready-to-use components.

- **Lucide React and React Icons**:
  - **Purpose**: Used for adding scalable vector icons to the application.
  - **Advantages**:
    - Lightweight and customizable icons.
    - Easy integration with React components.

### **Backend**
- **Supabase**:
  - **Purpose**: Supabase is used as the backend for authentication, database management, and API services.
  - **Advantages**:
    - Built-in authentication with support for multiple providers (email, social logins, etc.).
    - PostgreSQL database with real-time capabilities.
    - Simplifies backend development with pre-built APIs and SDKs.

### **Build Tool**
- **Vite**:
  - **Purpose**: Vite is used as the build tool for the project.
  - **Advantages**:
    - Lightning-fast development server with hot module replacement (HMR).
    - Optimized production builds.
    - Minimal configuration required.

### **Animations**
- **Framer Motion**:
  - **Purpose**: Used for creating smooth animations and transitions in the application.
  - **Advantages**:
    - Declarative API for animations.
    - Highly customizable and performant animations.

### **Database**
- **PostgreSQL (via Supabase)**:
  - **Purpose**: Stores all application data, including user information, pet details, and lost pet reports.
  - **Advantages**:
    - Reliable and scalable relational database.
    - Advanced querying capabilities.
    - Real-time updates for dynamic data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pastelcode/PetTracker.git
   cd pettracker
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables. Create a `.env` file in the root directory and add your Supabase URL and API key:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

6. Create a Supabase project and set up the database schema as described in the `supabase_schema.sql` file in the `supabase` directory. You can use the Supabase dashboard to run the SQL commands.

7. Enable authentication in your Supabase project and configure the necessary policies for the `pets` and `lost_pets` tables.