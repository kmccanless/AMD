if (typeof define !== 'function') { var define = require('amdefine')(module) }

define([], function() {
	var cai = cai || {};
	cai.diagnostics = cai.diagnostics || {};

	cai.diagnostics.LogEntry = function () {
		"use strict";
		if (!(this instanceof cai.diagnostics.LogEntry)) {
			return new cai.diagnostics.LogEntry();
		};
	}

	cai.diagnostics.LogEntry.prototype = {
		//move appID to logger?  errorNum? 
		module: "",
		level: "",
		dataTime: undefined,
		applicationId: "",
		message: "",
		error: undefined
	};

	cai.diagnostics.Logger = function (provider) {
		"use strict";
		//support multiple appenders
		if (!(this instanceof cai.diagnostics.Logger)) {
			return new cai.diagnostics.Logger();
		}
		function log(entry, lvl) {
			var temp;
			if (!(entry instanceof cai.diagnostics.LogEntry)) {
				temp = new cai.diagnostics.LogEntry();
				temp.message = entry;
			} else {
				temp = entry;
			}
			temp.level = lvl;
			temp.dateTime = new Date().getTime();
			provider.log(temp);
		}
		this.trace = function (entry) {
			log(entry, "TRACE");
		};
		this.debug = function (entry) {
			log(entry, "DEBUG");
		};
		this.info = function (entry) {
			log(entry, "INFO");
		};
		this.warn = function (entry) {
			log(entry, "WARN");
		};
		this.error = function (entry) {
			log(entry, "ERROR");
		};
		this.fatal = function (entry) {
			log(entry, "FATAL");
		};
	}

	cai.diagnostics.ConsoleLogProvider = function() {
		"use strict";
		if (!(this instanceof cai.diagnostics.ConsoleLogProvider)) {
			return new cai.diagnostics.ConsoleLogProvider();
		}
	}

	cai.diagnostics.ConsoleLogProvider.prototype.log = function (entry) {
		//test for console.log,  test for nulls and format text

		var date = new Date(entry.dateTime).toString();
		var appId = entry.applicationId;
		var module = entry.module;
		var message = entry.message;
		var space = " ";

		var logStr = date + space + appId + space + module + space + message + space;
		if (!(entry.error === undefined)) {
			logStr = logStr + entry.error.name + space + entry.error.message;
		}
		if (typeof console == 'object') {
			switch (entry.level.toUpperCase()) {
				case "TRACE":
					console.trace(logStr);
				case "INFO":
					console.info(logStr);
					break;
				case "WARN":
					console.warn(logStr);
					break;
				case "ERROR":
					console.error(logStr);
					break;
				case "FATAL":
					console.error(logStr);
					break;
				default:
					console.log(logStr);
			}
		}

	}
	
	return cai.diagnostics;
});