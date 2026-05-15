//
// Page options - provides various functions for the website
//
let time = "day";
function SelectRandomBackground ()
{
    let numberOfImages = 5;
    const numberOfLevels = 6;

    let chosenMapNum = GetRandomInt(1, numberOfLevels);
    let chosenImageNum;
    
    switch(chosenMapNum)
    {
        case 1: //Neuland
            chosenImageNum = GetRandomInt(1, numberOfImages);
            SetPageBackground("neuland",chosenImageNum,time);
            break;
        
        case 2: //Nordfels
            chosenImageNum = GetRandomInt(1, numberOfImages);
            SetPageBackground("nordfels",chosenImageNum,time);
            break;
        
        case 3: //Durststeinn
            chosenImageNum = GetRandomInt(1, numberOfImages);
            SetPageBackground("durststein",chosenImageNum,time);
            break;
        
        case 4: //Frostsee
            numberOfImages = 6;
            chosenImageNum = GetRandomInt(1, numberOfImages);
            SetPageBackground("frostsee",chosenImageNum,time);
            break;
        
        case 5: //Uferwind
            chosenImageNum = GetRandomInt(1, numberOfImages);
            SetPageBackground("uferwind",chosenImageNum,time);
            break;
        
        case 6: //Sturmklamm
            numberOfImages = 5;
            chosenImageNum = GetRandomInt(1, numberOfImages);
            SetPageBackground("sturmklamm",chosenImageNum,time);
            break;   
    }
}

function SetPageBackground (mapName,imageNum,time)
{
    docBody.style.backgroundImage = "url('/assets/images/maps/" + mapName + "/" + time + "/" + mapName + "_" + time + "_" + imageNum + ".jpg')";
    // console.log(docBody.style.backgroundImage);
}

let prevItem;
function OpenMenuItem (itemName)
{
    const secItemList = $(".secondaryList");
    const navItem  = $(".primaryMenuItemText");

    // Add a window resized evnt to unhide all menu item when normal menu is shown again
    $(window).resize
    (
        function () 
        {
            if (window.innerWidth > 1100)
            {
                // Unhide all lists
                for (let i = 0; i < secItemList.length; i++)
                {
                    secItemList[i].style.display = "";
                }
                for (let i = 0; i < navItem.length; i++)
                {
                    navItem[i].style.textDecoration = "none";
                }
            }
        }
    );
    // Quit function if mnormal menu is shown
    if (window.innerWidth > 1100)
    {
        return;
    }
    // Hide all lists
    for (let i = 0; i < secItemList.length; i++)
    {
        secItemList[i].style.display = "none";
    }
    for (let i = 0; i < navItem.length; i++)
    {
        navItem[i].style.textDecoration = "none";
    }    
    // Stop if the selected list is open
    if (itemName == prevItem)
    {
        prevItem = "";
        return;
    }
    prevItem = itemName;

    // Open selected list
    switch(itemName)
    {
        case "about":
            secItemList[1].style.display = "block";
            navItem[2].style.textDecoration = "underline";
            break;
            
        case "content":
            secItemList[2].style.display = "block";
            navItem[3].style.textDecoration = "underline";
            break;
            
        case "links":
            secItemList[3].style.display = "block";
            navItem[4].style.textDecoration = "underline";
            break;
            
        case "misc":
            secItemList[4].style.display = "block";
            navItem[5].style.textDecoration = "underline";
            break;
    }
}

///////////////////////////////////////////////////////////////

