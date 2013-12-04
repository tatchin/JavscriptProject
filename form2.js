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
		var chkbox = row.cells[7].getElementsByTagName("input")[0];
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

var imgPath = new Array();
function addRow()
{
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	
	
	
	
	if (document.getElementsByName("id")[0].value!="" && document.getElementById("input-file").value != "")
	{
	
	var cell1 = row.insertCell(0);
	cell1.innerHTML = document.getElementsByName("id")[0].value;
	document.getElementsByName("id")[0].value = "";
	
	var cell2 = row.insertCell(1);
	cell2.innerHTML = document.getElementsByName("name")[0].value ;
	document.getElementsByName("name")[0].value = "";
	
	var cell3 = row.insertCell(2);
	var img = document.createElement("img");
	img.id = "image";
	
	img.src = document.getElementById("input-file").files[0].name;
	imgPath[count] = img.src;
	//store image full path in array
	cell3.appendChild(img);
	//make it to be default image
	defaultImage();
	
	var cell4 = row.insertCell(3);
	cell4.innerHTML = document.getElementsByName("description")[0].value;
	document.getElementsByName("description")[0].value = "";
	
	var cell5 = row.insertCell(4);
	cell5.innerHTML = document.getElementsByName("price")[0].value ;
	document.getElementsByName("price")[0].value = "";
	
	var cell6 = row.insertCell(5);
	cell6.innerHTML = document.getElementsByName("valid")[0].value ;
	document.getElementsByName("valid")[0].value = "";
	
	var cell7 = row.insertCell(6);
	var index = document.getElementById("cat").selectedIndex;
	this.chkbox = document.getElementById("cat").options[index].text;
	cell7.innerHTML = this.chkbox;
	document.getElementById("cat").selectedIndex = 0;
	
	var cell7 = row.insertCell(7);
	var element7 = document.createElement("input");
	element7.type = "checkbox";
	element7.name = "chk";
	cell7.appendChild(element7);
	count++;
	}
	else
	{
		alert("Please fill up this form at least ID and Image");
	}
	
}	
function getEdit()
{
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	var chkboxCount = 0;
	var rowPosition = 0;
	
	var id = document.getElementsByName("id")[0];
	var name = document.getElementsByName("name")[0];
	var image = document.getElementById("productImage");
	var description = document.getElementsByName("description")[0];
	var price  = document.getElementsByName("price")[0];
	var valid = document.getElementsByName("valid")[0];
	
	
	var chkbox = false;
	for(var i = 1; i<rowCount; i++) 
	{
		 var row = table.rows[i];
		 chkbox = row.cells[7].getElementsByTagName("input")[0];
		 if(chkbox != null && chkbox.checked) 
		 {
			 chkboxCount++;
			 rowPosition = i;
		 }
	}
	if(chkboxCount != 1)
	{
		alert("Nothing selected OR ONE item allowed only!");
	}
	else
	{
		document.getElementById("publish").style.visibility = "visible";
		document.getElementById("edit").style.visibility = "hidden";
		document.getElementById("add").style.visibility = "hidden";
		document.getElementById("delete").style.visibility = "hidden";
		id.value = table.rows[rowPosition].cells[0].innerHTML;
		name.value = table.rows[rowPosition].cells[1].innerHTML;
		description.value = table.rows[rowPosition].cells[3].innerHTML;
		price.value = table.rows[rowPosition].cells[4].innerHTML;
		valid.value = table.rows[rowPosition].cells[5].innerHTML;
		
		//Get image full path from array 
		var cellImage = imgPath[rowPosition-1];
		//image.src = table.rows[rowPosition].cells[2].imgPath(count-1);
		image.src = cellImage;
		//return selected option to filling area from table
		var category = document.getElementsByName("categories")[0];
		var text = table.rows[rowPosition].cells[6].innerHTML;
		var i = 0;
		var found = false;
		
		while ( i < category.options.length && !found)
		{
			if(text == category.options[i].text)
			{
				category.selectedIndex = i;
				found = true;
			}
			i++;
		}
		chkboxCount = 0;
	}
}

function savedit(myTable){
var table = document.getElementById(myTable);
		var rowCount = table.rows.length;
		for(var i=1; i<rowCount; i++) 
		{
			 var row = table.rows[i];
			 var chkbox = row.cells[6].getElementsByTagName("input")[0];
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

function changeImage() {
   document.getElementById("productImage").src = document.getElementById("input-file").files[0].name;
}

function defaultImage()
{
	document.getElementById("productImage").src = "product.gif";
	document.getElementById("input-file").value = null;
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

