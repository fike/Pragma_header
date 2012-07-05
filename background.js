/*
 * Copyright (c) 2012 Fernando Ike
 *
 * This extension is free software; you can redistribute it and/or modify
 * it under the GPL 2 License.
 *
 * In no event shall Fernando Ike be liable to any party for direct,
 * indirect, special, incidental, or consequential damages, including lost
 * profits, arising out of the use of this software and its documentation, even
 * if Fernando Ike has been advised of the possibility of such damage.
 * 
 * Fernando Ike specifically disclaims any warranties, including, but not
 * limited to, the implied warranties of merchantability and fitness for a
 * particular purpose. The software provided hereunder is on an "as is" basis,
 * and Fernando Ike has no obligations to provide maintenance, support,
 * updates, enhancements, or modifications.
 */

var All_Pragmas=""
var Pragma
var num
for(var i=0;i<11; i++){
	num = i+1;
	Pragma = localStorage['dataPragma'+num];
	if (Pragma){
		All_Pragmas = All_Pragmas + " " + Pragma;
	}		
}


if(!All_Pragmas){

}
else
{
	chrome.webRequest.onBeforeSendHeaders.addListener(   
	function(info) { newheader = [{name:'Pragma', value: All_Pragmas}]; 		console.log("URL: " + info.url);    
		info.requestHeaders.push.apply(info.requestHeaders,newheader);    
		for(var i in info.requestHeaders) {         
			for (var key in info.requestHeaders[i]){            
				console.log("header "+i+" ["+key+"] "+info.requestHeaders[i][key]);         
		}   }
		return {requestHeaders: info.requestHeaders};   
	},   
	{urls: ["<all_urls>"]},   
	["blocking", "requestHeaders"]);
}

