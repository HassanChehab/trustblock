import Image from "next/image";
import { BsFillCloudUploadFill } from "react-icons/bs";
import ConditionalRendering from "@/components/shared/conditional-rendering";

export default function Upload({
	selectedFile,
	selectedImage,
	setSelectedFile,
	setSelectedImage,
}: {
	selectedFile: any;
	selectedImage: any;
	setSelectedFile: any;
	setSelectedImage: any;
}) {
	const onImageSelction = (target: any) => {
		if (target.files) {
			const file = target.files[0];
			setSelectedImage(URL.createObjectURL(file));
			setSelectedFile(file);
		}
	};

	return (
		<div className="w-full h-full">
			<label>
				<input
					type="file"
					onChange={({ target }) => onImageSelction(target)}
					hidden
				/>

				<div className="w-full h-full bg-myLightGrey border-dashed border-2 border-myDarkGrey rounded-lg relative">
					<ConditionalRendering shouldDisplay={!selectedImage}>
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2">
							<BsFillCloudUploadFill className="w-[50px] h-[50px] text-myDarkGrey" />
						</div>
					</ConditionalRendering>

					<ConditionalRendering shouldDisplay={selectedImage}>
						<Image
							fill
							objectFit="cover"
							src={selectedImage}
							alt="Selcted Event Image"
						/>
					</ConditionalRendering>
				</div>
			</label>
		</div>
	);
}
