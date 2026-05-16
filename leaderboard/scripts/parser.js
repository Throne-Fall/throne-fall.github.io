async function GetCSVFile(type)
{
	let fetchFile;
	if (type == "time")
	{
		fetchFile = await fetch("./entriesTime.csv"); 
	}
	else
	{
		fetchFile = await fetch("./entries.csv"); 
	}
	const fileText  = await fetchFile.text();
    // console.log("== CONTENT ======================================================================");
    // console.log(fileText);
    return fileText;
}

const appsScriptUrl = "https://script.google.com/macros/s/AKfycbwyuL3xoL5czvDbaWh73LR6FlKrjztR7mKfxf01_VaskuSQbLROQ_S2ZNTAG95TwOHS/exec";
async function GetScoresData() 
{
	try 
	{
		const response = await fetch(appsScriptUrl + "?type=score"); // Adjust the URL and format parameter as needed
	  	const csvData  = await response.text();
  
	  	// console.log(csvData);
		return csvData;
	} 
	catch (error) 
	{
		console.error('Error fetching data:', error);
		alert("== ERROR FETCHING DATA == \n" + error);
	}
}

// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter )
{
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || ",");
	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		(
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
			// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
		),
		"gi"
		);
	// Create an array to hold our data. Give the array
	// a default empty first row.
	var arrData = [[]];
	// Create an array to hold our individual pattern
	// matching groups.
	var arrMatches = null;
	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec( strData )){
		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[ 1 ];
		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			(strMatchedDelimiter != strDelimiter)
			){
			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push( [] );
		}
		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[ 2 ]){
			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			var strMatchedValue = arrMatches[ 2 ].replace(
				new RegExp( "\"\"", "g" ),
				"\""
				);
		} else {
			// We found a non-quoted value.
			var strMatchedValue = arrMatches[ 3 ];
		}
		// Now that we have our value string, let's add
		// it to the data array.
		arrData[ arrData.length - 1 ].push( strMatchedValue );
	}
	// Return the parsed data.
    // console.log("== PARSERD DATA ================================");
	// console.log(arrData);
	return( arrData );
}