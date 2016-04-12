var globalTemplateGrid = "{0}";//contem o grid html em sua forma final depois de renderizar
var globalTemplateTags = new Array;//armazena as tags que o grid poderá usar
var globalTempTextHTML = new Array;//Contem o html de um object com id
	globalTemplateTags[0] = "<table {0} >{1}</table>";
	globalTemplateTags[1] = "<caption {0} >{1}</caption>";
	globalTemplateTags[2] = "<thead {0} >{1}</thead>";
	globalTemplateTags[3] = "<tbody {0} >{1}</tbody>";
	globalTemplateTags[4] = "<tfoot {0} >{1}</tfoot>";
	globalTemplateTags[5] = "<th {0} >{1}</th>";
	globalTemplateTags[6] = "<tr {0} >{1}</tr>";
	globalTemplateTags[7] = "<td {0} >{1}</td>";
	
var globalPropertyTags = new Array;	
	globalPropertyTags[globalPropertyTags.length] = "onclick";
	globalPropertyTags[globalPropertyTags.length] = "style";
	globalPropertyTags[globalPropertyTags.length] = "title";
	
var globalPropertyTagsMaster = new Array;
	globalPropertyTagsMaster[globalPropertyTagsMaster.length] = "MasterOnclick";
	globalPropertyTagsMaster[globalPropertyTagsMaster.length] = "MasterStyle";

var globalSplit = "⁞";
//Inicia a criaçaõ do Grid
//gridID = id do elemento grid HTML
//startIndex = indice da array que irá iniciar 
//listName = nome da lista de valores
function CreateNiceGrid(gridID,startIndex,listName){	//start functions	setCookie(index,1);
	
	//Roll's
	addGridRollBack(gridID);
	addTemplateGrid(gridID);
	
	gridRollBack(gridID);
	
	var niceGridPro;	var niceElement = document.gBI(NiceId);
	
	niceGridPro += createHeaderNiceGrid(niceElement);
}

//funcções de criaçao
function createHeaderNiceGrid(niceElement){	var retorno = "";
	
	var collectionMHeaders = new niceElement.gBT("MasterHeader");
  	if(collectionMHeaders.length > 0){
	   retorno += createNiceTHeader(collectionMHeaders);
	}else{
	   retorno += "<thead>";
	   retorno += createNiceHeader(niceElement)
	   retorno += "</thead>";
	}
	
	delete collectionMHeaders;
	
	return retorno;
}
function createNiceTHeader(colletionMHeaders){	var retorno = "";
	var length = colletionMHeaders.length;
	var x = 0;
	
	while(x < length){
		var tempLeght = globalPropertyTagsMaster.length;		var colletiontemp = colletionMHeaders[x];
		var auxConcatAtr = "";
		var contentProperty = "";
		var y = 0;
		
		while( y < tempLeght){
				contentProperty = gRA(colletiontemp,globalPropertyTagsMaster[y],"");
			  if(contentProperty !== ""){
					auxConcatAtr += globalPropertyTagsMaster[y] + "=\"" + contentProperty + "\" ";
				}
				y++;
			}
			
		retorno += "<thead ";
		retorno += auxConcatAtr;
		retorno += " >";
		retorno += createNiceHeader(niceElement);
		retorno += "</thead>";
		x++;	
	
	}
	
	return retorno;
}
function createNiceHeader(niceElement) {	var retorno = "";
	var colletionHeaders = new niceElement.gBT("header");
	var length = colletionHeaders.length;
	var x = 0;
	
	while(x < length){
		var tempLeght = globalPropertyTags.length;		var colletiontemp = colletionHeaders[x];
		var auxConcatAtr = "";
		var contentProperty = "";
		var y = 0;
		
			while( y < tempLeght){
				contentProperty = gRA(colletiontemp,globalPropertyTags[y],"");
				if(contentProperty !== ""){
					auxConcatAtr += globalPropertyTags[y] + "=\"" + contentProperty + "\" ";
				}
				y++;
			}
			
		retorno += "<th ";
		retorno += auxConcatAtr;
		retorno += " >";
		retorno += gRA(colletiontemp, "title", "");
		retorno += "</th>";
		x++;
	}
	
	delete colletionHeaders;
		return retorno;
}

//precisa de um funcção especifica para criar relatorios

//funções especificas
function getArrayIndexToFieldName(array,field,coll){	var indexContent = 0;
	var length	   = array.length;
		while (indexContent < length) {		if (array[indexContent][coll] === value) {			return indexContent;			break;		}		indexContent++;	}
	return indexContent;
}
function addNewPropertyTag(ptagName){
   globalPropertyTags[globalPropertyTags.length] = ptagName;
}
function addNewMasterPropertyTag(ptagName){
   globalPropertyTagsMaster[globalPropertyTagsMaster.length] = ptagName;
}

//funções de armazenamento de rollback's
function gridRollBack(gridID){
	document.gBI(gridID).innerHTML = htmlRollBack(gridID);
}
function addGridRollBack(gridID){
	for(var x = 0; x < globalTempTextHTML.length;x++){		if(globalTempTextHTML[x][0] === gridID){			return false;		}	}
   	globalTempTextHTML[globalTempTextHTML.length] = [gridID, document.gBI(gridID).innerHTML];
}
function htmlRollBack(gridID){	return globalTempTextHTML[getArrayIndexToFieldName(globalTempTextHTML,gridID,0)][1];
}
function addTemplateGrid(gridID){	var TempTagId = "";
		for(var x = 0; x < globalTempTextHTML.length;x++){		if(globalTempTextHTML[x][0] === gridID){			return false;		}	}
		var GridDocHTML = document.gBI(gridID).gBT("template");	 	for (x = 0; x < GridDocHTML.length; x++) {
		TempTagId = gRA(GridDocHTML[x],id,"");  		globalTempTextHTML[globalTempTextHTML.length] = [TempTagId,GridDocHTML[x].innerHTML];	}
}
//funcções nativas customizadas 
function gRA(element, attribute, defaultValue) {	var retorno = element.getAttribute(attribute);	if (retorno === null) { return defaultValue; }	return retorno;
}

//funções nativas, com redução de caracteres pois mimificadores não reduzem elas
function gBI(object,stringId){
	return object.getElementById(stringName);
}
function gBT(object,tagName){
	return object.getElementsByTagName(tagName);
}
//rep passando objeto e mais rápido
function rep(ValContRep,ValForRep,ValToRep){	return ValContRep.toString().replace(ValForRep,ValToRep);
}
function spl(object,delemiter,index){
	return object.split(delemiter)[index];
}

String.prototype.rep = function (StrFormatVal,ValToRep){
	return this.replace(StrFormatVal,ValToRep);
}
Object.prototype.gBT = function (tagName){
	return this.getElementsByTagName(tagName);
}
Object.prototype.gBI = function (stringName){
	return this.getElementById(stringName);
}

//função de cookies do grid
function setCookie(cvalue, exdays) {	var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));	var expires = "expires="+d.toUTCString();	this.document.cookie = location.href + "=" + cvalue + "; " + expires;
}
function gridCookie() {	var name =  location.href + "=";	var ca = this.document.cookie.split(';');	for(var i=0; i<ca.length; i++) {		var c = ca[i];		while (c.charAt(0)==' ') c = c.substring(1);		if (c.indexOf(name) == 0) return Number(c.substring(name.length, c.length));	}	return Number("0");
}
