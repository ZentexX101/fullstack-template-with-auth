export const sections = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
      },
      {
        label: "Client",
        path: "/client",
      },
      {
        label: "Retreat sessions",
        path: "/events",
        hasDropdown: true,
        dropdownItems: [
          {
            label: "All Events",
            path: "/events/all-events",
          },
          {
            label: "All Bookings",
            path: "/events/all-bookings",
          },
        ],
      },
    ],
  },
  {
    title: "Course",
    items: [
      {
        label: "Courses",
        path: "/courses",
      },
      {
        label: "Course Packages",
        path: "/course-packages",
      },
      {
        label: "Transaction",
        path: "/course-orders",
      },
    ],
  },
  {
    title: "Product",
    items: [
      {
        label: "Products",
        path: "/products",
      },
      {
        label: "Orders",
        path: "/product-orders",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Support",
        path: "/support",
      },
      {
        label: "Audit Logs",
        path: "/audit-logs",
      },
      {
        label: "Faq",
        path: "/faq",
      },
    ],
  },
];

export const sectionsForUser = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/user",
      },
    ],
  },
  {
    title: "Learn",
    items: [
      {
        label: "My Courses",
        path: "/user/my-courses",
      },
      {
        label: "Course Packages",
        path: "/user/course-packages",
      },
      {
        label: "Lessons Progress",
        path: "/user/lessons-progress",
      },
      {
        label: "Retreats sessions",
        path: "/user/retreats-sessions",
      },
      {
        label: "Orders",
        path: "/user/orders",
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        label: "Products History",
        path: "/user/products-history",
      },
      // {
      // 	label: "Billing",
      // 	icon: <img src={billing} alt="Billing" />,
      // 	activeIcon: <img src={billingActive} alt="Billing" />,
      // 	path: "/user/billing",
      // },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Support Tickets",
        path: "/user/support",
      },
      {
        label: "FAQs",
        path: "/user/faqs",
      },
      {
        label: "Settings",
        path: "/user/settings",
      },
      {
        label: "Logout",
        path: "/sign-in",
      },
    ],
  },
];
