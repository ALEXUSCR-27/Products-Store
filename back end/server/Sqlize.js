exports._str = function(str) {
	if (str == "")
		return "null";
	else
		return "'" + str + "'";
}

exports._int = function(str) {
	if (str == "")
		return "null";
	return str;
}