"use-client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import dateUtils from "@/services/date-utils";
import RegisterIconInput from "@/components/shared/registered-icon-input";

export default function EventForm({
	form,
	setForm,
	register,
	formErrors,
	clearErrors,
}: {
	form: any;
	setForm: any;
	register: any;
	formErrors: any;
	clearErrors: any;
}) {
	const onInputChange = (newVal: string, targetField: string) => {
		setForm({ ...form, [targetField]: newVal });
		clearErrors(targetField);
	};

	return (
		<div className="w-full h-full flex flex-col">
			<div className="w-full flex gap-4 ">
				<input
					{...register("title", { required: "Title is required" })}
					type="text"
					value={form.title}
					placeholder="Event Title"
					onChange={(e: any) =>
						onInputChange(e.target.value, "title")
					}
					className={` w-full rounded-full bg-myLightGrey border-transparent focus:border-0 focus:ring-0 placeholder-myDarkGrey`}
				/>
				<select
					{...register("category", {
						required: "Category is required",
					})}
					value={form.category}
					onChange={(e: any) =>
						onInputChange(e.target.value, "category")
					}
					className={` w-full rounded-full bg-myLightGrey border-transparent focus:border-0 focus:ring-0 text-myDarkGrey`}
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

			<div className="flex gap-4 w-full">
				<p className="w-full text-red-600">
					{/* @ts-ignore */}
					{formErrors?.title?.message}
				</p>
				<p className="w-full text-red-600">
					{/* @ts-ignore */}
					{formErrors?.category?.message}
				</p>
			</div>

			{/* Description */}
			<textarea
				{...register("description", {
					required: "Description is required",
				})}
				rows={6}
				value={form.description}
				placeholder="Description"
				onChange={(e: any) =>
					onInputChange(e.target.value, "description")
				}
				className="rounded-3xl bg-myLightGrey border-transparent focus:border-0 focus:ring-0 placeholder-myDarkGrey mt-8"
			/>
			<p className="w-full text-red-600">
				{/* @ts-ignore */}
				{formErrors?.description?.message}
			</p>

			{/* Event Date */}
			<div className=" w-full mt-8">
				<RegisterIconInput
					storedData={form}
					targetField="date"
					iconType="calendar"
					register={register}
					dataModifier={setForm}
					clearErrors={clearErrors}
					placeholder="Event Date  DD/MM/YYYY"
					userInput={form.date}
				/>
				<p className="w-full text-red-600">
					{/* @ts-ignore */}
					{formErrors?.date?.message}
				</p>
			</div>

			{/* Event Location */}
			<div className=" w-full mt-8">
				<RegisterIconInput
					iconType="pin"
					storedData={form}
					register={register}
					targetField="location"
					dataModifier={setForm}
					clearErrors={clearErrors}
					userInput={form.location}
					placeholder="Event Location"
				/>
				<p className="w-full text-red-600">
					{/* @ts-ignore */}
					{formErrors?.location?.message}
				</p>
			</div>
		</div>
	);
}
