import { MdLocationPin } from "react-icons/md";
import { FaCalendarWeek } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

// This component is used by a form.
// This one if for form registration
// It should always take an object even if there is only one key in that object => search bar
export default function RegisterdIconInput({
	iconType,
	register,
	userInput,
	storedData,
	clearErrors,
	placeholder,
	targetField,
	dataModifier,
}: {
	register: any;
	userInput: any;
	storedData: any;
	clearErrors: any;
	iconType: string;
	placeholder: string;
	targetField: string;
	dataModifier: Function;
}) {
	const iconList: any = {
		pin: (
			<MdLocationPin className="w-[25px] h-[25px] text-myDarkGrey mt-2 ml-4" />
		),
		calendar: (
			<FaCalendarWeek className="w-[20px] h-[20px] text-myDarkGrey mt-2 ml-4" />
		),
	};

	const onInputChange = (newVal: string, targetField: string) => {
		dataModifier({
			...storedData,
			[targetField]: newVal,
		});
		clearErrors(targetField);
	};

	return (
		<div className="w-full rounded-full bg-myLightGrey flex overflow-hidden">
			<div>{iconList[iconType]}</div>
			<input
				{...register(targetField, {
					required: `${targetField} is required`,
				})}
				type="text"
				value={userInput}
				placeholder={placeholder}
				onChange={(e: any) =>
					onInputChange(e.target.value, targetField)
				}
				className="w-full bg-myLightGrey border-transparent focus:border-0 focus:ring-0 placeholder-myDarkGrey"
			/>
		</div>
	);
}
