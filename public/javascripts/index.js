require(["javascripts/cai/cai.diagnostics.js"], function(diag) {
    var logger = new diag.Logger(new diag.ConsoleLogProvider());
	var entry = new diag.LogEntry();
	entry.module = "Tester";

	var logger1 = new diag.Logger(new diag.ConsoleLogProvider());
	var entry1 = new diag.LogEntry();
	entry1.module = "Tester1";

	logger.info("This is just a message.  No entry object here");
   
	logger.trace(entry);
	logger1.trace(entry1);

	logger.info(entry);
	logger1.info(entry1);

	logger.warn(entry);
	logger1.warn(entry1);

	logger.error(entry);
	logger1.error(entry1);

	logger.fatal(entry);
	logger1.fatal(entry1);

	try {
		throw new Error("hypothetical error");
	}
	catch (e) {
		entry.error = e;
		logger.error(entry);
	}


	try {
		throw new Error("another hypothetical error");
	}
	catch (e) {
		entry.error = e;
		logger.error({ applicationId: "12345", module: "none", message: "I need to add an error number to this", error: e });
	}
});