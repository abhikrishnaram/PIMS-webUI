import Link from "next/link"

const MENU = [
    { title: "Dashboard", icon: "ri-layout-2-line", href: "/" },
    { title: "Valves", icon: "ri-open-source-fill", href: "/valves" },
    { title: "Sectors", icon: "ri-group-fill", href: "/sectors" },
    { title: "Create Valve", icon: "ri-ai-generate", href: "/create/valve" },
    { title: "Create Group", icon: "ri-ai-generate", href: "/create/sector" },
];

export function Sidebar() {
    return (
        <div className="w-64 bg-white text-pretty shadow-md">
            <div className="p-6">
                <h1 className="text-2xl font-bold">PIMS Dashboard</h1>
            </div>
            <nav className="mt-6">
                {MENU.map((item) => (
                    <Link key={item.title} href={item.href} className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
                        <i className={item.icon + " mr-2"} size={20} />
                        {item.title}
                    </Link>
                ))}
            </nav>
        </div>
    )
}