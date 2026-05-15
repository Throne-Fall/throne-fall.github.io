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