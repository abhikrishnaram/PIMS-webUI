import {Sidebar} from "@/app/(appLayout)/sidebar";

const AppLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
    )
}

export default AppLayout;