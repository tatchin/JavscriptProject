function ItemRegister()
{
	this.id = "Default" ;
	this.name = "Default";
	this.description = "Default";
	this.price = 0.0;
	this.valid = "Default";
	this.category = "Default";
	this.chkbox = "Default";
	this.addItem = 0;
	this.printValue = 0;
}
ItemRegister.prototype.saveData = function()
{	
	//x[count] = new Array();
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	var cellCount = table.rows[0].cells.length;
	var list = this.list;

	this.id = document.getElementById("id" + count).value;
	this.name = document.getElementById("name" + count).value;
	this.description = document.getElementById("description" + count).value;
	this.price = document.getElementById("price" + count).value;
	this.valid = document.getElementById("valid" + count).value;
	var index = document.getElementById("cat" + count).selectedIndex;
	this.chkbox = document.getElementById("cat" + count).options[index].text;
	alert(this.id);
	
	this.list[this.addItem] = new Array();
	this.list[this.addItem][0] = this.id;
	this.list[this.addItem][1] = this.name;
	this.list[this.addItem][2] = this.description;
	this.list[this.addItem][3] = this.price;
	this.list[this.addItem][4] = this.valid;
	this.list[this.addItem][5] = this.chkbox;
	
	//localStorage.list[0]= this.id;
	//this.list[this.addItem+1] = this.name;
	//this.list[this.addItem+2] = this.description;
	//this.list[this.addItem+3] = this.price;
	//this.list[this.addItem+4] = this.valid;
	//this.list[this.addItem+5] = this.category;
	//this.list[this.addItem+6] = this.chkbox;
	
	this.addItem++;
}

/*ItemRegister.prototype.printItems = function()
{
	
	var display = document.getElementById("datatable");
    //var locate = window.location
	//locate = this.list[0]; 
	var list = this.list;
    var tr = document.createElement("tr");
	
	//var html5docs = JSON.parse(localStorage.list);

    var tdText = document.createElement("td");
    tdText.innerHTML = html5docs; 
	alert(this.id);
	//tdText.style.color = color;
    tr.appendChild(tdText);

    var tdAmount = document.createElement("td");
    tdAmount.innerHTML = html5docs; 
	//tdAmount.style.color = color;
    tr.appendChild(tdAmount);

    display.appendChild(tr); 
}*/
var item = new ItemRegister()
var myTable = "datatable";
var count = 0;
function deleteRow()  
{	
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	// var i=1 to start after header
	for(var i=1; i<rowCount; i++) 
	{
		var row = table.rows[i];
		// index of td contain checkbox is 8
		var chkbox = row.cells[6].getElementsByTagName("input")[0];
		if(chkbox != null && chkbox.checked == true)
		{
			if(rowCount <= 2)
			{
				alert("Cannot delete all the rows.");
				break;
			}
			table.deleteRow(i);
			rowCount--;
			i--;
		}
	}
}


function addRow()
{
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	
	
	count++;
	
	if (document.getElementsByName("id")[0].value!="")
	{
	
	var cell1 = row.insertCell(0);
	this.id = document.getElementsByName("id")[0].value;
	cell1.innerHTML = this.id;
	
	
	var cell2 = row.insertCell(1);
	cell2.innerHTML = document.getElementsByName("name")[0].value ;
	
	var cell3 = row.insertCell(2);
	cell3.innerHTML = document.getElementsByName("description")[0].value ;
	var cell4 = row.insertCell(3);
	cell4.innerHTML = document.getElementsByName("price")[0].value ;
	
	var cell5 = row.insertCell(4);
	cell5.innerHTML = document.getElementsByName("valid")[0].value ;
	
	
	var cell6 = row.insertCell(5);
	var index = document.getElementById("cat0").selectedIndex;
	this.chkbox = document.getElementById("cat0").options[index].text;
	cell6.innerHTML = this.chkbox;
	
	var cell7 = row.insertCell(6);
	var element7 = document.createElement("input");
	element7.type = "checkbox";
	element7.name = "chk";
	cell7.appendChild(element7);
	}
	else
	{
		alert("No Item");
	}
}	
function getEdit(myTable)
{
var table = document.getElementById(myTable);
		var rowCount = table.rows.length;
		var chkboxCount = 0;
		for(var i=1; i<rowCount; i++) 
		{
			 var row = table.rows[i];
			 var chkbox = row.cells[0].childNodes[0];
			 if(chkbox != null && chkbox.checked) 
			 {
				 chkboxCount++;
			 }
			 if(chkboxCount != 1)
			 {
				alert("ONE item allowed only!");
			 }
		}
}

function savedit(myTable){
var table = document.getElementById(myTable);
		var rowCount = table.rows.length;
		for(var i=1; i<rowCount; i++) 
		{
			 var row = table.rows[i];
			 var chkbox = row.cells[0].childNodes[0];
			 if(null != chkbox && true == chkbox.checked) {
				 table.rows[i].cells["1"].innerHTML =  document.getElementById("txtname").value ;
				 table.rows[i].cells["2"].innerHTML = document.getElementById("txtauthor").value;
				table.rows[i].cells["3"].innerHTML  =  document.getElementById("txtcdate").value ;
				 //document.getElementById("et1").value = table.rows[i].cells["4"].innerHTML;
				 //document.getElementById("ep1").value = table.rows[i].cells["5"].innerHTML;
				  document.getElementById("txtname").value = '';
				  document.getElementById("txtauthor").value    = '';
				  document.getElementById("txtcdate").value     = '' ;
				  chkbox.checked    = false;
				 document.getElementById("crw").value = i;
			 }
		}
}


/*function printDetails()
{
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	var cellCount = table.rows[0].cells.length;
	alert(x[0][0]);
	for(var i= 1; i < cellCount; i++) 
	{
		var row = table.insertRow(i);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		
		cell1.innerHTML = x[i-1][x]; 
		cell2.innerHTML = x[i-1][x+1];
		cell3.innerHTML = x[i-1][x+2];
		cell4.innerHTML = x[i-1][x+3];
		cell5.innerHTML = x[i-1][x+4];
		cell6.innerHTML = x[i-1][x+5];
	}
}*/

