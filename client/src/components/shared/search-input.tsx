import { MdLocationPin } from "react-icons/md";
import { FaCalendarWeek } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

// This component is used by a form.
// It should always take an object even if there is only one key in that object => search bar
export default function SearchInput({
	iconType,
	userInput,
	storedData,
	placeholder,
	targetField,
	dataModifier,
}: {
	userInput: any;
	storedData: any;
	iconType: string;
	placeholder: string;
	targetField: string;
	dataModifier: Function;
}) {
	return (
		<div className="w-full rounded-full bg-myLightGrey flex overflow-hidden">
			<AiOutlineSearch className="w-[25px] h-[25px] text-myDarkGrey mt-2 ml-4" />
			<input
				type="text"
				value={userInput}
				placeholder={placeholder}
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
