$(function() {
	var pragma_values = "";
	
	for (var key in localStorage) {
  	if ( key.match(/^dataPragma\d+/) {
  		pragma_values = pragma_values + " " + values;
  	}
	}

	pragma_values = $.trim(pragma_values);

	if ( pragma_values.length > 0 ) {
		chrome.webRequest.onBeforeSendHeaders.addListener(
			function(info) {
				newheader = [{name:'Pragma', value: pragma_values}]; 		
				console.log("URL: " + info.url);    
				info.requestHeaders.push.apply(info.requestHeaders,newheader); 

				for(var i in info.requestHeaders) {         
					for ( var key in info.requestHeaders[i] ) {            
						console.log("header "+i+" ["+key+"] "+info.requestHeaders[i][key]);    
					}   
				}
					
				return {requestHeaders: info.requestHeaders};   
			}
			, 
			{urls: ["<all_urls>"]},   
			["blocking", "requestHeaders"]);
	}

});