# PetTracker

PetTracker is a web application designed to help pet owners manage their pets' information, track lost pets, and explore lost pet reports in their area. Built with modern web technologies, PetTracker provides a user-friendly interface for pet management and community collaboration.

## Features

- **Pet Management**: Add, edit, and view details about your pets.
- **Lost Pet Reports**: Report lost pets and explore lost pet reports in your area.
- **Found Pet Reports**: Report found pets to help reunite them with their owners.
- **User Authentication**: Secure login and registration system.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React with TypeScript 
- **Styling**: Tailwind CSS and ShadCN UI
- **Backend**: Supabase (PostgreSQL and authentication)
- **Build Tool**: Vite
- **Icons**: Lucide React and React Icons

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pettracker.git
   cd pettracker

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
7. Make sure to enable authentication in your Supabase project and configure the necessary policies for the `pets` and `lost_pets` tables.


