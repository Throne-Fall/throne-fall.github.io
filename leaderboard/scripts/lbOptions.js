// 
// O B S O L E T E ?
// 
function ChangeShownTable(tableToShow, sectionName)
{
	// console.log("ChangeShownTable: " + tableToShow + "; " + sectionName);
	const LBsections = document.getElementsByClassName("LeaderBoard_section");

	for (let i = 0; i < LBsections.length; i++)
	{
		LBsections[i].style.display = "none";
	}

	let showTable = document.getElementById(tableToShow);
	showTable.style.display = "block";

	window.location.hash = sectionName;
}

function ChangeCategory(name)
{
	location.hash = "";
    HideLevelNameColumn();
    
    // Subcategory buttons
    const scoreLevelsButton = document.getElementById("scoreLevelsToggle");
    // Category buttons
	const scoreCatButton = document.getElementById("scoreCategoryButton");
    // LB secions
	const scoresSection = document.getElementById("lbScoresSection");

	// HIDE ALL SUB-CAT BUTTONS
	scoreLevelsButton.style.display = "none";
	// RESET ALL CATEGORY BUTTONS ACTIVE STATE
	scoreCatButton .classList.remove("active");

    scoresSection.style.display = "none";

	switch (name)
	{
		default:
			console.error("ChangeCategory | Name (\""+ name +"\") is not a valid category name!");
		break;

		case "score":
            $("#leaderboardContent")[0].style.display = "block";
			scoresSection.style.display = "block";

			// Levels toggle
			scoreLevelsButton.style.display = "grid";
			// Category toggle
			scoreCatButton.classList.add("active");
		break;
	}
}

function AssignPositionNumbers ()
{
	const posColumn = document.getElementsByClassName("SB_Position");

	for (let i = 0; i < posColumn.length; i++)
	{
		posColumn[i].textContent = (i + 1);
		posColumn[i].style.textAlign = "center";
	}
}

const tableMaxRows = 200;
function SpawnTableRows()
{
    let scoreTableRow  = document.getElementsByClassName("scoreTableRow");
    let scoreTableBody = document.getElementById("scoreLBtableBody");
    let newScoreRow;

    for (let i = 0; i < tableMaxRows; i++)
    {
        newScoreRow = scoreTableRow[0].cloneNode(true);
        scoreTableBody.append(newScoreRow);
    }
}

function HideLevelNameColumn ()
{
    const levelNameCol = document.getElementsByClassName("mapNameColumn");
    for (let i = 0; i < levelNameCol.length; i++)
    {
        levelNameCol[i].style.display = "none";
    }
}
function ShowLevelNameColumn ()
{
    const levelNameCol = document.getElementsByClassName("mapNameColumn");
    for (let i = 0; i < levelNameCol.length; i++)
    {
        levelNameCol[i].style.display = "block";
    }
}

/////////////////////////////////////////////////////////////////

function IsPicServiceSupoorted (url)
{
    const supportedDomains = 
    [
        "i.postimg.cc",
        "i.ibb.co",
        "i.imgur.com",
        "media.discordapp.net",
        "cdn.discordapp.com",
        "ghost-miner.github.io",
    ]
    for (let i = 0; i < supportedDomains.length; i++)
    {
        chosenDomain = supportedDomains[i];
        if (url.includes(chosenDomain))
        {
            return true;
        }
    }
    return false;
}

// Add spaces to separate thousand and million (69420 => 69 420 (plase laugh))
function SplitScore(scoreNum)
{
    const inputNumber = scoreNum; // Input value
    const inputNumsChars = inputNumber.split('').reverse(); // Split into indiviual charascters and reverse it 
    let   outputNumber = ""; // Initialize output string

    for (let i = 0; i < inputNumsChars.length; i++)
    {
        // 3: thousand, 6: million
        if (i == 3 || i == 6)
        {
            outputNumber = outputNumber + "\xa0" + inputNumsChars[i];
        }
        else
        {
            outputNumber = outputNumber + inputNumsChars[i];
        }
    }
    // Split output string into individual characters, reverse the order, and join all characters back together
    return outputNumber.split('').reverse().join('');
}

