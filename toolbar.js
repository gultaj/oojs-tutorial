var oojs = (function(oojs) {

	var createToolbarItems = function(itemElements) {
		var items = [];

		[].forEach.call(itemElements, function(element, index) {
			var item = {
				toggleActiveState: function() {
					this.activated = !this.activated;
				}
			};

			Object.defineProperties(item, {
				el: {
					value: element,
					enumerable: true
				},
				enabled: {
					enumerable: true,
					set: function(value) {
						if (value) {
							this.el.classList.remove("disabled");
						} else {
							this.el.classList.add("disabled");
						}
					},
					get: function() {
						return !this.el.classList.contains("disabled");
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
			items.push(item);
		});

		return items;
	};

	oojs.createToolbar = function(elementId) {
		var element = document.getElementById(elementId);
		var items = document.querySelectorAll(".toolbar-item");

		return {
			items: createToolbarItems(items)
		};
	};
	
	return oojs;
})(oojs || {});