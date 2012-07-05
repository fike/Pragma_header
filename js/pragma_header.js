function PragmaHeader() {	
	var values = this.getStoredValues();

	if ( values.length > 0 ) {
		for ( var item in values ) {
			this.addCommand(values[item]);
		}		
	} else {
		this.addCommand("");
	}	
};

PragmaHeader.prototype.getStoredValues = function() {
	var values = [];
	for ( var key in localStorage ) {		
  	if ( key.match(/^dataPragma\d+/) ) {
  		values.push(localStorage.getItem(key));  		  		
  	}
	}

	console.log("Stored pragma values: " + values);
	
	return values;	
};

PragmaHeader.prototype.addCommand = function(value) {	
	var index = $(":text").length;

	var fieldset = $('fieldset');
	var controlGroup = $("<div>").addClass("control-group");
	var label = $("<label>").addClass("control-label")
													.attr("for", "pragma_" + index)
													.html("Value");

	var controls = $("<div>").addClass("controls");
	var input = $("<input>").addClass("text_field")
													.attr("id", "pragma_" + index)
													.attr("name", "pragma_" + index)
													// .attr("size", "20")
													.attr("type", "text")
													.attr('value', value);

	controlGroup.appendTo(fieldset);
	label.appendTo(controlGroup);
	controls.appendTo(controlGroup);
	input.appendTo(controls);	
};

PragmaHeader.prototype.saveCommand = function() {
	var inputs = $(":text");
	var pragmas = [];
	this.resetLocalStorage();
	
	var index = 0;
	for ( var i = 0, length = inputs.length; i < length; i++ ) {
		var input = inputs[i];		

		// var value = value.replace(/^\s+|\s+$/g, "");
		var value = $.trim(input.value); 		

		if ( value !== "" ) {
			var subvalues = value.split(" ");
			for ( var item in subvalues ) {				
				localStorage.setItem("dataPragma"+index, subvalues[item]);			
				pragmas.push(subvalues[item]);
				console.log("Saved: " + subvalues[item]);
				index += 1;
			}			
		}	
	}

	alert("Values saved: " + pragmas + "\n\nRestart your browser.");
};

PragmaHeader.prototype.removeAllFields = function() {
	var fieldset = $('fieldset .control-group');
	fieldset.remove();
};

PragmaHeader.prototype.resetCommand = function() {	
	this.removeAllFields();
	this.resetLocalStorage();
	this.addCommand("");
};

PragmaHeader.prototype.resetLocalStorage = function() {
	var keys = [];
	for ( var key in localStorage ) {		
  	if ( key.match(/^dataPragma\d+/) ) {
			keys.push(key);
		}
	}

	for ( var item in keys ) {
		localStorage.removeItem(keys[item]);		
	}

	console.log("Removed values: " + keys.length);
};

// Bindings
$(function() {
	var pragmaHeader = new PragmaHeader();

	$('#add').click(function() {
		pragmaHeader.addCommand();
	});

	$('form').submit(function() {
		pragmaHeader.saveCommand();
		return false;
	});

	$('#reset').click(function() {
		pragmaHeader.resetCommand();
	});
});