let scoresData; // data from entries.csv parsed into an array
let sortOrder = "down"; // Current sort order

const sc_subDateColumn   = 0;
const sc_statusColumn    = 1;
const sc_nameColumn      = 2;
const sc_levelColumn     = 3;
const sc_scoreColumn     = 4;
const sc_goldColumn      = 5;
const sc_proofColumn     = 6;
const sc_userDateColumn  = 7;
const sc_numOfMutsColumn = 8;
const sc_versionColumn   = 9;
const sc_weaponColumn    = 10;
const sc_usedMutsColumn  = 11;
const sc_usedPerksColumn = 12;
const sc_notesColumn     = 13;

const sc_subIDColumn    = 14;
const sc_sudIndexColumn = 50;
const sc_positionColumn = 51;

// 
// REQUEST DATA
// 
let demoSubsList = new Array();
let acceptedSubmissions = new Array();
let obsoleteSubmissions = new Array();
let rejectedSubmissions = new Array();
async function GetSubData ()
{
    // SHITTTY CODE TO DISABLE ALL BUTTON UNTIL LB IS LOADED.
    // missing 3 newly added buttons but nobody gives a fuck

    // $("#statisticsButtonHeader")[0].disabled = true;

    // $("#nl_score_btn")[0].disabled = true;
    // $("#nf_score_btn")[0].disabled = true;
    // $("#ds_score_btn")[0].disabled = true;
    // $("#fs_score_btn")[0].disabled = true;
    // $("#uf_score_btn")[0].disabled = true;
    // $("#st_score_btn")[0].disabled = true;
    // $("#et_score_btn")[0].disabled = true;
    // // $("#searchButton")[0].disabled = true;
    // $("#ets1_score_btn")[0].disabled = true;

    const CSVresponse = await GetScoresData();//GetCSVFile("score"); // Download data
    const ParseCSV    = await CSVToArray(CSVresponse,","); // Convert it to an array
    
    // localStorage.setItem("data",CSVresponse);
    // scoresData = CSVToArray(localStorage.getItem("data"));
    // $("#sesstionstorWarn")[0].style.display = "block"

    scoresData = await ParseCSV; // Load downloaded data into a variable

    // console.log("RESPONSE");
    // console.log(scoresData);
    SortSubData();
}

// VARIABLES SHARED BY SortSubData AND ChangeTableData
// Each array contains list of ubmission for the according level
let sc_NeulandSubsScor = new Array();
let sc_NordfelsSubs    = new Array();
let sc_DurststeinSubs  = new Array();
let sc_FrostseeSubsa   = new Array();
let sc_UferWindSubs    = new Array();
let sc_SturmklammSubs  = new Array();
let sc_WildbachSubs    = new Array();
let sc_MoorweghSubs    = new Array();
let sc_FreiforthSubs   = new Array();
let sc_TotendSubs      = new Array();

let eTrialsS1Subs   = new Array();
let eTrialsS2Subs   = new Array();
let sc_etTrialsSubs = new Array();

let sc_canShowTableData = false;

