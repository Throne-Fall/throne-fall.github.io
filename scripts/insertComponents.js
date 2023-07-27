// Script that inject content of "_sidebar.html" in the "mainNavBarDiv" component
(   async function () 
    {
        const navHTMLRequest = await fetch('./parts/sidebar.html'); // REtrueve the file
        const navHTML        = await navHTMLRequest.text(); // Extract its content
        document.querySelector('#websiteSideBar').innerHTML = navHTML; // Insert cintent into the selected div

        const footerHTMLRequest = await fetch("./parts/footer.html");
        const footerHTML = await footerHTMLRequest.text();
        document.querySelector("#footerDiv").innerHTML = footerHTML;

        const mobiMenuTMLRequest = await fetch('./parts/mobiNav.html'); // REtrueve the file
        const mobiMenuHTML        = await mobiMenuTMLRequest.text(); // Extract its content
        document.querySelector('#mobiNavDiv').innerHTML = mobiMenuHTML; // Insert cintent into the selected div 

        const mobiNavHTMLRequest = await fetch('./parts/sidebar.html'); // REtrueve the file
        const mobiNavHTML        = await mobiNavHTMLRequest.text(); // Extract its content
        document.querySelector('#mobiNavMenu').innerHTML = mobiNavHTML; // Insert cintent into the selected div 
    } 
) ();