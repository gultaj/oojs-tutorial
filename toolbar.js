var oojs = (function(oojs) {

	var ToolbarItem = function(toolbarElement) {
		EventTarget.call(this);

		Object.defineProperties(this, {
			__el: {
				value: toolbarElement
			}
		});
	};
	ToolbarItem.prototype = Object.create(EventTarget.prototype, {
		toggleActiveState: {
			value: function() {
				this.activated = !this.activated;
			},
			enumerable: true
		},
		enabled: {
			set: function(value) {
				var currentValue = this.enabled;
				if (currentValue === value) {
					return;
				}
				if (value) {
					this.__el.classList.remove("disabled");
				} else {
					this.__el.classList.add("disabled");
				}

				this.__fire({
					type: "enabledchanged",
					value: currentValue
				});
			},
			get: function() {
				return !this.__el.classList.contains("disabled");
			},
			enumerable: true
		},
		activated: {
			set: function(value) {
				var currentValue = this.activated;
				if (currentValue === value) {
					return;
				}
				if (value) {
					this.__el.classList.add("active");
				} else {
					this.__el.classList.remove("active");
				}
				this.__fire({
					type: "activatedchanged",
					value: value
				});
			},
			get: function() {
				return this.__el.classList.contains("active");
			},
			enumerable: true
		}
	});

	var createToolbarItems = function(itemElements) {
		var items = [];

		[].forEach.call(itemElements, function(element, index) {
			var item = new ToolbarItem(element);
			items.push(item);
		});

		return items;
	};

	var Toolbar = function(toolbarElement) {
		EventTarget.call(this);

		var items = toolbarElement.querySelectorAll('.toolbar-item');

		Object.defineProperties(this, {
			__el: {
				value: toolbarElement
			},
			items: {
				value: createToolbarItems(items),
				enumerable: true
			}
		});
	};
	Toolbar.prototype = Object.create(EventTarget.prototype, {
		add: {
			value: function(options) {
				var span = document.createElement('span');
				span.className = 'toolbar-item';

				this.__el.appendChild(span);

				var item = new ToolbarItem(span);
				this.items.push(item);

				this.__fire({
					type: "itemadded",
					item: item
				});
			},
			enumerable: true
		},
		remove: {
			value: function(index) {
				if (index > this.items.length || index < 0) {
					throw new Error('Index is out of range');
				}

				var item = this.items[index];

				this.__el.removeChild(item.__el);
				this.items.splice(index, 1);

				item = null;

				this.__fire({
					type: "itemremoved"
				});
			},
			enumerable: true

		},
		appendTo: {
			value: function(parentElement) {
				parentElement.appendChild(this.__el);
			},
			enumerable: true
		}
	});

	oojs.createToolbar = function(elementId) {
		var element = document.getElementById(elementId);

		if (!element) {
			element = document.createElement('DIV');
			element.id = elementId;
			element.className = 'toolbar';
		}

		var toolbar = new Toolbar(element);
		
		return toolbar;
	};
	
	return oojs;
})(oojs || {});