"use-client";

import { useState } from "react";
import IconInput from "@/components/shared/icon-input";

export default function EventForm({
	form,
	setForm,
}: {
	form: any;
	setForm: any;
}) {
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
					<option value="Art">Art</option>
					<option value="Music">Music</option>
					<option value="Online">Online</option>
					<option value="Cinema">Cinema</option>
					<option value="Gaming">Gaming</option>
					<option value="Meet Up">Meet Up</option>
					<option value="Cooking">Coocking</option>
				</select>
			</div>

			{/* Description */}
			<textarea
				rows={6}
				placeholder="Description"
				onChange={(e: any) =>
					setForm({ ...form, description: e.target.value })
				}
				className="
				rounded-3xl bg-myLightGrey border-transparent focus:border-0 focus:ring-0 placeholder-myDarkGrey
				mt-8
			"
			/>

			{/* Event Date */}
			<div className=" w-full mt-8">
				<IconInput
					storedData={form}
					targetField="date"
					iconType="calendar"
					userInput={form.date}
					dataModifier={setForm}
					placeholder="Event Date  DD/MM/YYYY"
				/>
			</div>

			{/* Event Location */}
			<div className=" w-full mt-8">
				<IconInput
					iconType="pin"
					storedData={form}
					targetField="location"
					dataModifier={setForm}
					userInput={form.location}
					placeholder="Event Location"
				/>
			</div>
		</div>
	);
}
