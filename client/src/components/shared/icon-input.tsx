import { MdLocationPin } from "react-icons/md";
import { FaCalendarWeek } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

// This component is used by a form.
// It should always take an object even if there is only one key in that object => search bar
export default function IconInput({
	iconType,
	userInput,
	storedData,
	placeholder,
	targetField,
	dataModifier,
}: {
	iconType: string;
	userInput: string;
	storedData: object;
	placeholder: string;
	targetField: string;
	dataModifier: Function;
}) {
	const iconList: any = {
		pin: (
			<MdLocationPin className="w-[25px] h-[25px] text-myDarkGrey mt-2 ml-4" />
		),
		search: (
			<AiOutlineSearch className="w-[25px] h-[25px] text-myDarkGrey mt-2 ml-4" />
		),
		calendar: (
			<FaCalendarWeek className="w-[20px] h-[20px] text-myDarkGrey mt-2 ml-4" />
		),
	};

	return (
		<div className="w-full rounded-full bg-myLightGrey flex overflow-hidden">
			<div>{iconList[iconType]}</div>
			<input
				type="text"
				placeholder="Event Location"
				onChange={(e: any) =>
					dataModifier({
						...storedData,
						[targetField]: e.target.value,
					})
				}
				className="w-full bg-myLightGrey border-transparent focus:border-0 focus:ring-0 placeholder-myDarkGrey"
			/>
		</div>
	);
}