// Remove that werd character at the end of version numbers.
// this function follows the same structure as SplitScore(scoreNum). 
function FormatVersionNumber (versionString)
{
    const inputVerString = versionString;
    const versionChars = inputVerString.split('');
    let   outputVerString = "";

    for (let i = 0; i < versionChars.length; i++)
    {
        if (versionChars[i] == "´")
        {
            break;
        }
        outputVerString = outputVerString + versionChars[i];
    }
    return outputVerString;
}

// Change the date format to day/month/year
// this function follows the same structure as SplitScore(scoreNum). 
function FormatSubmissionDate (dateString)
{
    // Do format the date if it doesnt contain dah (which means it already formatted)
    if (!dateString.includes("-"))
    {
        return dateString;
    }
    const inputDate = dateString; 
    const dateChars = inputDate.split('');
    let outputDateString = "";

    let dayStr = ""; // Day part
    let monthStr = ""; // month part
    let yearStr = ""; // year part
    let dashCount = 0; // first dash separates year from month, second one separates mknth from day
    for (let i = 0; i < dateChars.length; i++)
    {
        // This character is uput at the end to keep the date in plain text. Skip it while formatting
        if (dateChars[i] == "´")
        {
            continue;
        }
        // Skip to the next character 
        if (dateChars[i] == "-")
        {
            dashCount++;
            continue;
        }
        switch(dashCount)
        {
            case 0: // Year
                yearStr = yearStr + dateChars[i];
                break;
            
            case 1: // Month
                monthStr = monthStr + dateChars[i];
                break;
            
            case 2: // Day
                dayStr = dayStr + dateChars[i];
                break;
            
        }
    }

    return (dayStr + "/" + monthStr + "/" + yearStr);
}

function GetEmbedYTLink (vidLink)
{
    let videoIDChars = new Array();
    let vidIDIndex = 0;
    let vidIDString = "";

    const ytLink = "https://youtube.com/embed/";
    const inputStr = vidLink;
    const chars = inputStr.split(''); 

    for (let i = chars.length - 1; i >= 0; i--)
    {
        if (chars[i] == "=" || chars[i] == "/")
        {
            break;
        }
        videoIDChars[vidIDIndex] = chars[i]; 
        vidIDIndex++;
    }

    // console.log(chars);
    // console.log("------------------------");
    // console.log(videoIDChars)//.reverse());

    let IDs = videoIDChars.reverse();
    for (let i = 0; i < IDs.length; i++)
    {
        vidIDString = vidIDString + IDs[i];
    }
    // console.log(vidIDString);
    return (ytLink + vidIDString);
}

function ShortenYTLink (url)
{
    let videoIDChars = new Array();
    let vidIDIndex = 0;
    let vidIDString = "";

    const ytLink = "youtu.be/";
    const inputStr = url;
    const chars = inputStr.split(''); 

    for (let i = chars.length - 1; i >= 0; i--)
    {
        if (chars[i] == "=" || chars[i] == "/")
        {
            break;
        }
        videoIDChars[vidIDIndex] = chars[i]; 
        vidIDIndex++;
    }

    // console.log(chars);
    // console.log("------------------------");
    // console.log(videoIDChars)//.reverse());

    let IDs = videoIDChars.reverse();
    for (let i = 0; i < IDs.length; i++)
    {
        vidIDString = vidIDString + IDs[i];
    }
    // console.log(vidIDString);
    return (ytLink + vidIDString);
}

function RemoveTimeFromData (dateAndTime)
{
    if (dateAndTime.length <= 10 && dateAndTime.includes("/"))
    {
        return dateAndTime;
    }
    let dateChars = new Array();
    let finalDateString = "";

    const inputString = dateAndTime;
    const inputChars = inputString.split('');

    if (dateAndTime.includes("-"))
    {
        for (let i = 0; i < inputChars.length - 1; i++)
        {
            dateChars[i] = inputChars[i];
        }
    }
    else
    {       
        for (let i = 0; i < inputChars.length - 5; i++)
        {
            dateChars[i] = inputChars[i];
        }
    }
    for (let i = 0; i < dateChars.length; i++)
    {
        finalDateString = finalDateString + dateChars[i];
    }

    //console.log(finalDateString.length);
    return finalDateString;
}

