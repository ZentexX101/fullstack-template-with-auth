# Frontend `src` Directory Structure

This document describes the structure and purpose of the files and folders in the `frontend/src` directory.

```
frontend/src/
├── App.css                # Global styles for the App component
├── App.jsx                # Root React component
├── assets/                # Static assets (images, svgs, etc.)
│   └── react.svg
├── components/            # Reusable UI components
│   ├── common/            # Common/shared components
│   │   ├── buttons/       # Button components
│   │   │   └── Button.jsx
│   │   ├── loaders/       # Loading indicators (spinners, etc.)
│   │   └── modals/        # Modal dialog components
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── admin/         # Components for admin dashboard
│   │   └── user/          # Components for user dashboard
│   └── layouts/           # Layout components
│       ├── DashboardLayout.jsx
│       ├── Footer.jsx
│       ├── Header.jsx
│       ├── MainLayout.jsx
│       └── Sidebar.jsx
├── constants/             # App-wide constants
│   └── routes.js          # Route definitions/constants
├── context/               # React Context providers
│   └── AuthContext.jsx    # Authentication context
├── hooks/                 # Custom React hooks
│   └── useAuth.js         # Hook for authentication logic
├── index.css              # Base CSS styles
├── main.jsx               # App entry point (renders App)
├── pages/                 # Page-level components (for routing)
│   ├── NotFound.jsx       # 404 Not Found page
│   ├── auth/              # Auth pages (login/register)
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── dashboard/         # Dashboard pages
│   │   ├── admin/         # Admin dashboard pages
│   │   │   └── AdminHome.jsx
│   │   └── user/          # User dashboard pages
│   │       └── UserHome.jsx
│   └── public/            # Public pages (no auth required)
│       ├── About.jsx
│       ├── Contact.jsx
│       └── Home.jsx
├── routes/                # Routing logic/components
│   ├── RoleBasedRoute.jsx # Route wrapper for role-based access
│   └── Router.jsx         # Main router configuration
├── services/              # API and service logic
│   └── ApiRequestHandler.js # Handles API requests
└── utils/                 # Utility/helper functions
    └── formatDate.js      # Date formatting utility
```

## Folder Descriptions
- **assets/**: Static files and images used throughout the app.
- **components/**: Reusable UI components, layouts, and dashboard-specific components.
- **constants/**: Centralized constants (e.g., route paths).
- **context/**: React Contexts for global state (e.g., authentication).
- **hooks/**: Custom React hooks for encapsulating logic.
- **pages/**: Top-level page components, organized by feature (auth, dashboard, public).
- **routes/**: Routing-related logic and wrappers for protected/role-based routes.
- **services/**: API request handlers and external service integrations.
- **utils/**: Utility/helper functions used across the app.

---

This structure promotes modularity, reusability, and maintainability for scalable React projects. Update this document as your project structure evolves.
