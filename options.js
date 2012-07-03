function sPragma(){
	var field, num;
	var All_Pragmas=""
    var msgbox = 'Pragmas added:\n\n';
    for(var i=0;i<pragmafields.length;i++){
        field = pragmafields[i];
		num = i+1;
		if (!field.value){

		}
		else
		{ 
			All_Pragmas = All_Pragmas + " " + field.value;
        	localStorage.setItem('dataPragma'+num, field.value);
			msgbox += ' '+field.value+'\n';
		}
    }

    if (!All_Pragmas){
        alert('Entry a value!');
    }else{
   	alert(msgbox);
    }
}



function cPragma(){
	for(var i=0;i<pragmafields.length;i++){
		num = i+1;
		localStorage.removeItem('dataPragma'+num);
	}
	alert('All values deleted');
}


function restoreOptions(){
    window.pragmaform = document.getElementById('PragmaForm');
    window.pragmafields = pragmaform.getElementsByClassName('pragma');
    for(var i=0;i<pragmafields.length;i++){
        pragmafields[i].value = localStorage.getItem('dataPragma'+(i+1));
    }
}
