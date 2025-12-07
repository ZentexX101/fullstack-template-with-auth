import { NavLink } from "react-router";
import { sections, sectionsForUser } from "../../constants/routes";

const LinkBase = ({ to, children, isActive }) => (
  <NavLink
    to={to}
    className={({ isActive: active }) =>
      `group flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
        active ?? isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-700 hover:bg-gray-50"
      }`
    }
  >
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full ${
        isActive ? "bg-blue-600" : "bg-transparent group-hover:bg-gray-300"
      }`}
    />
    <span>{children}</span>
  </NavLink>
);

const SidebarSection = ({ title, items }) => (
  <div className="mb-6">
    <p className="px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
      {title}
    </p>
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.path}>
          <LinkBase to={item.path}>{item.label}</LinkBase>
          {item.hasDropdown && item.dropdownItems?.length ? (
            <ul className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">
              {item.dropdownItems.map((dd) => (
                <li key={dd.path}>
                  <NavLink
                    to={dd.path}
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    {dd.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  </div>
);

const Sidebar = ({ role = "admin" }) => {
  const data = role === "user" ? sectionsForUser : sections;
  return (
    <aside className="h-screen sticky top-0 border-r border-gray-200 bg-white/80 backdrop-blur overflow-y-auto">
      <div className="h-14 flex items-center px-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-600" />
          <span className="font-semibold">App Admin</span>
        </div>
      </div>
      <nav className="p-3">
        {data.map((sec) => (
          <SidebarSection key={sec.title} title={sec.title} items={sec.items} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
