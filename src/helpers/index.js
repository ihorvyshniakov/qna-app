export function convertTimestampToDateString(timestamp) {
	let date = new Date(timestamp * 1000)
	return String(date).slice(4,21)
}