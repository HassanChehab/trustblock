import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import BaseForm from "@/components/form/base-form";
import eventService from "@/services/event-service";
import notificationService from "@/services/notification-service";

export default function CreatePage() {
	const [form, setForm] = useState({
		date: "",
		title: "",
		location: "",
		category: "",
		description: "",
	});

	const router = useRouter();
	const { data, status } = useSession();
	const [selectedFile, setSelectedFile] = useState();
	const [selectedImage, setSelectedImage] = useState();

	const createEvent = async () => {
		const formData = new FormData();

		try {
			// @ts-ignore
			formData.append("image", selectedFile);
			// @ts-ignore
			formData.append("authorId", data?.user?.email);
			// @ts-ignore
			for (const key in form) formData.append(key, form[key]);
			const response = await eventService.createEvent(formData);

			if (response?.ok === false)
				throw new Error("An error occured on creation.");

			notificationService.simpleNotification(
				"Event created successfully",
				"success"
			);
			router.push("/home");
		} catch (err) {
			notificationService.simpleNotification(err, "error");
		}
	};

	return (
		<BaseForm
			form={form}
			isUpdate={true}
			setForm={setForm}
			action={createEvent}
			selectedFile={selectedFile}
			selectedImage={selectedImage}
			setSelectedFile={setSelectedFile}
			setSelectedImage={setSelectedImage}
		/>
	);
}
