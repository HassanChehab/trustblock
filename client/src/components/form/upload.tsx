import { BsFillCloudUploadFill } from "react-icons/bs";

export default function Upload() {
	return (
		<div className="w-full h-full bg-myLightGrey border-dashed border-2 border-myDarkGrey rounded-lg relative">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2">
				<BsFillCloudUploadFill className="w-[50px] h-[50px] text-myDarkGrey" />
			</div>
		</div>
	);
}