// 
// SORT DATA
// 
function SortSubData ()
{
    // Currently chosen submission
    let chosenRow;

    // REMOVE ALL SUBS THAT ARENT ACCEPTED
    let acceptedSubs = new Array();
    let acceptedSubsNumber = 0;

    let eTrialsS1SubNumber = 0;

    for (let i = 0; i < scoresData.length; i++)
    {
        chosenRow = scoresData[i];
        chosenRow[sc_sudIndexColumn] = i;
        if (chosenRow[sc_statusColumn] == "a")
        {
            acceptedSubs[acceptedSubsNumber] = chosenRow;
            acceptedSubsNumber++;
            acceptedSubmissions[acceptedSubmissions.length] = chosenRow;
        }
        else if (chosenRow[sc_statusColumn] == "o")
        {
            obsoleteSubmissions[obsoleteSubmissions.length] = chosenRow;
        }
        else if (chosenRow[sc_statusColumn] == "r")
        {
            rejectedSubmissions[rejectedSubmissions.length] = chosenRow;
        }
        else if (chosenRow[sc_statusColumn] == "s1-a")
        {
            eTrialsS1Subs[eTrialsS1SubNumber] = chosenRow;
            eTrialsS1SubNumber++;
            acceptedSubmissions[acceptedSubmissions.length] = chosenRow;
        }
        else if (chosenRow[sc_statusColumn] == "s2-a")
        {
            eTrialsS2Subs[eTrialsS2Subs.length] = chosenRow;
            // eTrialsS1SubNumber++;
            acceptedSubmissions[acceptedSubmissions.length] = chosenRow;
        }
    }
    // console.log(eTrialsS1Subs);
    
    // console.log("== ACCEPTED SUBS SORTED ===========================")
    // console.log(acceptedSubs);

    // SORT BY MAP
    let NLSubNum = 0;
    let NFSubNum = 0;
    let DSSubNum = 0;
    let FSSubNum = 0;
    let UFSubNum = 0;
    let SKSubNum = 0;
    let WBSubNum = 0;

    let etSubNum = 0;

    for (let i = 0; i < acceptedSubs.length; i++)
    {
        chosenRow = acceptedSubs[i];
        level = chosenRow[sc_levelColumn];

        switch (level)
        {
            default:
                console.warn("SortSubData | \"level\" value: " + chosenRow + " is unknown.");
                break;

            case "Neuland":
                sc_NeulandSubsScor[NLSubNum] = chosenRow;
                NLSubNum++;
                break;

            case "Nordfels":
                sc_NordfelsSubs[NFSubNum] = chosenRow;
                NFSubNum++;
                break;

            case "Durststein":
                sc_DurststeinSubs[DSSubNum] = chosenRow;
                DSSubNum++;
                break;
            case "Durststein":
                sc_DurststeinSubs[DSSubNum] = chosenRow;
                DSSubNum++;
                break;

            case "Frostsee":
                sc_FrostseeSubsa[FSSubNum] = chosenRow;
                FSSubNum++;
                break;

            case "Uferwind":
                sc_UferWindSubs[UFSubNum] = chosenRow;
                UFSubNum++;
                break;

            case "Sturmklamm":
                sc_SturmklammSubs[SKSubNum] = chosenRow;
                SKSubNum++;
                break;

            case "Wildbach":
                sc_WildbachSubs[WBSubNum] = chosenRow;
                WBSubNum++;
                break;

            case "Moorweg":
                sc_MoorweghSubs[sc_MoorweghSubs.length] = chosenRow;
                break;

            case "Freifort":
                sc_FreiforthSubs[sc_FreiforthSubs.length] = chosenRow;
                break;

            case "Totend":
                sc_TotendSubs[sc_TotendSubs.length] = chosenRow;
                break;

            case "EternalTrials":
                sc_etTrialsSubs[etSubNum] = chosenRow;
                etSubNum++;
                break;
        }
    }

    // SORT LISTS BY SCORE
    sc_NeulandSubsScor.sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
    sc_NordfelsSubs   .sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
    sc_DurststeinSubs .sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
    sc_FrostseeSubsa  .sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
    sc_UferWindSubs   .sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
    sc_SturmklammSubs .sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
    sc_WildbachSubs   .sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
    sc_MoorweghSubs   .sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
    sc_FreiforthSubs  .sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
    sc_TotendSubs     .sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));

    sc_etTrialsSubs.sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
    eTrialsS1Subs  .sort((a, b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
    // console.log("== MAP SUBS SORTED ===========================");
    // console.log(sc_NeulandSubsScor);
    // console.log(sc_NordfelsSubs);
    // console.log(sc_DurststeinSubs);
    // console.log(sc_FrostseeSubsa);

    // ASSIGN SUBMISSION NUMBER
    // Neuland
    for (let i = 0; i < sc_NeulandSubsScor.length; i++)
    {
        chosenRow = sc_NeulandSubsScor[i];
        chosenRow[sc_positionColumn] = i + 1;
    }
    // Nordfels
    for (let i = 0; i < sc_NordfelsSubs.length; i++)
    {
        chosenRow = sc_NordfelsSubs[i];
        chosenRow[sc_positionColumn] = i + 1;
    }
    // Durststein
    for (let i = 0; i < sc_DurststeinSubs.length; i++)
    {
        chosenRow = sc_DurststeinSubs[i];
        chosenRow[sc_positionColumn] = i + 1;
    }
    // Frostsee
    for (let i = 0; i < sc_FrostseeSubsa.length; i++)
    {
        chosenRow = sc_FrostseeSubsa[i];
        chosenRow[sc_positionColumn] = i + 1;
    }
    // Uferwind
    for (let i = 0; i < sc_UferWindSubs.length; i++)
    {
        chosenRow = sc_UferWindSubs[i];
        chosenRow[sc_positionColumn] = i + 1;
    }
    // Sturmnklamm
    for (let i = 0; i < sc_SturmklammSubs.length; i++)
    {
        chosenRow = sc_SturmklammSubs[i];
        chosenRow[sc_positionColumn] = i + 1;
    }
    // Wildbach
    for (let i = 0; i < sc_WildbachSubs.length; i++)
    {
        chosenRow = sc_WildbachSubs[i];
        chosenRow[sc_positionColumn] = i + 1;
    }
    
    for (let i = 0; i < sc_MoorweghSubs.length; i++)
    {
        chosenRow = sc_MoorweghSubs[i];
        chosenRow[sc_positionColumn] = i + 1;
    }
    
    for (let i = 0; i < sc_FreiforthSubs.length; i++)
    {
        chosenRow = sc_FreiforthSubs[i];
        chosenRow[sc_positionColumn] = i + 1;
    }
    
    for (let i = 0; i < sc_TotendSubs.length; i++)
    {
        chosenRow = sc_TotendSubs[i];
        chosenRow[sc_positionColumn] = i + 1;
    }


    // eternal trials
    for (let i = 0; i < sc_etTrialsSubs.length; i++)
    {
        chosenRow = sc_etTrialsSubs[i];
        chosenRow[sc_positionColumn] = i + 1;
    }
    
    // eternal trials s1
    for (let i = 0; i < eTrialsS1Subs.length; i++)
    {
        chosenRow = eTrialsS1Subs[i];
        chosenRow[sc_positionColumn] = i + 1;
    }

    sc_canShowTableData = true; // ALLOW USER TO CHANGE TABLE

    if (location.pathname.includes("embed"))
    {
        EmbedLeaderBoarReadyEvent();
    }
    else 
    {
        LeaderBoarReadyEvent();
    }
}

// DISPLAY TABLE FOR REQUESTED LEVEL
function ChangeTableData(level)
{
    // STOP FUNCTION IF IT'S ALREADY RUNNING
    if (!sc_canShowTableData)
    {
        // console.log("LEADERBOARD IS NOT READY!");
        return;
    }
    // Hide level name column 
    HideLevelNameColumn();
    // Reset the leaderboard section to remove all event listenvers
    document.getElementById("leaderboardContent").outerHTML = document.getElementById("leaderboardContent").outerHTML

	// SORT ITEMS INTO CORRESPOINDING VALUES
	let chosenArray;
	let chosenMap = level;

    $("#et1-lb")[0].style.display = "none";
    // SELECT CORRECR ARRAY
	switch (chosenMap)
	{
        default:
            console.error("ChangeTableData | invalid value for chosenMap: " + chosenMap);
            return;

		case "Neuland":
			chosenArray = sc_NeulandSubsScor;
			break;

		case "Nordfels":
			chosenArray = sc_NordfelsSubs;
			break;

		case "Durststein":
			chosenArray = sc_DurststeinSubs;
			break;
		case "Durststein":
			chosenArray = sc_DurststeinSubs;
			break;

		case "Frostsee":
			chosenArray = sc_FrostseeSubsa;
			break;

		case "Uferwind":
			chosenArray = sc_UferWindSubs;
			break;

		case "Sturmklamm":
			chosenArray = sc_SturmklammSubs;
			break;
        
        case "Wildbach":
            chosenArray = sc_WildbachSubs;
            break;
        
        case "Moorweg":
            chosenArray = sc_MoorweghSubs;
            break;
        
        case "Freifort":
            chosenArray = sc_FreiforthSubs;
            break;
        
        case "Totend":
            chosenArray = sc_TotendSubs;
            break;

		case "Eternal trials":
			chosenArray = sc_etTrialsSubs;
            // $("#et1-lb")[0].style.display = "block";
			break;

        case "Search":
            ShowLevelNameColumn();
            if (searchResultsSubs == null)
            {
                console.error("ChangeTableData || searchResultsSubs is empty. Run SearchSubByName() first!");
                return;
            }
            chosenArray = searchResultsSubs;
            break;
	}

    // CREATE ARRAYS FOR EACH VALUE TYPE
    let map      = new Array();
	let position = new Array();
	let names    = new Array();
	let score    = new Array();
	let coins    = new Array();
	let date     = new Array();
	// let proof = new Array();
    let mutators   = new Array();
    let subID      = new Array();
    let version    = new Array();
    let usedWeapon = new Array();
    let subIndex   = new Array();

    // ASSIGN EACH VALUE TYPE
	for (let i = 0; i < chosenArray.length; i++)
	{
		chosenRow = chosenArray[i];;

        map[i]        = chosenRow[sc_levelColumn];
        position[i]   = chosenRow[sc_positionColumn];
		names[i]      = chosenRow[sc_nameColumn];
		score[i]      = chosenRow[sc_scoreColumn];
		coins[i]      = chosenRow[sc_goldColumn];
		date[i]       = chosenRow[sc_userDateColumn];
        subID[i]      = chosenRow[sc_subIDColumn];
        mutators[i]   = chosenRow[sc_numOfMutsColumn];
        version[i]    = chosenRow[sc_versionColumn];
        usedWeapon[i] = chosenRow[sc_weaponColumn];
        subIndex[i]   = chosenRow[sc_sudIndexColumn];
	}

    // GET EACH TABLE COLUMN
    const tMapName  = document.getElementsByClassName("mapName ");
	const tPosition = document.getElementsByClassName("position");
	const tNames    = document.getElementsByClassName("name");
	const tScore    = document.getElementsByClassName("score");
	const tCoins    = document.getElementsByClassName("coins");
	const tDate     = document.getElementsByClassName("date");
    //const tProof    = document.getElementsByClassName("proof");   DEPRECATED
    const tMutNums  = document.getElementsByClassName("mutNums");
    const tVersion  = document.getElementsByClassName("version");
    const tWeapon   = document.getElementsByClassName("usedWeapon");
    //const tSubID    = document.getElementsByClassName("subID");

	let tableRows = document.getElementsByClassName("scoreTableRow");

    for (let i = 0; i < tableRows.length; i++)
    {
        tableRows[i].style.display = "table-row";
    }

    // ASSIGN TEXT INSIDE EACH CELL
	for (let k = 0; k < chosenArray.length; k++)
	{
		tMapName[k] .textContent = map[k];
		tPosition[k].textContent = position[k];
		tNames[k]   .textContent = names[k];

        tScore[k]  .textContent = SplitScore(score[k]);
		tCoins[k]  .textContent = coins[k];
        tMutNums[k].textContent = mutators[k];
		tDate[k]   .textContent = FormatSubmissionDate(date[k]);
        tVersion[k].textContent = FormatVersionNumber(version[k]);
        tWeapon[k] .textContent = usedWeapon[k];
        
        tableRows[k].addEventListener("click",() => { ShowSubInfo(subIndex[k],true) },false);
	}
    // HIDE ALL EMPTY ROWS
    for (let i = chosenArray.length; i < tableRows.length; i++)
    {
        tableRows[i].style.display = "none";
    }

    // Add order utton to table header
    // document.getElementById("th-mapName")   .addEventListener("click",() => { OrderBoardBy(level.toLowerCase(), "mapName")  }, false);
    document.getElementById("th-position")  .addEventListener("click",() => { OrderBoardBy(level.toLowerCase(), "score")    }, false);
    document.getElementById("th-name")      .addEventListener("click",() => { OrderBoardBy(level.toLowerCase(), "name")     }, false);
    document.getElementById("th-score")     .addEventListener("click",() => { OrderBoardBy(level.toLowerCase(), "score")    }, false);
    document.getElementById("th-coins")     .addEventListener("click",() => { OrderBoardBy(level.toLowerCase(), "gold")     }, false);
    document.getElementById("th-mutNums")   .addEventListener("click",() => { OrderBoardBy(level.toLowerCase(), "mutators") }, false);
    document.getElementById("th-usedWeapon").addEventListener("click",() => { OrderBoardBy(level.toLowerCase(), "weapon")   }, false);
    document.getElementById("th-date")      .addEventListener("click",() => { OrderBoardBy(level.toLowerCase(), "date")     }, false);
    document.getElementById("th-version")   .addEventListener("click",() => { OrderBoardBy(level.toLowerCase(), "version")  }, false);
    
    document.getElementById("LBLoadingIndicator")     .style.display = "none";   // HIDE LOADING ANIMATION
    document.getElementById("leaderboardContent")     .style.display = "block";  // SHOW LEADERBOAR SECTION
    document.getElementById("searchResultsLegendText").style.display = "none";   // HIDE SEARCH RESULTS LEGEND
    
	document.getElementById("leaderboardNameText").textContent = chosenMap + " high-scores"; // SET LEADERBOARD TITLE

    // SHOW SEARCH RESULTS LEGEND
    if (chosenMap == "Search")
    { 
        document.getElementById("searchResultsLegendText").style.display = "block";
        document.getElementById("searchResultsLegendText").textContent = "(O = Obsolete, R = Rejected)"; 
    }

    // Hide weapon and mutators column for Neuland
    const mutatorColumn = document.getElementsByClassName("mutatorsColumn ");
    const weaponColumn  = document.getElementsByClassName("weaponColumn");
    const goldColumn    = document.getElementsByClassName("coinsColumn");

    if (chosenMap == "Neuland")
    {
        for (let i = 0; i < mutatorColumn.length; i++)
        {
            mutatorColumn[i].style.display = "none";
        }
        for (let i = 0; i < weaponColumn.length; i++)
        {
            weaponColumn[i].style.display = "none";
        }
    }
    else if (chosenMap == "Eternal trials")
    {
        for (let i = 0; i < mutatorColumn.length; i++)
        {
            mutatorColumn[i].style.display = "none";
        }
        for (let i = 0; i < weaponColumn.length; i++)
        {
            weaponColumn[i].style.display = "none";
        }
        for (let i = 0; i < goldColumn.length; i++)
        {
            goldColumn[i].style.display = "none";
        }
	    document.getElementById("leaderboardNameText").textContent = "Eternal trials high-scores"; // SET LEADERBOARD TITLE
    }
    else if (chosenMap == "Eternal trials season 1")
    {
        for (let i = 0; i < mutatorColumn.length; i++)
        {
            mutatorColumn[i].style.display = "none";
        }
        for (let i = 0; i < weaponColumn.length; i++)
        {
            weaponColumn[i].style.display = "none";
        }
        for (let i = 0; i < goldColumn.length; i++)
        {
            goldColumn[i].style.display = "none";
        }
	    document.getElementById("leaderboardNameText").textContent = chosenMap + " high-scores"; // SET LEADERBOARD TITLE
    }
    else
    {
        for (let i = 0; i < mutatorColumn.length; i++)
        {
            mutatorColumn[i].style.display = "table-cell";
        }
        for (let i = 0; i < weaponColumn.length; i++)
        {
            weaponColumn[i].style.display = "table-cell";
        }
        for (let i = 0; i < goldColumn.length; i++)
        {
            goldColumn[i].style.display = "table-cell";
        }
    }

    // Hide the "loading page" used to hide the transition from light to dark mode
    // HideLoadingScreen();
}

// CHANGE TABLE ORDER
let sortDown = true;
function OrderBoardBy (map, orderType)
{
    // Initialize array to sort
    let  chosenMapArray = new Array();

    // Get what ma is selected
    switch (map)
    {
        default:
            console.error("OrderBoardBy | Invalid value for map! (" + map + ")");
        return;

        case "neuland":
            chosenMapArray = sc_NeulandSubsScor;
        break;

        case "nordfels":
            chosenMapArray = sc_NordfelsSubs;
        break;

        case "durststein":
            chosenMapArray = sc_DurststeinSubs;
        break;

        case "frostsee":
            chosenMapArray = sc_FrostseeSubsa;
        break;

        case "uferwind":
            chosenMapArray = sc_UferWindSubs;
        break;

        case "sturmklamm":
            chosenMapArray = sc_SturmklammSubs;
        break;
        
        case "eternal trials":
            chosenMapArray = sc_etTrialsSubs;
        break;
        
        case "eternal trials season 1":
            chosenMapArray = eTrialsS1Subs;
        break;

        case "search":
            if (searchResultsSubs == null)
            {
                console.error("ChangeTableData | searchResultsSubs is empty. Run SearchSubByName() first!");
                return;
            }
            chosenMapArray = searchResultsSubs;
        break;
    }

    // Replace all "unknown"s in mutator columns with -1 for better sorting.
    let chosenRow;
    let chosenMutString;
    let chosenVerString;
    for (let i = 0; i < chosenMapArray.length; i++)
    {
        chosenRow       = chosenMapArray[i];
        chosenMutString = chosenRow[sc_numOfMutsColumn].toLowerCase();
        chosenVerString = chosenRow[sc_versionColumn].toLowerCase();

        if (chosenMutString == "unknown" || chosenVerString == "unknown")
        {
            // console.log("i: " + i + ", " + chosenRow[sc_positionColumn] + " mut unknown " + chosenRow[i]);
            chosenRow[sc_numOfMutsColumn] = -1;
            chosenRow[sc_versionColumn] = -1;
        }
    }

    // Selecte the correct sorting value
    switch (orderType)
    {
        default:
            console.error("OrderBoardBy | Invalid value for orderType! " + orderType);
        return;
        
        case "score":
            chosenMapArray.sort((a,b) => parseInt(b[sc_scoreColumn]) - parseInt(a[sc_scoreColumn]));
        break;
        
        case "gold":
            chosenMapArray.sort((a,b) => parseInt(b[sc_goldColumn]) - parseInt(a[sc_goldColumn]));
        break;
        
        case "mutators":
            chosenMapArray.sort((a,b) => parseInt(b[sc_numOfMutsColumn]) - parseInt(a[sc_numOfMutsColumn]));
        break;
        
        case "version":
            chosenMapArray.sort((a,b) => parseFloat(b[sc_versionColumn]) - parseFloat(a[sc_versionColumn]));
        break;

        case "weapon":
            chosenMapArray.sort((a,b) => {
                    const weaponA = a[sc_weaponColumn].toUpperCase(); //console.log("A: " + nameA);
                    const weaponB = b[sc_weaponColumn].toUpperCase(); //console.log("B: " + nameB);
                    if (weaponA < weaponB) { return -1; }
                    if (weaponA > weaponB) { return  1; }
                    // names must be equal 
                    return 0;    
                } );
        break;

        case "name":
            chosenMapArray.sort((a,b) => {
                    const nameA = a[sc_nameColumn].toUpperCase(); //console.log("A: " + nameA);
                    const nameB = b[sc_nameColumn].toUpperCase(); //console.log("B: " + nameB);
                    if (nameA < nameB) { return -1; }
                    if (nameA > nameB) { return  1; }
                    // names must be equal 
                    return 0;    
                } );
        break;

        case "mapName":
            chosenMapArray.sort((a,b) => {
                    const mapA = a[sc_levelColumn].toUpperCase(); //console.log("A: " + nameA);
                    const mapB = b[sc_levelColumn].toUpperCase(); //console.log("B: " + nameB);
                    if (mapA < mapB) { return -1; }
                    if (mapA > mapB) { return  1; }
                    // names must be equal 
                    return 0;    
                } );
        break;

        case "date":
                chosenMapArray.sort((a,b) => {
                    const dateA = a[sc_subDateColumn]; 
                    const dateB = b[sc_subDateColumn]; 
                    if (dateA > dateB) { return -1; }
                    if (dateA < dateB) { return  1; }
                } );
        break;
    }

    // Sett all mutator column with -1 back to unknown
    for (let i = 0; i < chosenMapArray.length; i++)
    {
        chosenRow       = chosenMapArray[i];
        chosenMutString = chosenRow[sc_numOfMutsColumn];
        chosenVerString = chosenRow[sc_versionColumn];

        if (chosenMutString == "-1")
        {
            // console.log("i: " + i + ", " + chosenRow[sc_positionColumn] + " setting back to unknown " + chosenRow[i]);
            chosenRow[sc_numOfMutsColumn] = "unknown";
        }
        if (chosenVerString == "-1")
        {
            // console.log("i: " + i + ", " + chosenRow[sc_positionColumn] + " setting back to unknown " + chosenRow[i]);
            chosenRow[sc_versionColumn] = "unknown";
        }
    }
    // console.log("--- chosenMapArray ordered -----------------------------------");
    // console.log(chosenMapArray);

    if (!sortDown)
    {
        let oldArray = chosenMapArray;
        let newArray = new Array()
        let j = 0;
        for (let i = oldArray.length - 1; i >= 0; i--)
        {
            newArray[j] = oldArray[i];
            j++; 
        }
        chosenMapArray = newArray
        // console.log("--------------------------------------");
        // console.log(chosenMapArray);
    }
    sortDown = !sortDown;
    ////////////////////////////////////////////////////////////////

     // CREATE ARRAYS FOR EACH VALUE TYPE
	let position = new Array();
	let names = new Array();
	let score = new Array();
	let coins = new Array();
	let date = new Array();
	// let proof = new Array();
    let mutators = new Array();
    let subID = new Array();
    let version = new Array();
    let usedWeapon = new Array();
    let subIndex = new Array();

    // ASSIGN EACH VALUE TYPE
	for (let i = 0; i < chosenMapArray.length; i++)
	{
		chosenRow = chosenMapArray[i];;

        position[i]   = chosenRow[sc_positionColumn];
		names[i]      = chosenRow[sc_nameColumn];
		score[i]      = chosenRow[sc_scoreColumn];
		coins[i]      = chosenRow[sc_goldColumn];
		date[i]       = chosenRow[sc_userDateColumn];
        subID[i]      = chosenRow[sc_subIDColumn];
        mutators[i]   = chosenRow[sc_numOfMutsColumn];
        version[i]    = chosenRow[sc_versionColumn];
        usedWeapon[i] = chosenRow[sc_weaponColumn];
        subIndex[i]   = chosenRow[sc_sudIndexColumn];
	}

    // GET EACH TABLE COLUMN
	const tPosition = document.getElementsByClassName("position");
	const tNames    = document.getElementsByClassName("name");
	const tScore    = document.getElementsByClassName("score");
	const tCoins    = document.getElementsByClassName("coins");
	const tDate     = document.getElementsByClassName("date");
    //const tProof    = document.getElementsByClassName("proof");
    const tMutNums  = document.getElementsByClassName("mutNums");
    const tVersion  = document.getElementsByClassName("version");
    const tWeapon   = document.getElementsByClassName("usedWeapon");
    //const tSubID    = document.getElementsByClassName("subID");

	let tableRows = document.getElementsByClassName("scoreTableRow");

    for (let i = 0; i < tableRows.length; i++)
    {
        tableRows[i].style.display = "table-row";
    }

    // REST TEXT INSIDE CELLS
	// for (let k = 0; k < tableRows.length; k++)
	// {
	// 	tPosition[k].textContent = "";
	// 	tNames[k].textContent    = "";
	// 	tScore[k].textContent    = "";
	// 	tCoins[k].textContent    = "";
	// 	tDate[k].textContent     = "";
    //  tMutNums[k].textContent  = "";
    //  tVersion[k].textContent  = "";
    //  tWeapon[k].textContent   = "";
    //  // tSubID[k].textContent = "";
	// }

    // ASSIGN TEXT INSIDE EACH CELL
	for (let k = 0; k < chosenMapArray.length; k++)
	{
		tPosition[k].textContent = position[k];
		tNames[k].textContent    = names[k];

        tScore[k].textContent   = SplitScore(score[k]);
		tCoins[k].textContent   = coins[k];
        tMutNums[k].textContent = mutators[k];
		tDate[k].textContent    = FormatSubmissionDate(date[k]);
        tVersion[k].textContent = FormatVersionNumber(version[k]);
        tWeapon[k].textContent  = usedWeapon[k];
        
        tableRows[k].addEventListener("click",() => { ShowSubInfo(subIndex[k],true) },false,);
	}
    // HIDE ALL EMPTY ROWS
    for (let i = chosenMapArray.length; i < tableRows.length; i++)
    {
        tableRows[i].style.display = "none";
    }
    // console.log(sortDown);
}