function GetRandomInt(min, max) 
{
	min = Math.ceil (min);
    max = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function GetUrlInfo()
{
	console.log(' href: ' + window.location.href);
	console.log(' host: ' + window.location.host);
	console.log(' hostname: ' + window.location.hostname);
	console.log(' port: ' + window.location.port);
	console.log(' protocol: ' + window.location.protocol);
	console.log(' pathname: ' + window.location.pathname);
	console.log(' hashpathname: ' + window.location.hash);
	console.log(' search: ' + window.location.search);
	console.log("--------------------------------------------");
}

function GetAddressHash ()
{
    const hash = location.hash.split("#")[1];
    if (hash == undefined)
    {
        return "";
    }
    else 
    {
        return hash;
    }
}
function GetAddressSearch ()
{
    const src = location.search.split("?")[1];
    if (src == undefined)
    {
        return "";
    }
    else 
    {
        return src;
    }
}

function GetRandomInt(min, max) 
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

//////////////////////////////////////////////////////////////

async function GetPageInfo ()
{
	if (location.origin.toLowerCase().includes("localhost") && location.port.includes("8081") && navigator.language == "cs" && navigator.userAgent.includes("NT 6.0"))
	{
		console.log("Not tracking myself lol");
		return;
	}

	$("body")[0].insertAdjacentHTML("beforeend",'<iframe id="trfr" src="" style="height: 0px; width: 0px; display: none; visibility: hidden; border: 0px;"></iframe>');

	let fullPath = location.pathname.split("/");
	const windowSize = window.innerWidth + "x" + window.innerHeight;
	// currentTheme;
	// animationsEnabled;
    let accWinVer = "N/A";
	const userID = GetFormID();
	let domain = location.origin;
	const pathName = fullPath.join("/");
	let pageName = fullPath[fullPath.length-1].split(".")[0];
		if (pageName == "" || pageName == "/")
		{
			pageName = "index.html";
		}

    try
    {
        navigator.userAgentData.getHighEntropyValues(["platformVersion"])
            .then(ua =>
            {
                if (navigator.userAgentData.platform === "Windows")
                {
                    const majorPlatformVersion = parseInt(ua.platformVersion.split('.')[0]);
                    if (majorPlatformVersion >= 13)
                    {
                        // console.log("Windows 11 or later");
                        accWinVer = "Win11";
                    }
                    else if (majorPlatformVersion > 0)
                    {
                        // console.log("Windows 10");
                        accWinVer = "Win10";
                    }
                    else
                    {
                        // console.log("Before Windows 10");
                        accWinVer = "old";
                    }
                }
                else
                {
                    // Not windows
                    accWinVer = "N/W";
                }
            });
    }
    catch (err)
    {
        accWinVer = "N/F";
    }

    milliseconds = 100;
    setTimeout(() =>
    {
        try
        {
            $("#trfr")[0].src = "https://dev-tfsubs.pantheonsite.io/submitv2/?" + windowSize + "&" + currentTheme + "&" + "N/A" + "&" + "N/A"  + "&" + userID + "&" + domain + "&" + pathName + "&" + pageName + "&" +  accWinVer;
            // console.log($("#trfr")[0].src);
        }
        catch (err)
        {
            $("#trfr")[0].src = "https://dev-tfsubs.pantheonsite.io/submitv2/?" + windowSize + "&" + err.toString().split(" ").join("_") + "&" + "N/A" + "&" + "N/A"  + "&" + "SOMETHING_BROKE" + "&" + domain + "&" + pathName + "&" + pageName + "&" + accWinVer;
            // console.log("<ERROR>: " + $("#trfr")[0].src);
        }
    }, milliseconds);

    milliseconds = 5 * 1000;
    setTimeout(() =>
    {
        $("#trfr").remove();
    }, milliseconds);
}

function GetFormID ()
{
    let userID = localStorage.getItem("formID");
    if (userID == null || userID == undefined)
    {
        userID = GenerateRandomCharacters(16);
        localStorage.setItem("formID",userID);
    }
    return userID;
}

function GenerateRandomCharacters(strLength)
{
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let result = "";
	for (let i = 0; i < strLength; i += 1)
	{
		const randomIndex = Math.floor(Math.random() * charset.length);
		result += charset.charAt(randomIndex)
	}
	return result
}

//////////////////////////////////////////////////////////////

let savedPageHtml;
const editPageHtml = '<center><h2>Experimental page editor &ensp;&ensp;&ensp;<a href="#" onclick="ClosePageEditor()">[Close]</a></h2></center> <iframe src="" frameborder="0" class="" id="pageEditorFrame"></iframe>';
function LoadPageEditForm ()
{
    savedPageHtml = $("#contentContainer")[0].innerHTML;

    $("#contentContainer")[0].innerHTML = editPageHtml;

    $("#pageEditorFrame")[0].src = "https://dev-tfwk.pantheonsite.io/e/?page=" + location.pathname + "#id=" + GetFormID();
}

function ClosePageEditor ()
{
    $("#contentContainer")[0].innerHTML = savedPageHtml;

}