/*
 * vertical.js
 *
 * Created by JBF Software for Sevilla.
 * This script comes distributed with Sevilla but can be freely used by anyone.
 *
 * As this script has been mainly composed on information from various internet
 * sources, and as vertical table headers are very difficult to achive with html
 * you may freely use, change and distribute this script.
 *
 * This is a javascript that can be used to size 90/270 degrees rotated table
 * headers vertically to the maximum amount needed and no more than that.
 *
 * Call the script by including a script in your page like:
 *
 *   <script type="text/javascript" src="Script/vertical.js"></script>
 *   <script type="text/javascript">
 *     function sizeHeaders()
 *     {
 *        sizeHeader(numberOfColumns,mystyle,rotation);
 *     }
 *     window.onload=sizeHeaders;
 *   </script>
 *
 * Replace numberOfColumns with the number of columns that should rotate.
 * You need HDAx and HDBx named elements for all 0<=x<numberOfColumns.
 * The table cells are named TDAx for all 0<=x<numberOfColumns.
 * Replace "mystyle" with the css-style name of the table header
 * Replace rotation with 1 for bottom up text, or 2 for top down text
 *
 * Example: sizeHeader(20, "TableHeaderStyle", 1);
 *
 * Please note the following demands on your page:
 *
 * The table headers to rotate are formatted as follows.
 *   <td id="TDAx"><div id="HDAx"><div id="HDBx">The table header here</div></div></td>
 * where x in TDAx, HDAx and HDBx runs from 0 to the number of colums, and the number of
 * columns is passed to the routine sizeHeader.
 *
 * The script will create temporary elements named "Scratch" and "ScratchTable". Make
 * sure these id's don't exist in your page.
 */

function sizeHeader(nrcols,style,layout)
{
	createDummyElement(style);
	var height = findBestHeight(nrcols,style);
	var width = findBestWidth();
	deleteDummyElement();
	switch(layout)
	{
		case 1:		sizeHeader270(nrcols, height, width); break;
		case 2:		sizeHeader90(nrcols, height, width); break;
		default:	/* this should not be encountered */;
	}
}

function findBestHeight(nrcols,style)
{
	var best = 30;
	for (var j=0; j< nrcols; j++)
	{
		var k = document.getElementById("HDB"+j);
		var t = document.getElementById("Scratch");
		t.innerHTML = k.innerHTML;
		var l = t.clientWidth;
		if (l > best) best = l;
	}
//	t.innerHTML = "";
//	window.alert(best);
	return(best);
}

function findBestWidth()
{
	var t = document.getElementById("Scratch");
	t.innerHTML = "XXX";
	var l = t.clientHeight;
//	t.innerHTML = "";
//	window.alert(best);
	return(l);
}

function createDummyElement(style)
{
	var body = document.body;
	var td = document.createElement("td");
	td.setAttribute("id","Scratch");
	td.setAttribute("class",style);
	var tr = document.createElement("tr");
	var table = document.createElement("table");
	table.setAttribute("border","0");
	table.setAttribute("id","ScratchTable");
	tr.appendChild(td);
	table.appendChild(tr);
	body.appendChild(table);
}

function deleteDummyElement()
{
	var body = document.body;
	var table = document.getElementById("ScratchTable");
	body.removeChild(table);
}

function sizeHeader90(nrcols,height,width)
{
	var transform = findTransform();
	for (var j=0; j< nrcols; j++)
	{
		document.getElementById("HDA"+j).style.cssText =
			"float: left; " +
			"width: "+width+"px; " +
			"overflow: hidden; " +
			"margin-right: 1px; " +
			"height:"+height+"px; ";
		var cellWidth = document.getElementById("TDA"+j).clientWidth;
		document.getElementById("HDA"+j).style.width = cellWidth+"px";
		var hshft = -4;
		var vshft = -cellWidth;
		document.getElementById("HDB"+j).style.cssText =
			"width:"+height+"px; " +
			"line-height: "+cellWidth+"px; " +
			"white-space: nowrap; " +
			"display: block; " +
			"padding-left: 3px; " +
			"text-align:right; " +
			transform+": rotate(90deg) translate("+hshft+"px,"+vshft+"px); " +
			transform+"-origin: 0px 0px; ";
	}
}

function sizeHeader270(nrcols,height,width)
{
	var transform = findTransform();
	for (var j=0; j< nrcols; j++)
	{
		document.getElementById("HDA"+j).style.cssText =
			"float: left; " +
			"width: "+width+"px; " +
			"overflow: hidden; " +
			"margin-right: 1px; " +
			"height:"+height+"px; ";
		var cellWidth = document.getElementById("TDA"+j).clientWidth;
		document.getElementById("HDA"+j).style.width = cellWidth+"px";
//		var vshft = -(cellWidth-width)/2;
		var vshft = 0;
		var hshft = -height;
		document.getElementById("HDB"+j).style.cssText =
			"width:"+height+"px; " +
			"line-height: "+cellWidth+"px; " +
			"white-space: nowrap; " +
			"display: block; " +
			"padding-left: 3px; " +
			"text-align:left; " +
			transform + ": rotate(270deg) translate("+hshft+"px,"+vshft+"px); " +
			transform + "-origin: 0px 0px; ";
	}
}

function findTransform()
{
	var el = document.body;
	var k=["transform","msTransform","OTransform","webkitTransform","MozTransform"];
	var g=["transform","-ms-transform","-o-transform","-webkit-transform","-moz-transform"];
	for (f in k)
	{
		for (e in el.style)
		{
			if (e == k[f])
			{
				return (g[f]);
			}
		}
	}
	return("transform");
}
