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
	this.list = new Array();
}
ItemRegister.prototype.saveData = function()
{	
	//x[count] = new Array();
	var table = document.getElementById(pathID).tBodies[0];
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
var pathID = "datatable";
var count = 0;
function deleteRow()  
{	
	var table = document.getElementById(pathID).tBodies[0];
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
	var table = document.getElementById(pathID).tBodies[0];
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	
	
	item.saveData();
	//item.printItems();
	count++;
	
	
	var cell1 = row.insertCell(0);
	var element1 = document.createElement("input");
	element1.type = "text";
	element1.name = "ID";
	element1.id = "id" + count;
	element1.size = "10";
	cell1.appendChild(element1);
	
	var cell2 = row.insertCell(1);
	var element2 = document.createElement("input");
	element2.type = "text";
	element2.name = "name";
	element2.id = "name" + count;
	element2.size = "20";
	cell2.appendChild(element2);
	
	var cell3 = row.insertCell(2);
	var element3 = document.createElement("input");
	element3.type = "text";
	element3.name = "description";
	element3.id = "description" + count;
	element3.size = "30";
	cell3.appendChild(element3);
	
	var cell4 = row.insertCell(3);
	var element4 = document.createElement("input");
	element4.type = "text";
	element4.name = "price";
	element4.id = "price" + count;
	element4.size = "10";
	cell4.appendChild(element4);
	
	var cell5 = row.insertCell(4);
	var element5 = document.createElement("input");
	element5.type = "text";
	element5.id = "valid" + count;
	element5.name = "valid to";
	element5.size = "10";
	cell5.appendChild(element5);
	
	var cell6 = row.insertCell(5);
	var element6 = document.createElement("select");
	element6.name = "categories";
	element6.id = "cat" + count;
	
	var opt1 = document.createElement("option");
	opt1.value = "no category";
	opt1.text = "No category selected";
	opt1.selected = true;
	
	var opt2 = document.createElement("option");
	opt2.value = "fruits";
	opt2.text = "Fruits";
				
	var opt3 = document.createElement("option");
	opt3.value = "vegetables";
	opt3.text = "Vegetables";
	
	var opt4 = document.createElement("option");
	opt4.value = "sweets";
	opt4.text = "Sweets";
	
	var opt5 = document.createElement("option");
	opt5.value = "others";
	opt5.text = "Others";
	
	element6.add(opt1, null);
	element6.add(opt2, null);
	element6.add(opt3, null);
	element6.add(opt4, null);
	element6.add(opt5, null);
	
	cell6.appendChild(element6);
	
	var cell7 = row.insertCell(6);
	var element7 = document.createElement("input");
	element7.type = "checkbox";
	element7.name = "chk";
	cell7.appendChild(element7);
}	



/*function printDetails()
{
	var table = document.getElementById(pathID).tBodies[0];
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

