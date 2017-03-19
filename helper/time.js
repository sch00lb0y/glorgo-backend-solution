const normalTime = (time) => {
	if (time <= 12) {
		return `${time} AM`
	} else {
		return `${time - 12} PM`
	}
}
exports.normalTime = normalTime
