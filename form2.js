var item = new ItemRegister();
var myTable = "datatable"; //table id
var count = 0;
var itemDetail = new Array(); //array to store add item
var temp = new Array(); //Create temp array for search function
var saveCount = parseInt(localStorage["count"]); //save the previous visit's count

function ItemRegister(id, name, image, description, price, valid, category)
{
	this.id = id ;
	this.name = name;
	this.description = description;
	this.price = price;
	this.image = image;
	this.valid = valid;
	this.category = category;
}

ItemRegister.prototype.deleteRow = function()  
{	
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	for(var i = 1; i < rowCount; i++) 
	{
		var row = table.rows[i];
		var chkbox = row.cells[7].getElementsByTagName("input")[0];
		if(chkbox != null && chkbox.checked == true)
		{
			localStorage.removeItem("item" + parseInt(i - 1));
			table.deleteRow(i);
			itemDetail.splice(i, 1);
			
			if (!isNaN(saveCount) && saveCount >= 0)
			{
				saveCount--;
				//local-store the saveCount(last time count + current time count) times
				localStorage["count"] = saveCount;
			}
			else
			{
				count--;
				//local-store the count times
				localStorage["count"] = count;
			}
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
	
	if (document.getElementsByName("id")[0].value !="" && document.getElementById("input-file").value != "")
	{
		//Insert each cell into each row and fill up the details
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
		
		//declare variables and store the texts inside cells
		var idText = cell1.innerHTML;
		var nameText = cell2.innerHTML;
		var pathText = img.src;
		var descriptionText = cell4.innerHTML;
		var priceText = cell5.innerHTML;
		var validText = cell6.innerHTML;
		var categoryText = cell7.innerHTML;
		
		//Set the text boxes to default value
		id.value = "";
		name.value = "";
		//make it to be default image
		defaultImage();
		description.value = "";
		price.value = "";
		valid.value = "";
		category.selectedIndex = 0;
		
		//declare a new object variable and stores those variables above
		var newItem = new ItemRegister(idText, nameText, pathText, descriptionText, priceText, validText, categoryText);
		//Add the object into array
		if (!isNaN(saveCount) && saveCount != 0)
		{
			itemDetail[saveCount] = newItem;
			localStorage.setItem("item" + saveCount, JSON.stringify(itemDetail[saveCount]));
			saveCount++;
			localStorage["count"] = saveCount;
		}
		else
		{
			itemDetail[count] = newItem;
			localStorage.setItem("item" + count, JSON.stringify(itemDetail[count]));
			count++;
			//local-store the count times
			localStorage["count"] = count;
		}
	
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
		 if (chkbox != null && chkbox.checked) 
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
		//edit the data which retrives from table of a certain row selected by checkbox 
		document.getElementById("publish").style.visibility = "visible";
		document.getElementById("edit").style.visibility = "hidden";
		document.getElementById("add").style.visibility = "hidden";
		document.getElementById("delete").style.visibility = "hidden";
		if (!isNaN(saveCount) || saveCount >= 0)
		{
			document.getElementsByName("id")[0].value = itemDetail[saveCount - 1].id;
			document.getElementsByName("name")[0].value = itemDetail[saveCount - 1].name;
			document.getElementsByName("description")[0].value = itemDetail[saveCount - 1].description;
			document.getElementsByName("price")[0].value = itemDetail[saveCount - 1].price;
			document.getElementsByName("valid")[0].value = itemDetail[saveCount - 1].valid;
			
			//Get image full path from array 
			document.getElementById("productImage").src = itemDetail[saveCount - 1].image;
			//return selected option to filling area from table
			var text = itemDetail[saveCount - 1].category;
		}
		else
		{
			document.getElementsByName("id")[0].value = itemDetail[count - 1].id;
			document.getElementsByName("name")[0].value = itemDetail[count - 1].name;
			document.getElementsByName("description")[0].value = itemDetail[count - 1].description;
			document.getElementsByName("price")[0].value = itemDetail[count - 1].price;
			document.getElementsByName("valid")[0].value = itemDetail[count - 1].valid;
			
			//Get image full path from array 
			document.getElementById("productImage").src = itemDetail[count - 1].image;
			//return selected option to filling area from table
			var text = itemDetail[count - 1].category;
		}
		var cat = document.getElementsByName("categories")[0];
		var i = 0;
		var found = false;
		
		//retrive select option from data table
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
		//Disable check boxes 
		disableCheckBox();
	}
}

function search()
{
	document.getElementById("add").style.visibility = "hidden";
	document.getElementById("edit").style.visibility = "hidden";
	document.getElementById("delete").style.visibility = "hidden";
	document.getElementById("back").style.visibility = "visible";
	var search = document.getElementById("searchBar").value;
	var match = false;
	var location = 0;
	if (!isNaN(saveCount) || saveCount >= 0)
	{
		var length = saveCount;
	}
	else
	{
		var length = count;
	}
	for(i = 0; i < length; i++)
	{
		for(var j = 0; j < search.length; j++)
		{
			if(itemDetail[i] != null)
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
		}
		if(match)
		{
			temp[location] = itemDetail[i];
			location++;
			
		}
	}
	//clear table contents
	clearTable();
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = temp.length;
	for(var i = 0; i < rowCount; i++) 
	{
		if(temp[i] != null)
		{
			var row = table.insertRow(1);
			var cell1 = row.insertCell(0);
			cell1.innerHTML = temp[i].id;
			
			var cell2 = row.insertCell(1);
			cell2.innerHTML = temp[i].name;

			var cell3 = row.insertCell(2);
			var img = document.createElement("img");
			img.src = temp[i].image;
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
	}
	//disable check boxes 
	disableCheckBox();
}

function afterSearch ()
{
	document.getElementById("add").style.visibility = "visible";
	document.getElementById("edit").style.visibility = "visible";
	document.getElementById("delete").style.visibility = "visible";
	document.getElementById("back").style.visibility = "hidden";
	
	//remove all rows
	clearTable();
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = itemDetail.length;
	//create the rows and fill in data after searching
	for(var i = 0; i < rowCount; i++) 
	{
		if(itemDetail[i].id != null)
		{
			var row = table.insertRow(1);
			var cell1 = row.insertCell(0);
			cell1.innerHTML = itemDetail[i].id;

			var cell2 = row.insertCell(1);
			cell2.innerHTML = itemDetail[i].name;

			var cell3 = row.insertCell(2);
			var img = document.createElement("img");
			img.src = itemDetail[i].image;
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

}


ItemRegister.prototype.publish = function()
{
	var table = document.getElementById(myTable).tBodies[0];
	var rowCount = table.rows.length;
	//publish again table when getting done edit
	for(var i = 1; i < rowCount; i++) 
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
			if(document.getElementById("input-file").value == null || document.getElementById("input-file").value == "" )
			{
				var path = itemDetail[i - 1].image
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
			itemDetail[i-1] = newItem;
			localStorage.setItem("item" + parseInt(i-1), JSON.stringify(itemDetail[i-1]));
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

//change image path
function changeImage() 
{
   document.getElementById("productImage").src = document.getElementById("input-file").files[0].name;
}

//default path of image
function defaultImage()
{
	document.getElementById("productImage").src = "product.gif";
	document.getElementById("input-file").value = null;
}

//disable all check boxes
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

//remove all rows
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

//enable checkboxes
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

//localStorage clear value
function clearLocalStorage()
{
	localStorage.clear();
}

//localStorage load value
function recallValue() 
{
	//add cells and fill up the data from localStorage
    var table = document.getElementById(myTable).tBodies[0];
	if (!isNaN(saveCount) || saveCount >= 0)
	{
		for (var i = 0; i < saveCount + 10; i++) 
		{
			var itemString = localStorage.getItem("item" + i);
			if (itemString != " ")
			{
				var itemObject = JSON.parse(itemString);
				itemDetail[i] = itemObject;
				if (itemDetail[i] != null && itemString != " ")
				{
					var id = itemDetail[i].id;
					var name = itemDetail[i].name;
					var image = itemDetail[i].image;
					var description = itemDetail[i].description;
					var price = itemDetail[i].description;
					var valid = itemDetail[i].valid;
					var category = itemDetail[i].category;
					
					var row = table.insertRow(1);
					var cell1 = row.insertCell(0);
					cell1.innerHTML = id;
					
					var cell2 =  row.insertCell(1);
					cell2.innerHTML = name;
					
					var cell3 = row.insertCell(2);
					var imageElement = document.createElement("img");
					imageElement.src = image;
					cell3.appendChild(imageElement);
					
					var cell4 = row.insertCell(3);
					cell4.innerHTML = description;
					
					var cell5 = row.insertCell(4);
					cell5.innerHTML = price;
					
					var cell6 = row.insertCell(5);
					cell6.innerHTML = valid;
					
					var cell7 = row.insertCell(6);
					cell7.innerHTML = category;
					
					var cell8 = row.insertCell(7);
					var chkElement = document.createElement("input");
					chkElement.type = "checkbox";
					chkElement.name = "chk";
					cell8.appendChild(chkElement);	
				}
			}
		}
	}
	
}

//onclick - checked and unchecked all checkboxes 
function checkAll(bx) 
{
	var table = document.getElementById(myTable);
	var rowCount = table.rows.length;
	var chk = false;
	for(var i = 1; i < rowCount; i++) 
	{
		var row = table.rows[i];
		chk = row.cells[7].getElementsByTagName("input");
		if(bx != null && bx.checked) 
		{
			chk[0].checked = true;
		}
		else
		{
			chk[0].checked = false;
		}
	}
}