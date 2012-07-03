function PragmaHeader() {
	this.pragmas = [''];	
};

PragmaHeader.prototype.addCommand = function() {	
	var fieldset = $('fieldset');
	var controlGroup = $("<div>").addClass("control-group");
	var label = $("<label>").addClass("control-label")
													.attr("for", "pragma_" + this.pragmas.length)
													.html("Value");

	var controls = $("<div>").addClass("controls");
	var input = $("<input>").addClass("text_field")
													.attr("id", "pragma_" + this.pragmas.length)
													.attr("name", "pragma_" + this.pragmas.length)
													.attr("size", "30")
													.attr("type", "text");

	controlGroup.appendTo(fieldset);
	label.appendTo(controlGroup);
	controls.appendTo(controlGroup);
	input.appendTo(controls);	

	this.pragmas.push("");
};

PragmaHeader.prototype.saveCommand = function() {
	var inputs = $(":text");
	this.pragmas = [];
	this.resetLocalStorage();

	var msg = "Values saved! \n";
	for ( var i = 0, length = inputs.length; i < length; i++ ) {
		var input = inputs[i];		

		// var value = value.replace(/^\s+|\s+$/g, "");
		var value = $.trim(input.value); 		

		if ( value !== "" ) {
			localStorage.setItem("dataPragma"+i, value);	
			msg = "\ndataPragma" + i + ": " + value;
		}

		this.pragmas.push(value);
	}

	alert(msg);
};

PragmaHeader.prototype.resetCommand = function() {	
	var fieldset = $('fieldset .control-group');
	fieldset.remove();

	resetLocalStorage();

	this.pragmas = [];
	this.addCommand();
};

PragmaHeader.prototype.resetLocalStorage = function() {
	for ( var i = 0, length = this.pragmas.length; i < length; i++ ) {
		localStorage.removeItem("dataPragma" + i);
	}
};

// Bindings
$(function() {
	var pragmaHeader = new PragmaHeader();

	$('#add').click(function() {
		pragmaHeader.addCommand();
	});

	$('#save').click(function() {
		pragmaHeader.saveCommand();
		return false;
	});

	$('#reset').click(function() {
		pragmaHeader.resetCommand();
	});
});