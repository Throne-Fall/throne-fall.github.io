currentTheme = "light";

function CheckSavedTheme()
{
    currentTheme = GetCookie("Theme");
    // console.log("SAVED: " + currentTheme);

    switch(currentTheme)
    {
        default:
            console.warn("CheckSavedTheme | Invalid value for currentTheme: " + currentTheme);
            SetLightTheme();
        break;

        case "light":
            SetLightTheme();
        break;
        
        case "dark":
            SetDarkTheme();
        break;
    }
}

function ToggleThemes ()
{
    currentTheme = GetCookie("Theme");
    switch(currentTheme)
    {
        default:
            console.warn("ToggleThemes | Invalid value for currentTheme: " + currentTheme);
            SetLightTheme();
        break;
        
        case "light":
            SetDarkTheme();
        break;
            
        case "dark":
            SetLightTheme();
        break;
    }
    // console.log("ToggleThemes | " + currentTheme);
    // SetOptionsWinValues();
}

function SetDarkTheme ()
{
    // console.log("Setting dark theme");
    SetCookie("Theme","dark");
    currentTheme = "dark";
    time = "night";

	$("#pageThemeSection")[0].innerHTML = '<link rel="stylesheet" href="/assets/styles/dark.css">';
    $("#pageThemeToggleImg")[0].src = "/assets/images/moon.webp";
    $("#searchButtonImage")[0].src = "/assets/images/icons/misc/search white.png";

    // Add styling to tables
	const tables = $("table");
	const tHead  = $("thead");
	const tBody  = $("tbody");
	if (tables[0] != undefined)
	{
		// console.log("styling tables");
		for (let i = 0; i < tables.length; i++) 
		{
			// <table>
			tables[i].classList.add("table-dark");
			// <thead>
			tHead[i].classList.add("table-light");
			tHead[i].classList.remove("table-dark");
		}
	}
    SelectRandomBackground();
}

function SetLightTheme ()
{
      // console.log("Setting dark theme");
    SetCookie("Theme","light");
    currentTheme = "light";
    time = "day";

    $("#pageThemeSection")[0].innerHTML = '';
    $("#pageThemeToggleImg")[0].src = "/assets/images/sun.webp";
    $("#searchButtonImage")[0].src = "/assets/images/icons/misc/search black.png";

    // Add styling to tables
	const tables = $("table");
	const tHead  = $("thead");
	const tBody  = $("tbody");
	if (tables[0] != undefined)
	{
		// console.log("styling tables");
		for (let i = 0; i < tables.length; i++) 
		{
			// <table>
			tables[i].classList.remove("table-dark");
			// <thead>
			tHead[i].classList.add("table-dark");
			tHead[i].classList.remove("table-light");
		}
	}
    SelectRandomBackground();
}