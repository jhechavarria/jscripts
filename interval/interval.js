var Interval = (function() {
	let _log = true;
	let _delay = 10;
	let _callbacks = [];
	let _timeout = false;

	let _parse_callbacks = function()
	{
		var item = null;
		for(var i = 0; i < _callbacks.length; i++)
		{
			item = _callbacks[i];
			if(typeof item == 'object' && item != null)
				if(item.elapsed % item.interval == 0)
					item.callback();
			item.elapsed += _delay;
		}
	};

	let _correct_timeout = function(callback, delay)
	{
		let now = Date.now || function() {return new Date().valueOf();};
		let planned = now() + delay;

		if(typeof callback == 'string')
		{
			let sCallback = callback;
			callback = function()
			{
				eval(sCallback);
			};
		}
		else if(typeof callback != 'function')
			callback = function() {};

		let tick = function()
		{
			callback();
			if (_timeout)
			{
				planned += delay;
				_timeout = setTimeout(tick, planned - now());
			}
		};

		_timeout = setTimeout(tick, delay);
	};

	this.add_callback = function(callback, delay)
	{
		if(callback.constructor === Array)
		{
			for(let k = 0; k < arguments.length; k++)
			{
				if(arguments[k].constructor === Array && arguments[k].length == 2)
					this.add_callback(arguments[k][0], arguments[k][1]);
			}
		}
		else
		{
			if((typeof callback == 'function' || typeof callback == 'string') && delay >= _delay)
			{
				_callbacks.push({
					'interval': delay,
					'elapsed': 0,
					'callback': callback
				});
				if(_log)
					console.log('[Interval] Callback ['+(_callbacks.length - 1)+'] added!');
			}
			else
				if(_log)
					console.log('[Interval] Parameter 1 must be a function or a string. Parameter 2 must be an integer equal or greater than '+_delay+', '+delay+' specified.');
		}
	};

	this.remove_callback = function(index)
	{
		if(index >= 0 && index < _callbacks.length && _callbacks[index] != undefined)
		{
			_callbacks.splice(index, 1);
			if(_log)
				console.log('[Interval] Callback ['+index+'] Removed');
			if (!_callbacks.length)
				this.stop();
		}
		else
			if(_log)
				console.log('[Interval] Callback Not Found At Index ['+index+']');
	};

	this.print_callback = function(index = -1)
	{
		if(index >= 0 && index < _callbacks.length && _callbacks[index] != undefined)
			console.log('[Ibterval] Callback ['+index+']:\n\t'+_callbacks[index].toSource());
		else
			console.log('[Interval] Callback ('+(_callbacks.length - 1)+'):\n\t'+_callbacks.toSource());
	};

	this.start = function()
	{
		if(!_callbacks.length)
		{
			if(_log)
				console.log('[Interval] Start Aborted, No Callback Registered');
			this.stop();
		}
		else if(!_timeout)
		{
			if(_log)
				console.log('[Interval] Loop started');
			_correct_timeout(function()
			{
				_parse_callbacks();
			}, _delay);
		}
		else
			if(_log)
				console.log('[Interval] Loop already Started');
	};

	this.stop = function(reset)
	{
		if(reset == true)
			this.reset();
		if(_timeout != false)
		{
			clearTimeout(_timeout);
			_timeout = false;
			if(_log)
				console.log('[Interval] Loop stopped');
		}
	};

	this.reset = function(include_callbacks)
	{
		this.stop();
		if(include_callbacks == true)
			_callbacks = [];
		_elapsed = 0;
		if(_log)
			console.log('[Interval] Loop reset');
	};

	return this;
})();