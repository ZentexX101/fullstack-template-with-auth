# Frontend Directory Structure

This document describes the structure and purpose of the files and folders in the `frontend` directory of this project.

```
frontend/
├── .gitignore           # Git ignore rules for frontend files
├── README.md            # Documentation for the frontend codebase
├── eslint.config.js     # ESLint configuration for code linting
├── index.html           # Main HTML file (entry point for the app)
├── node_modules/        # Installed npm dependencies (auto-generated)
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Exact dependency tree (auto-generated)
├── public/              # Public static assets (served as-is)
│   └── vite.svg         # Example static asset
├── src/                 # Source code for the frontend React application
│   ├── App.css          # Global styles for the App component
│   ├── App.jsx          # Root React component
│   ├── assets/          # Static assets (images, svgs, etc.)
│   │   └── react.svg
│   ├── components/      # Reusable UI components
│   ├── common/          # Common/shared components
│   │   ├── buttons/     # Button components
│   │   │   └── Button.jsx
│   │   ├── loaders/     # Loading indicators (spinners, etc.)
│   │   └── modals/      # Modal dialog components
│   ├── dashboard/       # Dashboard-specific components
│   │   ├── admin/       # Components for admin dashboard
│   │   └── user/        # Components for user dashboard
│   └── layouts/         # Layout components
│       ├── DashboardLayout.jsx
│       ├── Footer.jsx
│       ├── Header.jsx
│       ├── MainLayout.jsx
│       └── Sidebar.jsx
├── constants/           # App-wide constants
│   └── routes.js        # Route definitions/constants
├── context/             # React Context providers
│   └── AuthContext.jsx  # Authentication context
├── hooks/               # Custom React hooks
│   └── useAuth.js       # Hook for authentication logic
├── index.css            # Base CSS styles
├── main.jsx             # App entry point (renders App)
├── pages/               # Page-level components (for routing)
│   ├── NotFound.jsx     # 404 Not Found page
│   ├── auth/            # Auth pages (login/register)
│   │   ├── Login.jsx    # Login page
│   │   └── Register.jsx # Register page
│   ├── dashboard/       # Dashboard pages
│   │   ├── admin/       # Admin dashboard pages
│   │   │   └── AdminHome.jsx
│   │   └── user/        # User dashboard pages
│   │       └── UserHome.jsx
│   └── public/          # Public pages (no auth required)
│       ├── About.jsx
│       ├── Contact.jsx
│       └── Home.jsx
├── routes/              # Routing logic/components
│   ├── RoleBasedRoute.jsx # Route wrapper for role-based access
│   └── Router.jsx       # Main router configuration
├── services/            # API and service logic
│   └── ApiRequestHandler.js # Handles API requests
└── utils/               # Utility/helper functions
    └── formatDate.js    # Date formatting utility
├── vite.config.js       # Vite build tool configuration
```

## Folder and File Descriptions

-   **.gitignore**: Specifies files and directories to be ignored by Git.
-   **README.md**: Documentation for understanding and contributing to the frontend.
-   **eslint.config.js**: Configuration for linting JavaScript/JSX code.
-   **index.html**: The main HTML file loaded by the browser; entry point for the React app.
-   **node_modules/**: Directory containing installed npm dependencies (do not edit manually).
-   **package.json**: Lists project dependencies, scripts, and metadata.
-   **package-lock.json**: Records the exact version of each installed package.
-   **public/**: Static files served directly. Place images, icons, etc. here.
-   **src/**: Main source code for the frontend React application. See `src/README.md` for detailed structure.
-   **vite.config.js**: Configuration file for the Vite build tool.

---

## Source Code (`src/`) Structure

The `src` directory contains all source code for the React frontend. For a detailed breakdown, see [`src/README.md`](./src/README.md). Key highlights:

-   **App.jsx / App.css**: Root React component and global styles.
-   **assets/**: Static assets (images, SVGs, etc.).
-   **components/**: Reusable UI components, layouts, and dashboard-specific components.
-   **constants/**: Centralized constants (e.g., route paths).
-   **context/**: React Contexts for global state (e.g., authentication).
-   **hooks/**: Custom React hooks for encapsulating logic.
-   **pages/**: Top-level page components, organized by feature (auth, dashboard, public).
-   **routes/**: Routing-related logic and wrappers for protected/role-based routes.
-   **services/**: API request handlers and external service integrations.
-   **utils/**: Utility/helper functions used across the app.

---

This structure follows best practices for modern React projects, supporting scalability and maintainability. Update this document as your project evolves.
