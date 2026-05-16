	
	// SOME SHITTY OLD STACK OVERFLOW CODE

	// Get the user-agent string 
	let userAgentString = navigator.userAgent; 
	// Detect Chrome 
	let chromeAgent = userAgentString.indexOf("Chrome") > -1; 
	// Detect Internet Explorer 
	let IExplorerAgent = userAgentString.indexOf("MSIE") > -1 || userAgentString.indexOf("rv:") > -1; 
	// Detect Firefox 
	let firefoxAgent = userAgentString.indexOf("Firefox") > -1; 
	// Detect Safari 
	let safariAgent = userAgentString.indexOf("Safari") > -1; 
		  
	// Discard Safari since it also matches Chrome 
	if ((chromeAgent) && (safariAgent))  
	{	safariAgent = false; 	}
  
	// Detect Opera 
	let operaAgent = userAgentString.indexOf("OP") > -1; 
	// Discard Chrome since it also matches Opera      
	if ((chromeAgent) && (operaAgent))  
	{	chromeAgent = false; 	} 
	// if ((IExplorerAgent) && (firefoxAgent))
	// {	IExplorerAgent = false 	}

	if (IExplorerAgent && !firefoxAgent)
	{
		console.log("UNSOPPORTED BROWSER");
		const bodyHTML = "<center> <strong> <span style=\"font-size: 3rem; color:white;\"> Internet Explorer isn't supported!</span> </strong> <br>" +
                            "<h3 style=\"font-weight: bold; color:white;\">Use any modern web browser like Firefox.</h3> <br>" +
                            "<img src=\"https://media.tenor.com/images/88eb7114fe68416d13be491222096bf0/tenor.gif\"/> <hr>" +
                            "<a href=\"https://store.steampowered.com/app/2239150/Thronefall\"> <button type=\"button\" class=\"btn btn-warning dropShadow whiteGradient\"> <strong> Get Thronefall </strong> </button> </a>" +
                            "<a href=\"https://www.mozilla.org/firefox/new/\"> <button type=\"button\" class=\"btn btn-warning dropShadow whiteGradient\"> <strong> Get modern browser </strong> </button> </a>" +
                            "</center> ";
		document.querySelector("body").innerHTML = bodyHTML;
        document.body.style.fontFamily = "Arial"
	}