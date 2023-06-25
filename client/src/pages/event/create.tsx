import Upload from "@/components/form/upload";
import EventForm from "@/components/form/event-form";
import PrimaryButton from "@/components/shared/primary-button";

export default function EventFormPage() {
	const onFormSubmit = () => {
		console.log("button clicked");
	};

	return (
		<div className="w-full h-[100vh] overflow-hidden">
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
					<Upload />
				</div>

				{/* Event Form */}
				<div
					className="
					xs:mt-4 md:mt-0
					md:w-full md:h-[25em]  xs:w-full xs:h-[30em]
				"
				>
					<EventForm />
				</div>
			</div>

			{/* Button */}
			<div
				className="
				2xl:ml-24 2xl:mr-24 2xl:mt-8 md:ml-8 md:mr-8 md:mt-8    xs:ml-4 xs:mr-4 mt-8
			"
			>
				<PrimaryButton label="Continue" action={onFormSubmit} />
			</div>
		</div>
	);
}
