var EventTarget = function() {
	Object.defineProperties(this, {
		__listeners: {
			value: {}
		}
	});
};

Object.defineProperties(EventTarget.prototype, {
	addListener: {
		value: function(type, handler) {
			if (typeof this.__listeners[type] === "undefined") {
				this.__listeners[type] = [];
			}
			this.__listeners[type].push(handler);
		},
		enumerable: true
	},
	removeListener: {
		value: function(type, handler) {
			var listeners = this.__listeners[type];
			if (typeof listeners === "undefined") {
				return;
			}
			for (var i = 0, len = listeners.length; i < len; i++) {
				if (listeners[i] === handler) {
					listeners.splice(i, 1);
				}
			}
		},
		enumerable: true
	},
	__fire: {
		value: function(eventObj) {
			if (typeof eventObj.type === "undefined") {
				throw new Error("Event object needs type");
			}

			if (typeof eventObj.target === "undefined") {
				eventObj.target = this;
			}
			var listeners = this.__listeners[eventObj.type];

			if (typeof listeners === "undefined") {
				return;
			}
			for (var i = 0, len = listeners.length; i < len; i++) {
				listeners[i].call(this, eventObj);
			}
		}
	}
});