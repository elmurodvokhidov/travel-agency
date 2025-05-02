import { Header } from "components";

export default function Dashboard() {
    const user = {
        name: "Elmurod",
        email: "elmurod@gmail.com",
        imageUrl: "/assets/images/david.webp",
    };

    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${user?.name || "Guest"} 👋`}
                description="Track activity, trends and popular destinations in real time."
            />

            Dashboard page contents
        </main>
    )
}