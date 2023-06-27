import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Upload from "@/components/form/upload";
import EventForm from "@/components/form/event-form";
import eventApiService from "@/services/event-service";
import PrimaryButton from "@/components/shared/primary-button";
import ConditionalRendering from "@/components/shared/conditional-rendering";

export default function EventFormPage() {
	const { data, status } = useSession();
	const isAuthenticated = status === "authenticated";

	const [form, setForm] = useState({
		date: "",
		title: "",
		location: "",
		category: "",
		description: "",
	});

	const router = useRouter();
	const [selectedImage, setSelectedImage] = useState("");
	const [selectedFile, setSelectedFile] = useState<File>();

	const createEvent = async () => {
		const formData = new FormData();

		try {
			formData.append("image", selectedFile);
			formData.append("authorId", data?.user.email);
			for (const key in form) formData.append(key, form[key]);
			await eventApiService.createEvent(formData);
			router.push("/home");
		} catch (err) {
			// If i have time add notification
			console.log(err);
		}
	};

	return (
		<div className="w-full h-[100vh] overflow-hidden">
			<ConditionalRendering shouldDisplay={isAuthenticated}>
				<h1
					className="
				2xl:ml-24 2xl:mr-24 2xl:mt-16	md:ml-8 md:mr-8 md:mt-16    xs:ml-4 xs:mr-4: mt-4
				md:text-3xl   xs:text-2xl
			"
				>
					Event
				</h1>

				<p
					className="
						2xl:ml-24 2xl:mr-24 2xl:mt-4  md:ml-8 md:mr-8 md:mt-4    xs:ml-4 xs:mr-4 xs:mt-4
					"
				>
					Please fill all the required information
				</p>

				{/* form and picture upload div */}
				<div
					className="
				md:flex md:gap-x-4
				2xl:ml-24 2xl:mr-24 2xl:mt-4 md:ml-8 md:mr-8 md:mt-4    xs:ml-4 xs:mr-4 mt-4
			"
				>
					{/* Upload picture div */}
					<div
						className="
					md:w-[40em] md:h-[25em]   xs:w-full xs:h-[25em]
				"
					>
						<Upload
							selectedFile={selectedFile}
							selectedImage={selectedImage}
							setSelectedFile={setSelectedFile}
							setSelectedImage={setSelectedImage}
						/>
					</div>

					{/* Event Form */}
					<div
						className="
					xs:mt-4 md:mt-0
					md:w-full md:h-[25em]  xs:w-full xs:h-[30em]
				"
					>
						<EventForm form={form} setForm={setForm} />
					</div>
				</div>

				{/* Button */}
				<div
					className="
				2xl:ml-24 2xl:mr-24 2xl:mt-18 md:ml-8 md:mr-8 md:mt-18  xs:ml-4 xs:mr-4 xs:mt-8
			"
				>
					<PrimaryButton label="Continue" action={createEvent} />
				</div>
			</ConditionalRendering>
			<ConditionalRendering shouldDisplay={!isAuthenticated}>
				<p
					className="
					2xl:ml-24 2xl:mr-24 2xl:mt-16	md:ml-8 md:mr-8 md:mt-16    xs:ml-4 xs:mr-4: mt-4
					md:text-xl   xs:text-2xl
					"
				>
					You must be logged in if you want to create an event.
				</p>
			</ConditionalRendering>
		</div>
	);
}
