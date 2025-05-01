import { Outlet } from "react-router";

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            MobileSidebar

            <aside className="w-full max-w-[270px] hidden lg:block">
                Sidebar
            </aside>

            <aside className="children">
                <Outlet />
            </aside>
        </div>
    )
}