/////////////////////////////////////////////////

function MakeModifierList (modifierString,type)
{
    let modifierList;
    switch(type)
    {
        case "text":
            // console.log("= MakeModifierList - Titles =");
            modifierList = modifierString.split(";");
            break;
        
        case "image":
            // console.log("= MakeModifierList - Icons =");
            modifierList = modifierString.toLowerCase().split(" ").join("_").split(";_");
            break;
    }
    // console.table(modifierList);
    // console.log(modifierList.length);
    return modifierList;
}

function GetMutatorPageName (mutatorName)
{
    const wikiURL = "https://throne-fall.github.io/game-content/mutators/";
    const extension = ".html";

    return wikiURL + mutatorName.split("_").join("-") + extension;
}

function GetPerkPageName (perkName)
{
    const wikiURL = "https://throne-fall.github.io/game-content/perks/";
    const extension = ".html";

    return wikiURL + perkName.split("_").join("-") + extension;
}

//////////////////////////////////////////////////////////////////////////////////////

function GetSearchInputSring()
{
    const value = document.getElementById("site-search").value;
    return value;
}
let searchResultsSubs;
function SearchSubByName(searchedString)
{
	
    if (searchedString == "" || searchedString == null)
    {
        alert("Search input cannot be empty!");
        return;
    }
    if (searchedString.toLowerCase() == "never gonna give you up" || searchedString.toLowerCase() == "rick astley" || searchedString.toLowerCase() == "rick roll")
    {
        // console.log("SECRET FOUND " + searchedString);
        location.replace("./img/rick 720p.mp4");
        return;
    }
    searchResultsSubs = new Array();
    let srcResArrIndex = 0;

    let srcString = searchedString.toUpperCase();
    let chosenSub;
    let subName;
    let subIndex;

    for (let i = 1; i < scoresData.length; i++)
    {
        if (i >= tableMaxRows)
        {
            console.warn("SearchSubByName() | Number of search results is higher than number of available table rows.");
            alert("WARNING: \nNumber of search results is higher than the number of available table rows. \nSome results aren't shown.");
            break;
        }        
        chosenSub = scoresData[i];

        subName = chosenSub[sc_nameColumn].toUpperCase();
        subIndex = chosenSub[sc_sudIndexColumn];

        if (chosenSub[sc_positionColumn] == "" || chosenSub[sc_positionColumn] == null)
        {
            chosenSub[sc_positionColumn] = chosenSub[sc_statusColumn].toUpperCase();
        }

        if (subName.includes(srcString) && !subName.includes("TEST"))
        {
            // console.log("=======================================")
            // console.log("Added match to src res list");
            // console.log("Found match at " + i + ": " + chosenSub[sc_nameColumn]);
            searchResultsSubs[srcResArrIndex] = chosenSub;
            srcResArrIndex++;
        }
    }
    // console.log("== RESULTS ==================");
    // console.log(searchResultsSubs);
    // if (searchResultsSubs[0] == null)
    // {
    //     alert("No result found.");
    //     return;
    // }
    ChangeTableData("Search",false);
    HideSearchField();
}

function FindSubmissionById(_subID)
{
    let chosenSub;
    let submissionID;
    let subNumber;

    for (let i = 0; i < scoresData.length; i++)
    {
        chosenSub = scoresData[i];
        submissionID = chosenSub[sc_subIDColumn];
        subNumber = chosenSub[sc_sudIndexColumn];

        //console.log(i + " " + subNumber);
        
        if(submissionID == null)
        {
            console.error("FindSubmissionById | submissionID value is invallid or undefined!");
            return;
        }        
        if (submissionID == _subID)
        {
            // console.log("FindSubmissionById | FOUND MATCH AT INDEX " + i);
            ShowSubInfo(subNumber,true); 
            return;
        }
    }
    
    // console.log("-------------------------------------------------------");
    // console.log("[ WARN] No submission with such ID was found");
    // console.log(chosenSub);
    // console.log(submissionID);
    // console.log(subNumber);
    // console.log("============================================================");
}