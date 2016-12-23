var globalTemplateGrid = "{0}";//contem o grid html em sua forma final depois de renderizar
var globalTempTextHTML = new Array;//Contem o html de um object com id
var globalTemplateTags = new Array;//armazena as tags que o grid poderá usar
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
	
var globalPropertyTagsHeader = new Array;
	globalPropertyTagsHeader[globalPropertyTagsHeader.length] = "Headeronclick";
	globalPropertyTagsHeader[globalPropertyTagsHeader.length] = "Headerstyle";

var globalPropertyTagsRows = new Array;
	globalPropertyTagsRows[globalPropertyTagsRows.length] = "Rowsonclick";
	globalPropertyTagsRows[globalPropertyTagsRows.length] = "Rowsstyle";

var globalPropertyTagsFoot = new Array;
	globalPropertyTagsFoot[globalPropertyTagsFoot.length] = "Footonclick";
	globalPropertyTagsFoot[globalPropertyTagsFoot.length] = "Footstyle";
	
var globalSplit = "⁞";
var filterDb = new Array;
//Inicia a criaçaõ do Grid
//gridID = id do elemento grid HTML
//startIndex = indice da array que irá iniciar 
//listName = nome da lista de valores
function createNiceGrid(gridID,startIndex,listName){
	//start functions
	setCookie(startIndex,1);
	
	//Roll's
	addGridRollBack(gridID);
	addTemplateGrid(gridID);
	
	gridRollBack(gridID);
	
	var niceGridPro = "";
	var niceElement = document.gBI(gridID);
	var rowview = gRA(niceElement,"RowView","10");
	
	niceGridPro  = createHeaderNiceGrid(niceElement);
	niceGridPro += createFieldDataNiceGrid(niceElement,startIndex,rowview,window[listName]);
	niceGridPro += createFootNiceGrid(niceElement,gridID,startIndex,listName,"createNiceGrid");
	niceGridPro  = createTableNiceGrid(niceElement,niceGridPro);

	niceElement.innerHTML = niceGridPro;
}
function createFilterNiceGrid(gridID,startIndex,listName){
    //Roll's
	addGridRollBack(gridID);
	addTemplateGrid(gridID);
	
	gridRollBack(gridID);
	
	var niceGridPro = "";
	var niceElement = document.gBI(gridID);
	var rowview = gRA(niceElement,"RowView","10");
	
	niceGridPro  = createHeaderNiceGrid(niceElement);
	niceGridPro += createFieldDataNiceGrid(niceElement,startIndex,rowview,window[listName]);
	niceGridPro += createFootNiceGrid(niceElement,gridID,startIndex,listName,"createFilterNiceGrid");
	niceGridPro  = createTableNiceGrid(niceElement,niceGridPro);

	niceElement.innerHTML = niceGridPro;
}
//funcções de criaçao
//Table
function createTableNiceGrid(niceElement,contentTable){
	var retorno = "";

	var tempLeght = globalPropertyTags.length;
	var auxConcatAtr = "";
	var contentProperty = "";
	var y = 0;
	
	while( y < tempLeght){
		contentProperty = gRA(niceElement,globalPropertyTags[y],"");
		if(contentProperty !== ""){
			auxConcatAtr += globalPropertyTags[y] + "=\"" + contentProperty + "\" ";
		}y++;
	}
		
	retorno = "<table "+ auxConcatAtr +" >"+ contentTable +"</table>";
	return retorno;
}
//Headers
function createHeaderNiceGrid(niceElement){	
	var retorno = "";
	var collectionMHeaders = new gBT(niceElement,"MasterHeader");
  	if(collectionMHeaders.length > 0){
	   retorno += createNiceTHeader(collectionMHeaders);
	}else{
	   retorno += "<thead>";
	   retorno += createNiceHeader(niceElement);
	   retorno += "</thead>";
	}
	
	delete collectionMHeaders;
	
	return retorno;
}
function createNiceTHeader(niceElement){
	var retorno = "";
	var length = niceElement.length;
	var x = 0;
	
	while(x < length){
		var tempLeght = globalPropertyTagsHeader.length;
		var colletiontemp = niceElement[x];
		var auxConcatAtr = "";
		var contentProperty = "";
		var y = 0;
		
		while( y < tempLeght){
				contentProperty = gRA(colletiontemp,globalPropertyTagsHeader[y],"");
			  if(contentProperty !== ""){
					auxConcatAtr += globalPropertyTagsHeader[y] + "=\"" + contentProperty + "\" ";
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
function createNiceHeader(niceElement) {
	var retorno = "";
	var colletionHeaders = new gBT(niceElement,"header");
	var length = colletionHeaders.length;
	var x = 0;
	
	while(x < length){
		var tempLeght = globalPropertyTagsHeader.length;
		var colletiontemp = colletionHeaders[x];
		var auxConcatAtr = "";
		var contentProperty = "";
		var y = 0;
		
		while( y < tempLeght){
			contentProperty = gRA(colletiontemp,globalPropertyTagsHeader[y],"");
			if(contentProperty !== ""){
				auxConcatAtr += globalPropertyTagsHeader[y].rep("Header","") + "=\"" + contentProperty + "\" ";
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
//Body
function createFieldDataNiceGrid(niceElement,index,rowview,collection){
	var retorno = "";
	var collHeaders = new gBT(niceElement,"header");
	var stringPropertyMasterRow = getAllsPropertyCustom(niceElement.gBT("MasterRow")[0],"Rows",globalPropertyTagsRows);
	var loopLength = (Number(rowview) + index);
		loopLength = (loopLength > collection.length ? collection.length : loopLength);
	    
	while (index < loopLength) {
		var hdindex = 0;
		var StringTdCollection = "";
		var collectioLength = collHeaders.length;
		
		while (hdindex < collectioLength) {
			if (collection[index][0] !== "") {
                var typeField = gRA(collHeaders[hdindex], "type", "normal");

                switch (typeField) {
                    case "normal":{
						var fieldname = gRA(collHeaders[hdindex], "fieldname", "");
							StringTdCollection += createNormalField(fieldname,getAllsProperty(collHeaders[hdindex]),collection[index]);
							hdindex++;
                        }break;
                    case "template": {
                        var strTemplate = collHeaders[hdindex].innerHTML;
                            StringTdCollection += createTemplateField(strTemplate,getAllsProperty(collHeaders[hdindex]),collection[index]);
                            hdindex++;
                    }break;
                    case "expressao":{
                        var StrExp = gRA(collHeaders[hdindex], "exp", "").toString().split(',');
                        var strTemplate = collHeaders[hdindex].innerHTML;
							StringTdCollection += createExpField(strTemplate,getAllsProperty(collHeaders[hdindex]),collection[index],StrExp);
							hdindex++;
                    }break;
					default:{hdindex++;}break;
                }
            }
		}
		retorno += "<tr "+ replaceFiledNameForValues(stringPropertyMasterRow,collection[index]) +" >"+StringTdCollection+"</tr>";
		index++;
	}
	
	delete collHeaders;
	return retorno;
}
function createExpField(strTemplate,property,coll,expColl){
	var retorno = "";
	var stringFormat = "<td "+ property +" >"+ replaceExpForValues(strTemplate,coll,expColl) +"</td>";
		retorno = stringFormat;
		
	return retorno;
}
function createNormalField(fieldname,attributes,coll){
	var retorno = "";
	var stringFormat = "<td "+ attributes +" >{"+ fieldname +"}</td>";
		retorno = replaceFiledNameForValues(stringFormat,coll);
		
	return retorno;
}
function createTemplateField(stringFormat,attributes,coll){
	var retorno = "";
	    retorno = "<td "+ attributes +" >"+ replaceFiledNameForValues(stringFormat,coll) +"</td>";

	return retorno;
}
//Footer
function createFootNiceGrid(niceElement,gridID,startIndex,listName,callFunction){
	var retorno = "<tfoot {0} ><td {1} >{2} {3} {4}</td></tfoot>";
	var rowView = Number(gRA(niceElement,"RowView","10"));
	var completCallGrid = "";
	var callGridTemplate = callFunction +"(\"{0}\",{1},\"{2}\")";
	var leftRow = "<a class='pagesselector icon-to-start-alt' onclick='{1}' ></a><a class='pagesselector' onclick='{0}' >◄</a>";
	var rightRow = "<a id='page_next'  class='pagesselector' onclick='{0}' >►</a><a class='pagesselector icon-to-end-alt' onclick='{1}' ></a>";
	var indicator = "{0} - {1}";
	var colspan = "colspan='{0}'";
	var next = startIndex + rowView; 
	var back = startIndex - rowView;
	var lastPage = window[listName].length - rowView;
	var pageIndex = Math.round(gridCookieIndex() / rowView);
	
		
		back = back < 0? 0 : back;
	    colspan = rep(colspan,"{0}", gBT(niceElement,"header").length);
		lastPage = lastPage < 0? 0 : lastPage;
		next = (next + 1) > window[listName].length? lastPage : next;
		
	    completCallGrid = rep(callGridTemplate,"{0}",gridID);
        completCallGrid = rep(completCallGrid,"{1}",back);
		completCallGrid = rep(completCallGrid,"{2}",listName);
		
		leftRow = rep(leftRow,"{0}",completCallGrid);
		
		completCallGrid = rep(callGridTemplate,"{0}",gridID);
        completCallGrid = rep(completCallGrid,"{1}",'0');
		completCallGrid = rep(completCallGrid,"{2}",listName);
		
		leftRow = rep(leftRow,"{1}",completCallGrid);
		
		completCallGrid = rep(callGridTemplate,"{0}",gridID);
        completCallGrid = rep(completCallGrid,"{1}",next);
		completCallGrid = rep(completCallGrid,"{2}",listName);
		
		rightRow = rep(rightRow,"{0}",completCallGrid);
		
		completCallGrid = rep(callGridTemplate,"{0}",gridID);
        completCallGrid = rep(completCallGrid,"{1}",lastPage);
		completCallGrid = rep(completCallGrid,"{2}",listName);
		
		rightRow = rep(rightRow,"{1}",completCallGrid);

		indicator = (pageIndex + 1) +" - "+Math.round(window[listName].length / rowView);
		
		retorno = rep(retorno,"{1}",colspan);
		retorno = rep(retorno,"{2}",leftRow);
		retorno = rep(retorno,"{3}",indicator);
		retorno = rep(retorno,"{4}",rightRow);

	return retorno;
}
//filter 
function filterGrid(gridID,listName,coll,ObjectValue,type) {

    if (this.filterDb[addFilterGrid(gridID,listName)].length <= 0) {
        this.filterDb[addFilterGrid(gridID,listName)] = new Array(window[listName])[0];
    } else {
        window[listName] = new Array(this.filterDb[addFilterGrid(gridID,listName)][1])[0];
    }
    
    switch (type){
        //se contem informaçao
        case 1:{window[listName] = window[listName].filter(function(object){return object[coll].split('⁞')[1].toString().toUpperCase().indexOf(ObjectValue.toString().toUpperCase()) >= 0;});}break;
        //igual a informação
        case 2:{window[listName] = window[listName].filter(function(object){return object[coll].split('⁞')[1].toString().toUpperCase() === ObjectValue.toString().toUpperCase();});}break;
        //retorna todos novamente
        case 3:{window[listName] = window[listName].filter(function(object){return true;});}break;
		//maior que e menor que somente numericos
		case 4:{window[listName] = window[listName].filter(function(object){var filcontent = ObjectValue.split(',');return Number(object[coll].split('⁞')[1]) > Number(filcontent[0]) && Number(object[coll].split('⁞')[1]) < Number(filcontent[1]);});}break;
		//maior e igual e menor e igual que, somente numeros
		case 5:{window[listName] = window[listName].filter(function(object){var filcontent = ObjectValue.split(',');return Number(object[coll].split('⁞')[1]) >= Number(filcontent[0]) && Number(object[coll].split('⁞')[1]) <= Number(filcontent[1]);});}break;
		//maior igual que
		case 6:{window[listName] = window[listName].filter(function(object){var filcontent = ObjectValue.split(',');return Number(object[coll].split('⁞')[1]) >= Number(filcontent[0]);});}break;
    }
    
    createFilterNiceGrid(gridID, 0, listName);
}
function filArr(dbColl,coll,ObjectValue,type) {
    switch (type){
        //se contem informaçao
        case 1:{dbColl = dbColl.filter(function(object){return object[coll].split('⁞')[1].toString().toUpperCase().indexOf(ObjectValue.toString().toUpperCase()) >= 0;});}break;
        //igual a informação
        case 2:{dbColl = dbColl.filter(function(object){
			return object[coll].split('⁞')[1].toString().toUpperCase() === ObjectValue.toString().toUpperCase();});}break;
        //retorna todos novamente
        case 3:{dbColl = dbColl.filter(function(object){return true;});}break;
		//maior que e menor que somente numericos
		case 4:{dbColl = dbColl.filter(function(object){var filcontent = ObjectValue.split(',');return Number(object[coll].split('⁞')[1]) > Number(filcontent[0]) && Number(object[coll].split('⁞')[1]) < Number(filcontent[1]);});}break;
		//maior e igual e menor e igual que, somente numeros
		case 5:{dbColl = dbColl.filter(function(object){var filcontent = ObjectValue.split(',');return Number(object[coll].split('⁞')[1]) >= Number(filcontent[0]) && Number(object[coll].split('⁞')[1]) <= Number(filcontent[1]);});}break;
		//maior igual que
		case 6:{dbColl = dbColl.filter(function(object){var filcontent = ObjectValue.split(',');return Number(object[coll].split('⁞')[1]) >= Number(filcontent[0]);});}break;
		
    }
    
    return dbColl;
}
function filArrFast(dbColl,coll,nameColl,ObjectValue,type) {
	
    switch (type){
        //se contem informaçao
        case 1:{dbColl = dbColl.filter(function(object){return object[coll].split('⁞')[1].toString().toUpperCase().indexOf(ObjectValue.toString().toUpperCase()) >= 0;});}break;
        //igual a informação
        case 2:{
			    var rightValueEqual = (nameColl + ObjectValue).toUpperCase();
			    dbColl = dbColl.filter(function(object){
										return object[coll].toUpperCase() === rightValueEqual;
									   });
			   }break;
        //retorna todos novamente
        case 3:{dbColl = dbColl.filter(function(object){return true;});}break;
		//maior que e menor que somente numericos
		case 4:{
			    var rightFilter1 = Number(ObjectValue.split(',')[0]);
				var rightFilter2 = Number(ObjectValue.split(',')[1]);
				
			    dbColl = dbColl.filter(function(object){
										 var leftValueEqual = Number(object[coll].split('⁞')[1]);
										 return result = leftValueEqual > rightFilter1 && leftValueEqual < rightFilter2});
			   }break;
		//maior e igual e menor e igual que, somente numeros
		case 5:{dbColl = dbColl.filter(function(object){var filcontent = ObjectValue.split(',');return Number(object[coll].split('⁞')[1]) >= Number(filcontent[0]) && Number(object[coll].split('⁞')[1]) <= Number(filcontent[1]);});}break;
		//maior igual que
		case 6:{dbColl = dbColl.filter(function(object){var filcontent = ObjectValue.split(',');return Number(object[coll].split('⁞')[1]) >= Number(filcontent[0]);});}break;
		
    }
    
    return dbColl;
}
//chamada de template 
function callTemplateRow(gridID,templateID,listName,object) {
	
	createNiceGrid(gridID, gridCookieIndex(), listName);
	
    var countHeaders = document.gBI('NiceGrid').gBT('table')[0].gBT('th').length;
    var doc = document.gBI(gridID);
    var table = doc.gBT('tbody');
	var dbIndex = Math.round(gridCookieIndex() / object.parentNode.parentNode.rowIndex);

    var newRow = table[0].insertRow((object.parentNode.parentNode.rowIndex));
    var newCell = newRow.insertCell(0);
	    
        newCell.innerHTML = replaceFiledNameForValues(htmlRollBack(templateID), window[listName][dbIndex]);
        newCell.colSpan = countHeaders;
}

//precisa de um funcção especifica para criar relatorios

//funções especificas
function replaceExpForValues(stringForReplace,collection,expcollection){
     var index = 0;
     var stringForReplace = replaceFiledNameForValues(stringForReplace,collection);

     while (index < expcollection.length) {
         if (expcollection[index].indexOf(":") > -1) {
              var fieldnameD = "[" + expcollection[index].split(":")[0] + "]";
              var fieldValue = expcollection[index].split(":")[1];

              while (stringForReplace.indexOf(fieldnameD) > -1) {
					 stringForReplace = stringForReplace.replace(fieldnameD, fieldValue);
            }
         }
         index++;
     }
         
    return stringForReplace;    
}
function replaceFiledNameForValues(stringForReplace,collection) {
    var index = 0;

    while (index < collection.length) {
        if (collection[index].indexOf(globalSplit) > -1) {
            var fieldnameD = "{" + collection[index].split(globalSplit)[0] + "}";
            var fieldValue = collection[index].split(globalSplit)[1];
            var fieldnameN = "{[" + collection[index].split(globalSplit)[0] + "]}";

            while (stringForReplace.indexOf(fieldnameD) > -1) {
                stringForReplace = stringForReplace.replace(fieldnameD, fieldValue);
            }
            
            while (stringForReplace.indexOf(fieldnameN) > -1) {
                stringForReplace = stringForReplace.replace(fieldnameN, fieldnameD);
            }
        }
        index++;
    }

    return stringForReplace;
}
function getArrayIndexToFieldName(array,field,coll){
	var indexContent = 0;
	var length = array.length;
		while (indexContent < length) {
		if (array[indexContent][coll] === field) {
		return indexContent;
		break;
		}
		indexContent++;	}
	return indexContent;
}
function addNewPropertyTag(ptagName){
	globalPropertyTags[globalPropertyTags.length] = ptagName;
}
function addNewMasterPropertyTag(ptagName){
	globalPropertyTagsHeader[globalPropertyTagsHeader.length] = ptagName;
}
function getAllsPropertyCustom(niceElement,propertyPrefix,propertyColletiob){
	var retorno = "";

	var tempLeght = propertyColletiob.length;
	var contentProperty = "";
	var y = 0;
	
	while( y < tempLeght){
		contentProperty = gRA(niceElement,propertyColletiob[y],"");
		if(contentProperty !== ""){
			retorno += propertyColletiob[y].replace(propertyPrefix,"") + "=\"" + contentProperty + "\" ";
		}y++;
	}
		
	return retorno;
}
function getAllsProperty(niceElement){
	var retorno = "";

	var tempLeght = globalPropertyTags.length;
	var contentProperty = "";
	var y = 0;
	
	while( y < tempLeght){
		contentProperty = gRA(niceElement,globalPropertyTags[y],"");
		if(contentProperty !== ""){
			retorno += globalPropertyTags[y] + "=\"" + contentProperty + "\" ";
		}y++;
	}
		
	return retorno;
}

//funções de armazenamento de rollback's
function gridRollBack(gridID){
	document.gBI(gridID).innerHTML = htmlRollBack(gridID);
}
function addGridRollBack(gridID){
	for(var x = 0; x < globalTempTextHTML.length;x++){
		if(globalTempTextHTML[x][0] === gridID){
			return false;
		}
	}
	globalTempTextHTML[globalTempTextHTML.length] = [gridID, document.gBI(gridID).innerHTML];
}
function htmlRollBack(gridID){
	return globalTempTextHTML[getArrayIndexToFieldName(globalTempTextHTML,gridID,0)][1];
}
function addTemplateGrid(gridID){
	var TempTagId = "";	
	var GridDocHTML = document.gBI(gridID).gBT("template");
	
	for (x = 0; x < GridDocHTML.length; x++) {
		TempTagId = gRA(GridDocHTML[x],"id","");
		for(var y = 0; y < globalTempTextHTML.length;y++){
			if(globalTempTextHTML[y][0] !== TempTagId){
				globalTempTextHTML[globalTempTextHTML.length] = [TempTagId,GridDocHTML[x].innerHTML];
			}		
		}
	}	
}
function addFilterGrid(gridId,listName){
    for(var x = 0; x < filterDb.length;x++){
        if(filterDb[x][0] === gridId){
            return x;
        }
    }
    
    filterDb[filterDb.length] = [gridId, window[listName]];
    
    return (filterDb.length - 1);
}
//funcções nativas customizadas 
function gRA(element, attribute, defaultValue) {
	var retorno = element.getAttribute(attribute);
	if (retorno === null) { return defaultValue; }
	return retorno;
}

//funções nativas, com redução de caracteres pois mimificadores não reduzem elas
function gBI(object,stringId){
	return object.getElementById(stringName);
}
function gBT(object,tagName){
	return object.getElementsByTagName(tagName);
}
//rep passando objeto e mais rápido
function rep(ValContRep,ValForRep,ValToRep){
	return ValContRep.toString().replace(ValForRep,ValToRep);
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
function setCookie(cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));	
	var expires = "expires="+d.toUTCString();
	this.document.cookie = location.href + "=" + cvalue + "; " + expires;
}
function gridCookieIndex() {	
	var name =  location.href + "=";
	var ca = this.document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') 
			c = c.substring(1);
		if (c.indexOf(name) == 0) 
			return Number(c.substring(name.length, c.length));
	}return Number("0");
}

function testeObject(object){
	var tempObjectForText = object;
}
