// This component is used for creation and update page.
import { useSession } from "next-auth/react";
import Upload from "@/components/form/upload";
import EventForm from "@/components/form/event-form";
import eventService from "@/services/event-service";
import PrimaryButton from "@/components/shared/primary-button";
import ConditionalRendering from "@/components/shared/conditional-rendering";
import { useForm } from "react-hook-form";

export default function BaseForm({
	form,
	action,
	setForm,
	isUpdate,
	selectedFile,
	selectedImage,
	setSelectedFile,
	setSelectedImage,
}: {
	form: any;
	action: Function;
	setForm: Function;
	isUpdate: boolean;
	selectedImage: any;
	setSelectedFile: Function;
	setSelectedImage: Function;
	selectedFile: File | undefined;
}) {
	const { data, status } = useSession();
	const isAuthenticated = status === "authenticated";
	const {
		register,
		clearErrors,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleFormSubmit = (_: any) => {
		action();
	};

	const isButtonDisabled = !!Object.keys(errors).length;

	return (
		<div className="w-full h-[100vh] overflow-hidden">
			<ConditionalRendering shouldDisplay={isAuthenticated}>
				<h1 className="2xl:ml-24 2xl:mr-24 2xl:mt-16	md:ml-8 md:mr-8 md:mt-16    xs:ml-4 xs:mr-4: mt-4 md:text-3xl   xs:text-2xl ">
					Event
				</h1>
				<p className="2xl:ml-24 2xl:mr-24 2xl:mt-4  md:ml-8 md:mr-8 md:mt-4    xs:ml-4 xs:mr-4 xs:mt-4 ">
					Please fill all the required information
				</p>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					{/* form and picture upload div */}
					<div className="md:flex md:gap-x-4 2xl:ml-24 2xl:mr-24 2xl:mt-4 md:ml-8 md:mr-8 md:mt-4    xs:ml-4 xs:mr-4 mt-4 ">
						{/* Upload picture div */}
						<div className="md:w-[40em] md:h-[25em]   xs:w-full xs:h-[25em] ">
							<Upload
								isUpdate={isUpdate}
								register={register}
								clearErrors={clearErrors}
								selectedFile={selectedFile}
								selectedImage={selectedImage}
								setSelectedFile={setSelectedFile}
								setSelectedImage={setSelectedImage}
							/>
							<p className="w-full text-red-600">
								{/* @ts-ignore */}
								{errors?.image?.message}
							</p>
						</div>

						{/* Event Form */}
						<div className="xs:mt-4 md:mt-0 md:w-full md:h-[25em]  xs:w-full xs:h-[30em] ">
							<EventForm
								form={form}
								setForm={setForm}
								register={register}
								formErrors={errors}
								clearErrors={clearErrors}
							/>
						</div>
					</div>
					{/* Button */}
					<div className="2xl:ml-24 2xl:mr-24 2xl:mt-18 md:ml-8 md:mr-8 md:mt-18  xs:ml-4 xs:mr-4 xs:mt-8 ">
						<PrimaryButton
							label="Continue"
							action={() => {}}
							buttonType="submit"
							disabled={isButtonDisabled}
						/>
					</div>
				</form>
			</ConditionalRendering>
			<ConditionalRendering shouldDisplay={!isAuthenticated}>
				<p className="2xl:ml-24 2xl:mr-24 2xl:mt-16	md:ml-8 md:mr-8 md:mt-16    xs:ml-4 xs:mr-4: mt-4 md:text-xl   xs:text-2xl ">
					You must be logged in if you want to create or update an
					event.
				</p>
			</ConditionalRendering>
		</div>
	);
}
