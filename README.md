# Cesta Básnikov
A visually immersive web experience for the 'Cesta básnikov' cultural-tourism trail, guiding visitors through a journey of poetry, art, and nature.
[cloudflarebutton]
## ✨ Key Features
*   **Interactive Trail Map**: Explore the tourist trail with detailed stops, route information, and practical details.
*   **Poet & Sculpture Profiles**: A comprehensive, searchable directory of featured poets and their corresponding sculptures.
*   **Rich Media Gallery**: A filterable gallery showcasing sculptures, nature, and events with a beautiful lightbox view.
*   **Events Calendar**: Stay updated on symposiums, workshops, and guided tours with a built-in registration system.
*   **Integrated Audio Player**: Listen to poems recited by famous actors, accessible via QR codes on the trail.
*   **Stunning Visual Design**: A beautiful, illustrative design with seamless light and dark modes.
*   **Fully Responsive**: A flawless experience across all device sizes, from mobile phones to desktops.
*   **Admin Panel**: A secure area for administrators to manage all site content (poets, gallery, events, and settings).
## ��� Technology Stack
*   **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **Routing**: [React Router](https://reactrouter.com/)
*   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Deployment**: [Cloudflare Pages & Workers](https://workers.cloudflare.com/)
## 🏁 Getting Started
Follow these instructions to get the project up and running on your local machine for development and testing purposes.
### Prerequisites
You need to have [Bun](https://bun.sh/) installed on your machine.
### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/cesta-basnikov.git
    cd cesta-basnikov
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```
### Running the Development Server
To start the local development server, run the following command:
```bash
bun run dev
```
The application will be available at `http://localhost:3000` (or the next available port).
## 🔑 Admin Access
The application includes a content management panel. You can access it at `/admin/login`.
*   **Email:** `admin@cestabasnikov.sk`
*   **Password:** `password123`
## 🔧 Development
This project follows standard React and Tailwind CSS development practices.
*   **Components**: Reusable UI components are located in `src/components/ui`. It is highly recommended to use these pre-built `shadcn/ui` components.
*   **Pages**: All page-level components are located in the `src/pages` directory.
*   **Styling**: Use Tailwind CSS utility classes for styling. Custom global styles and theme variables are defined in `src/index.css` and `tailwind.config.js`.
*   **Backend Logic**: Server-side logic for API endpoints is handled by Cloudflare Workers, with routes defined in `worker/userRoutes.ts`.
### Available Scripts
*   `bun run dev`: Starts the Vite development server.
*   `bun run build`: Builds the application for production.
*   `bun run lint`: Lints the codebase using ESLint.
*   `bun run deploy`: Deploys the application to Cloudflare.
## ☁��� Deployment
This project is configured for seamless deployment to **Cloudflare Pages**.
To deploy your application, simply run the deploy script:
```bash
bun run deploy
```
This command will build the project and deploy it using the Wrangler CLI.
Alternatively, you can connect your GitHub repository to Cloudflare Pages for automatic deployments on every push to your main branch.
[cloudflarebutton]