let localStorage = {
	set: function (name, content) {
		if (!name) return;
		if (typeof content !== "string") {
			content = JSON.stringify(content);
		}
		window.localStorage.setItem(name, content);
	},

	get: function (name) {
		if (!name) return;
		return window.localStorage.getItem(name);
	}
};

export default localStorage;