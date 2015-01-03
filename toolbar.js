var oojs = (function(oojs) {
	var items = {};

	Object.defineProperties(items, {
		el: {
			value: el
		},
		enabled: {
			set: function(value) {
				if (value) {
					this.el.classList.remove("disable");
				} else {
					this.el.classList.add("disable");
				}
			},
			get: function() {
				return !this.el.classList.contains("disable");
			}
		},
		activated: {
			set: function(value) {
				if (value) {
					this.el.classList.add("active");
				} else {
					this.el.classList.remove("active");
				}
			},
			get: function() {
				return this.el.classList.contains("active");
			}
		}
	});
	

})(oojs);