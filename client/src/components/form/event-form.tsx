"use-client";

import { useState } from "react";
import IconInput from "@/components/shared/icon-input";

export default function EventForm() {
	const [form, setForm] = useState({
		date: "",
		title: "",
		location: "",
		category: "",
		description: "",
	});

	return (
		<div className="w-full h-full flex flex-col">
			<div
				className="
				w-full flex gap-4
				"
			>
				<input
					type="text"
					placeholder="Event Title"
					onChange={(e: any) =>
						setForm({ ...form, title: e.target.value })
					}
					className="w-full rounded-full bg-myLightGrey border-transparent focus:border-0 focus:ring-0 placeholder-myDarkGrey"
				/>

				<select
					name="Category"
					onChange={(e: any) =>
						setForm({ ...form, category: e.target.value })
					}
					className="w-full rounded-full bg-myLightGrey border-transparent focus:border-0 focus:ring-0 text-myDarkGrey"
				>
					<option value="" disabled selected>
						Category
					</option>
					<option value="volvo">Volvo</option>
					<option value="saab">Saab</option>
					<option value="opel">Opel</option>
					<option value="audi">Audi</option>
				</select>
			</div>

			{/* Description */}
			<textarea
				rows="8"
				type="text"
				placeholder="Description"
				onChange={(e: any) =>
					setForm({ ...form, description: e.target.value })
				}
				className="
				rounded-lg bg-myLightGrey border-transparent focus:border-0 focus:ring-0 placeholder-myDarkGrey
				mt-8
			"
			/>

			{/* Event Date */}
			<div className=" w-full mt-8">
				<IconInput
					storedData={form}
					targetField="date"
					iconType="calendar"
					userIntput={form.date}
					dataModifier={setForm}
					placeholder="Event Date"
				/>
			</div>

			{/* Event Location */}
			<div className=" w-full mt-8">
				<IconInput
					iconType="pin"
					storedData={form}
					targetField="location"
					dataModifier={setForm}
					userIntput={form.location}
					placeholder="Event Location"
				/>
			</div>
		</div>
	);
}
