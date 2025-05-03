import { Header, StatsCard, TripCard } from "components";

export default function Dashboard() {
    const user = {
        name: "Elmurod",
        email: "elmurod@gmail.com",
        imageUrl: "/assets/images/david.webp",
    };

    const dashboardStats = {
        totalUsers: 12500,
        usersJoined: {
            currentMonth: 200,
            lastMonth: 150,
        },
        totalTrips: 5000,
        tipsCreated: {
            currentMonth: 300,
            lastMonth: 250,
        },
        userRole: {
            total: 100,
            currentMonth: 20,
            lastMonth: 15,
        },
    };

    const {
        totalUsers,
        usersJoined,
        totalTrips,
        tipsCreated,
        userRole
    } = dashboardStats;

    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${user?.name || "Guest"} 👋`}
                description="Track activity, trends and popular destinations in real time."
            />

            <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <StatsCard
                        headerTitle="Total Users"
                        total={totalUsers}
                        currentMonthCount={usersJoined.currentMonth}
                        lastMonthCount={usersJoined.lastMonth}
                    />

                    <StatsCard
                        headerTitle="Total Trips"
                        total={totalTrips}
                        currentMonthCount={tipsCreated.currentMonth}
                        lastMonthCount={tipsCreated.lastMonth}
                    />

                    <StatsCard
                        headerTitle="Active Users"
                        total={userRole.total}
                        currentMonthCount={userRole.currentMonth}
                        lastMonthCount={userRole.lastMonth}
                    />
                </div>
            </section>

            <TripCard />
        </main>
    )
}