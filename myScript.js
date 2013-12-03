var pathID = "datatable";
var count = 0;
var x = new Array();


function saveData()
{	
	var table = document.getElementById(pathID).tBodies[0];
	var rowCount = table.rows.length;
	var cellCount = table.rows[0].cells.length;
	
	var variables = new Array();
	variables[count] = new Array();
	variables[count][count] = document.getElementById("id" + count).value;
	variables[count][count+1] = document.getElementById("name" + count).value;
	variables[count][count+2] = document.getElementById("description" + count).value;
	variables[count][count+3] = document.getElementById("price" + count).value;
	variables[count][count+4] = document.getElementById("valid" + count).value;
	var index = document.getElementById("cat" + count).selectedIndex;
	variables[count][count+5] = document.getElementById("cat" + count).options[index].text;
	localStorage.setItem("id", variables[count][count]);
	localStorage.setItem("name", variables[count][count+1]);
	localStorage.setItem("description", variables[count][count+2]);
	localStorage.setItem("price", variables[count][count+3]);
	localStorage.setItem("valid", variables[count][count+4]);
	localStorage.setItem("cat", variables[count][count+5]);
	/*localStorage["variables"] = JSON.stringify(variables);*/

	//...
	//var storedNames = JSON.parse(localStorage["names"]);


	/*x[count][count] = document.getElementById("id" + count).value;
	x[count][count+1] = document.getElementById("name" + count).value;
	x[count][count+2] = document.getElementById("description" + count).value;
	x[count][count+3] = document.getElementById("price" + count).value;
	x[count][count+4] = document.getElementById("valid" + count).value;
	var index = document.getElementById("cat" + count).selectedIndex;
	x[count][count+5] = document.getElementById("cat" + count).options[index].text;*/
	/*alert(variables[count][count]);
	alert(variables[count][count+1]);
	alert(variables[count][count+2]);
	alert(variables[count][count+3]);
	alert(variables[count][count+4]);
	alert(variables[count][count+5]);*/
		
}

function recallValue()
{
	var id = localStorage.getItem("id");
    /*var name = localStorage.getItem("name");
	var description = localStorage.getItem("description");
	var price = localStorage.getItem("price");
	var valid = localStorage.getItem("valid");
	var cat = localStorage.getItem("cat");*/
	

    if ( id == null )
    {
		alert("No value stored, enter one.");
    }
    else
    {

	var table = document.getElementById(pathID).tBodies[0];
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

	
	var cell1 = row.insertCell(0);
	var element1 = document.createElement("input");
	element1.type = "text";
	element1.name = "ID";
	element1.id = "id" + count;
	element1.size = "10";
	element1.getValue = localStorage.getItem("id");
	cell1.appendChild(element1);
	
	var cell2 = row.insertCell(1);
	var element2 = document.createElement("input");
	element2.type = "text";
	element2.name = "name";
	element2.id = "name" + count;
	element2.size = "20";
	element2.getValue = localStorage.getItem("name");
	cell2.appendChild(element2);
	
	var cell3 = row.insertCell(2);
	var element3 = document.createElement("input");
	element3.type = "text";
	element3.name = "description";
	element3.id = "description" + count;
	element3.size = "30";
	element3.getValue = localStorage.getItem("description");
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
}

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
	
	saveData();
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



function printDetails()
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
}

