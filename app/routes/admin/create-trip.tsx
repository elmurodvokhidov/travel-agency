import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components";
import type { Route } from "./+types/create-trip";
import { comboBoxItems, selectItems } from "~/constants";
import { formatKey } from "lib/utils";

export const loader = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();

    return data.map((country: any) => ({
        name: country.flag + country.name.common,
        coordinates: country.latlng,
        value: country.name.common,
        openStreetMap: country.maps?.openStreetMap,
    }));
}

export default function CreateTrip({ loaderData }: Route.ComponentProps) {
    const countries = loaderData as Country[];
    const countryData = countries.map((country) => ({
        text: country.name,
        value: country.value,
    }));

    const handleChange = async (key: keyof TripFormData, value: string | number) => { }

    const handleSubmit = async () => { }

    return (
        <main className="flex flex-col gap-10 pb-20 wrapper">
            <Header
                title="Add a New Trip"
                description="View and edit AI-generated travel plans"
                ctaText="Create a trip"
                ctaUrl="/trips/create"
            />

            <section className="mt-52 wrapper-md">
                <form className="trip-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="country">
                            Country
                        </label>

                        <ComboBoxComponent
                            id="country"
                            dataSource={countryData}
                            fields={{ text: "text", value: "value" }}
                            placeholder="Select a country"
                            className="combo-box"
                            change={(e: { value: string | undefined }) => {
                                if (e.value) {
                                    handleChange("country", e.value);
                                }
                            }}
                            allowFiltering
                            filtering={(e) => {
                                const query = e.text.toLowerCase();

                                e.updateData(
                                    countries.filter((country) => country.name.toLowerCase().includes(query)).map(((country) => ({
                                        text: country.name,
                                        value: country.value
                                    })))
                                )
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="duration">
                            Duration
                        </label>

                        <input
                            id="duration"
                            name="duration"
                            placeholder="Enter a number of days"
                            type="number"
                            className="form-input placeholder:text-gray-100"
                            onChange={(e) => handleChange("duration", Number(e.target.value))}
                        />
                    </div>

                    {selectItems.map((key) => (
                        <div key={key}>
                            <label htmlFor={key}>{formatKey(key)}</label>

                            <ComboBoxComponent
                                id={key}
                                dataSource={comboBoxItems[key].map((item) => ({
                                    text: item,
                                    value: item,
                                }))}
                                fields={{ text: "text", value: "value" }}
                                placeholder={`Select ${formatKey(key)}`}
                                change={(e: { value: string | undefined }) => {
                                    if (e.value) {
                                        handleChange(key, e.value);
                                    }
                                }}
                                allowFiltering
                                filtering={(e) => {
                                    const query = e.text.toLowerCase();

                                    e.updateData(
                                        comboBoxItems[key].filter((item) => item.toLowerCase().includes(query)).map(((item) => ({
                                            text: item,
                                            value: item
                                        })))
                                    )
                                }}
                                className="combo-box"
                            />
                        </div>
                    ))}
                </form>
            </section>
        </main>
    )
}