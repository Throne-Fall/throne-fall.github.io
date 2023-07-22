// Script that inject content of "_sidebar.html" in the "mainNavBarDiv" component
(   async function () 
    {
        const navHTMLRequest = await fetch('./_parts/sidebar.html'); // REtrueve the file
        const navHTML        = await navHTMLRequest.text(); // Extract its content
        document.querySelector('.websiteSideBar').innerHTML = navHTML; // Insert cintent into the selected div

        const footerHTMLRequest = await fetch("./_parts/footer.html");
        const footerHTML = await footerHTMLRequest.text();
        document.querySelector("#footerDiv").innerHTML = footerHTML;
    } 
) ();