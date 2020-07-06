function do_link2form( objLink , bolDoSubmit, methodName, strSubWinName,strSubWinStyle){
	var tmpBody = document.getElementsByTagName("body");
	var dombody;
	if(tmpBody.length > 0)
		dombody = tmpBody[0];
	else{
		alert("找不到body tag");
		return false;
	}	
	var objLinkForm = document.getElementById( 'tmpLink2Form' );
	if(!objLinkForm){
		objLinkForm = document.createElement("form");
		objLinkForm.id = "tmpLink2Form";
		dombody.appendChild(objLinkForm);
	}
	var strLinkAction = '';
	var strLinkTarget = '';
	
	var objTextarea = '';

	if( objLinkForm ){
		objLinkForm.innerHTML = '';
	}else{
		alert( 'Temporal Form not exists.' );
		return false;
	};

	//--------------------------
	///Ray 11/21/2006
	// TextArea
	
	if(objLink.getAttribute('text_name')){

		objTextarea = document.createElement('textarea');
		objTextarea.name  = objLink.getAttribute('text_name');
		objTextarea.value = objLink.getAttribute('text_value');
		objLinkForm.appendChild(objTextarea);
	}
	
	//--------------------------

	
	var tmpLinkURL = objLink.getAttribute( 'url' );
	var tmpIndex = tmpLinkURL.indexOf( '?' );
	strLinkTarget = objLink.target;
	if( tmpIndex != -1 ){
		strLinkAction = tmpLinkURL.substring( 0, tmpIndex );
		tmpLinkURL = tmpLinkURL.substring( tmpIndex + 1 );
		
		var arrParams = tmpLinkURL.split( '&' );
		var arrIndex;
		var tmpId, tmpValue;
		
		for( arrIndex in arrParams ){
			tmpIndex = arrParams[arrIndex].indexOf( '=' );
			if( tmpIndex != -1 ){
				tmpId = arrParams[arrIndex].substring( 0, tmpIndex );
				tmpValue = arrParams[arrIndex].substring( tmpIndex + 1 );
			}else{
				tmpId = arrParams[arrIndex];
				tmpValue = '';
			};
			var newInput = document.createElement( 'Input' );
			newInput.id = tmpId;
			newInput.name = tmpId;
			newInput.type = 'hidden';
			newInput.value = tmpValue;
			objLinkForm.appendChild( newInput );
		};
	}else{
		strLinkAction = tmpLinkURL;
	};
	var methodType;
	if(methodName)
		methodType = methodName;
	else
		methodType = 'POST';
	objLinkForm.action = strLinkAction;
	objLinkForm.method = methodType;
	objLinkForm.target = strLinkTarget;
	if(bolDoSubmit){
		try{
			if(strSubWinName){
				if(strSubWinName.toUpperCase() != '_BLANK'){
					strSubWinStyle = strSubWinStyle?strSubWinStyle:'';
					window.open(STR_ROOT_URL+"/SubWin.php",strSubWinName,strSubWinStyle);
					objLinkForm.target = strSubWinName;
				}else{
					objLinkForm.target = strSubWinName;
				}
			}
			objLinkForm.submit();
		}catch(e){
			alert("Warning:\n  Browser blocked login action, please add this web site into trust site");
		}
	}
	return false;
};