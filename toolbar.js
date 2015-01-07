var oojs = (function(oojs) {

	var createToolbarItem = function(itemElement) {
		var item = {
			toggleActiveState: function() {
				this.activated = !this.activated;
			}
		};

		Object.defineProperties(item, {
			el: {
				value: itemElement,
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
		return item;
	};

	var createToolbarItems = function(itemElements) {
		var items = [];

		[].forEach.call(itemElements, function(element, index) {
			var item = createToolbarItem(element);
			items.push(item);
		});

		return items;
	};
	oojs.createToolbar = function(elementId) {
		var element = document.getElementById(elementId);

		if (!element) {
			element = document.createElement('DIV');
			element.id = elementId;
			element.className = 'toolbar';
		}

		var items = element.querySelectorAll('.toolbar-item');

		var toolbar = {
			add: function(options) {
				var span = document.createElement('span');
				span.className = 'toolbar-item';

				this.el.appendChild(span);

				var item = createToolbarItem(span);
				this.items.push(item);
			},
			remove: function(index) {
				if (index > this.items.length || index < 0) {
					throw new Error('Index is out of range');
				}

				var item = this.items[index];

				this.el.removeChild(item.el);
				this.items.splice(index, 1);

				item = null;

			},
			appendTo: function(parentElement) {
				parentElement.appendChild(this.el);
			}
		};

		Object.defineProperties(toolbar, {
			el: {
				value: element
			},
			items: {
				value: createToolbarItems(items),
				enumerable: true
			}
		});

		return toolbar;
	};
	
	return oojs;
})(oojs || {});