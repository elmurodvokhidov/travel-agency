import { calculateTrendPercentage, cn } from "lib/utils"

export default function StatsCard({
    headerTitle,
    total,
    currentMonthCount,
    lastMonthCount,
}: StatsCard) {
    const { trend, percentage } = calculateTrendPercentage(currentMonthCount, lastMonthCount);

    const isDecrement = trend === "decrement";

    return (
        <article className="stats-card">
            <h3 className="text-base font-medium">
                {headerTitle}
            </h3>

            <div className="content">
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl font-semibold">
                        {total}
                    </h2>

                    <div className="flex items-center gap-2">
                        <figure className="flex items-center gap-1">
                            <img
                                src={`/assets/icons/${isDecrement ? "arrow-down-red.svg" : "arrow-up-green.svg"}`}
                                alt="arrow"
                                className="size-5"
                            />

                            <figcaption className={cn("text-sm font-medium", isDecrement ? "text-red-500" : "text-success-700")}>
                                {Math.round(percentage)}%
                            </figcaption>
                        </figure>

                        <p className="text-sm font-medium text-gray-100 truncate">vs last month</p>
                    </div>
                </div>

                <img
                    src={`/assets/icons/${isDecrement ? "decrement.svg" : "increment.svg"}`}
                    alt="tren graph"
                    className="w-full xl:w-32 h-full md:h-32 xl:h-full"
                />
            </div>
        </article>
    )
}