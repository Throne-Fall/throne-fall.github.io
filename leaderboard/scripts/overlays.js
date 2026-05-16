// 
// SUBMISSION WINDOW
// 
const submitWinString = "submit";
function OpenSubmitWindow() 
{
	// 
	const submitWindow = document.getElementById("submitWindowBakcground");
	const overlayWindow = document.getElementById("overlayWindow");

	submitWindow.classList.remove("windowCloseAnim");
	overlayWindow.classList.remove("overlayHideAnim");

	overlayWindow.style.display = "block";
	location.hash = submitWinString;

	// HideChoiceButtons("score");	
}
function CloseSubmitWindow ()
{
	
	const submitWindow  = document.getElementById("submitWindowBakcground");
	const overlayWindow = document.getElementById("overlayWindow");
	const windowIframe  = document.getElementById("submitFormFrame");

	submitWindow.classList.remove("windowOpenAnim");
	
	submitWindow.classList.add("windowCloseAnim");
		
	Sleep(500).then(() => 
	{ 
		overlayWindow.classList.add("overlayHideAnim");
	} );
	Sleep(750).then(() => 
	{ 
		overlayWindow.style.display = "none";
	} );
	
	windowIframe.src = "";
	location.hash = "";
	// ShowChoiceButtons();
	// document.getElementById("overlayWindow").innerHTML = "";
}

function ShowChoiceButtons ()
{
	document.getElementById("chooseSubTypeButtons").style.display = "block";
	document.getElementById("submiFormDiv").style.display = "none";
	
	document.getElementById("submitFormFrame").src = ""
}
function HideChoiceButtons (type)
{
	// console.log("HideChoiceButtons " + currentTheme);
	document.getElementById("chooseSubTypeButtons").style.display = "none";
	document.getElementById("submiFormDiv").style.display = "block";
	const submitWinTitle = document.getElementById("titleBarText");

	console.log(type);
	if (type == "time")
	{
		submitWinTitle.textContent = "Submit new speed-run";

		if (currentTheme == "dark")
		{
			document.getElementById("submitFormFrame").src = "./submit/legacy/timeDark.html"
		}
		else
		{
			document.getElementById("submitFormFrame").src = "./submit/legacy/time.html"
		}
	}
	else
	{
		submitWinTitle.textContent = "Submit new high-score";
		document.getElementById("submitFormFrame").src = "https://ghostminer.maweb.eu/submit/?id=" + formID + "#" + currentTheme + "&" + "N/A" + "&" + 
																												 + "&" + window.innerWidth + "x" + window.innerHeight;
		// document.getElementById("submitFormFrame").src = "./img/rightback.png";
	}	
}

// 
// R U L E S 
// 
function ShowRulesWindow ()
{
	const rulesWindow 	= document.getElementById("rulesWindowsBackground");
	const overlayWindow = document.getElementById("rulesWindow");

	overlayWindow.classList.remove("overlayHideAnim");
	rulesWindow.classList  .remove("windowCloseAnim");

	rulesWindow.classList  .add	  ("windowOpenAnim");
	overlayWindow.style.display = "block";
}

function HideRulesWindow ()
{
	const rulesWindow 	= document.getElementById("rulesWindowsBackground");
	const overlayWindow = document.getElementById("rulesWindow");

	rulesWindow.classList.remove("windowOpenAnim");
	rulesWindow.classList.add("windowCloseAnim");
	
	// document.getElementById("overlayWindow").style.display = "none";
	Sleep(500).then(() => 
	{ 
		overlayWindow.classList.add("overlayHideAnim");
	} );
	Sleep(750).then(() => 
	{ 
		overlayWindow.style.display = "none";
	} );
	
	// document.getElementById("rulesWindow").style.display = "none";
}

