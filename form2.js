function ItemRegister(id, name, image, description, price, valid, category)
{
	this.id = id ;
	this.name = name;
	this.description = description;
	this.price = price;
	this.image = image;
	this.valid = valid;
	this.category = category;
	//this.addItem = 0;
	//this.printValue = 0;
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

var item = new ItemRegister();
var myTable = "datatable";
var count = 0;
var itemDetail = new Array();

ItemRegister.prototype.deleteRow = function()  
{	
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	// var i=1 to start after header
	for(var i = 1; i < rowCount; i++) 
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
			itemDetail.splice(i, 1);
			count--;
			rowCount--;
			i--;
		}
	}
}

ItemRegister.prototype.addRow = function()
{
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	
	if (document.getElementsByName("id")[0].value !="" && document.getElementById("input-file").value != "")
	{
		var cell1 = row.insertCell(0);
		var id = document.getElementsByName("id")[0];
		cell1.innerHTML = id.value;

		var cell2 = row.insertCell(1);
		var name =  document.getElementsByName("name")[0];
		cell2.innerHTML = name.value ;

		var cell3 = row.insertCell(2);
		var img = document.createElement("img");
		img.id = "image";
		
		img.src = document.getElementById("input-file").files[0].name;
		//imgPath[count] = img.src;
		//store image full path in array
		cell3.appendChild(img);
		
		
		var cell4 = row.insertCell(3);
		var description = document.getElementsByName("description")[0];
		cell4.innerHTML = description.value;

		var cell5 = row.insertCell(4);
		var price = document.getElementsByName("price")[0];
		cell5.innerHTML = price.value ;

		var cell6 = row.insertCell(5);
		var valid = document.getElementsByName("valid")[0];
		cell6.innerHTML = valid.value ;
		
		var cell7 = row.insertCell(6);
		var category = document.getElementById("cat");
		var index = category.selectedIndex;
		cell7.innerHTML = category.options[index].text;
		
		var cell8 = row.insertCell(7);
		var element8 = document.createElement("input");
		element8.type = "checkbox";
		element8.name = "chk";
		cell8.appendChild(element8);
		
		var idText = cell1.innerHTML;
		var nameText = cell2.innerHTML;
		var pathText = img.src;
		var descriptionText = cell4.innerHTML;
		var priceText = cell5.innerHTML;
		var validText = cell6.innerHTML;
		var categoryText = cell7.innerHTML;
		
		id.value = "";
		name.value = "";
		//make it to be default image
		defaultImage();
		description.value = "";
		price.value = "";
		valid.value = "";
		category.selectedIndex = 0;
		var newItem = new ItemRegister(idText, nameText, pathText, descriptionText, priceText, validText, categoryText);
		itemDetail[count] = newItem;
		count++;
	}
	else
	{
		alert("Please fill up this form at least ID and Image");
	}
	
}	
ItemRegister.prototype.getEdit = function()
{
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	var chkboxCount = 0;
	var rowPosition = 0;
	var chkbox = false;
	for(var i = 1; i < rowCount; i++) 
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
		document.getElementsByName("id")[0].value = itemDetail[count-1].id;
		document.getElementsByName("name")[0].value = itemDetail[count-1].name;
		document.getElementsByName("description")[0].value = itemDetail[count-1].description;
		document.getElementsByName("price")[0].value = itemDetail[count-1].price;
		document.getElementsByName("valid")[0].value = itemDetail[count-1].valid;
		
		//Get image full path from array 
		//image.src = table.rows[rowPosition].cells[2].imgPath(count-1);
		document.getElementById("productImage").src = itemDetail[count-1].image;
		//return selected option to filling area from table
		var cat = document.getElementsByName("categories")[0];
		var text = itemDetail[count-1].category;
		var i = 0;
		var found = false;
		
		while ( i < cat.options.length && !found)
		{
			if(text == cat.options[i].text)
			{
				cat.selectedIndex = i;
				found = true;
			}
			i++;
		}
		chkboxCount = 0;
		disableCheckBox();
	}
}
var temp = new Array();
ItemRegister.prototype.search = function()
{
	document.getElementById("add").style.visibility = "hidden";
	document.getElementById("edit").style.visibility = "hidden";
	document.getElementById("delete").style.visibility = "hidden";
	document.getElementById("back").style.visibility = "visible";
	var search = document.getElementById("searchBar").value;
	var match = false;
	var location = 0;
	for(var i = 0; i < itemDetail.length; i++)
	{
		for(var j = 0; j < search.length; j++)
		{
			if(search.charAt(j) == itemDetail[i].id.charAt(j))
			{
				match = true;
			}
			else
			{
				match = false;
				break;
			}
		}
		if(match)
		{
			temp[location] = itemDetail[i];
			location++;
			
		}
	}
	
	clearTable();
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = temp.length;
	for(var i=0; i<rowCount; i++) 
	{
		
		var row = table.insertRow(1);
		var cell1 = row.insertCell(0);
		cell1.innerHTML = temp[i].id;
		
		var cell2 = row.insertCell(1);
		cell2.innerHTML = temp[i].name;

		var cell3 = row.insertCell(2);
		var img = document.createElement("img");
		img.src = temp[i].image;
		//imgPath[count] = img.src;
		//store image full path in array
		cell3.appendChild(img);
		
		var cell4 = row.insertCell(3);
		cell4.innerHTML = temp[i].description;

		var cell5 = row.insertCell(4);
		cell5.innerHTML = temp[i].price ;

		var cell6 = row.insertCell(5);
		cell6.innerHTML = temp[i].valid;
		
		var cell7 = row.insertCell(6);
		cell7.innerHTML = temp[i].category;
		
		var cell8 = row.insertCell(7);
		var element8 = document.createElement("input");
		element8.type = "checkbox";
		element8.name = "chk";
		cell8.appendChild(element8);
	}
	disableCheckBox();
}

