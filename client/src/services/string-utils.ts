// Singeltion class that will handle all string formatting
class StringUtils {
	stringSizeCheck(string: string) {
		if (string.length < 45) return string;
		return `${string.slice(0, 45)}...`;
	}
}

export default new StringUtils();