ItemRegister.prototype.afterSearch = function()
{
	document.getElementById("add").style.visibility = "visible";
	document.getElementById("edit").style.visibility = "visible";
	document.getElementById("delete").style.visibility = "visible";
	document.getElementById("back").style.visibility = "hidden";
	
	clearTable();
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = itemDetail.length;
	for(var i = 0; i<rowCount; i++) 
	{
		var row = table.insertRow(1);
		var cell1 = row.insertCell(0);
		cell1.innerHTML = itemDetail[i].id;

		var cell2 = row.insertCell(1);
		cell2.innerHTML = itemDetail[i].name;

		var cell3 = row.insertCell(2);
		var img = document.createElement("img");
		img.src = itemDetail[i].image;
		//imgPath[count] = img.src;
		//store image full path in array
		cell3.appendChild(img);
		
		
		var cell4 = row.insertCell(3);
		cell4.innerHTML = itemDetail[i].description;

		var cell5 = row.insertCell(4);
		cell5.innerHTML = itemDetail[i].price ;

		var cell6 = row.insertCell(5);
		cell6.innerHTML = itemDetail[i].valid;
		
		var cell7 = row.insertCell(6);
		cell7.innerHTML = itemDetail[i].category;
		
		var cell8 = row.insertCell(7);
		var element8 = document.createElement("input");
		element8.type = "checkbox";
		element8.name = "chk";
		cell8.appendChild(element8);
	}

}
ItemRegister.prototype.publish = function()
{
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	for(var i=1; i<rowCount; i++) 
	{
		 var row = table.rows[i];
		 var chkbox = row.cells[7].getElementsByTagName("input")[0];
		 if(chkbox != null  && chkbox.checked) 
		 {
			var cell1 = row.cells[0];
			var id = document.getElementsByName("id")[0];
			cell1.innerHTML = id.value;

			var cell2 = row.cells[1];
			var name = document.getElementsByName("name")[0];
			cell2.innerHTML = name.value ;

			var cell3 = row.cells[2];
			if(document.getElementById("input-file").value == null)
			{
				var path = itemDetail[i-1].image
				document.getElementsByTagName("img")[0].src = path;
			}
			else
			{
				var path = document.getElementById("input-file").value;
				document.getElementsByTagName("img")[0].src = path;
			}
			
			var cell4 = row.cells[3];
			var description = document.getElementsByName("description")[0];
			cell4.innerHTML = description.value;

			var cell5 = row.cells[4];
			var price = document.getElementsByName("price")[0];
			cell5.innerHTML = price.value ;

			var cell6 = row.cells[5];
			var valid = document.getElementsByName("valid")[0];
			cell6.innerHTML = valid.value ;
			
			var cell7 = row.cells[6];
			var category = document.getElementById("cat");
			var index = category.selectedIndex;
			cell7.innerHTML = category.options[index].text;
			
			
			
			var idText = cell1.innerHTML;
			var nameText = cell2.innerHTML;
			//var pathText = img.src;
			var descriptionText = cell4.innerHTML;
			var priceText = cell5.innerHTML;
			var validText = cell6.innerHTML;
			var categoryText = cell7.innerHTML;
			
			id.value = "";
			name.value = "";
			//make it to be default image
			defaultImage();
			description.value = "";
			price.value = "";
			valid.value = "";
			category.selectedIndex = 0;
			var newItem = new ItemRegister(idText, nameText, path, descriptionText, priceText, validText, categoryText);
			itemDetail.splice(i,1, newItem);
			enableCheckBox();
			chkbox.checked = false;
			document.getElementById("publish").style.visibility = "hidden";
			document.getElementById("edit").style.visibility = "visible";
			document.getElementById("add").style.visibility = "visible";
			document.getElementById("delete").style.visibility = "visible";
			
			break;
		 }
	}

}

function changeImage() 
{
   document.getElementById("productImage").src = document.getElementById("input-file").files[0].name;
}

function defaultImage()
{
	document.getElementById("productImage").src = "product.gif";
	document.getElementById("input-file").value = null;
}

function disableCheckBox()
{
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	for (var i = 1; i < rowCount; i++)
	{	
		var row = table.rows[i];
		row.cells[7].getElementsByTagName("input")[0].disabled=true;
	}

}

function clearTable()
{
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	// var i=1 to start after header
	for(var i = rowCount - 1; i >= 1; i--) 
	{
		var row = table.rows[i];
		table.deleteRow(i);
	}
}
function enableCheckBox()
{
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	for (var i = 1; i < rowCount; i++)
	{	
		var row = table.rows[i];
		row.cells[7].getElementsByTagName("input")[0].disabled=false;
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

