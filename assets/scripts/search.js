// 
// Wiki search - 08/09/2024
// 
let currentSearchMode = "names";

TurnSitemapToListOfPages();

async function DownloadSitemap ()
{
    const sitemapData = await fetch("/sitemap.xml");
    const sitemapText = await sitemapData.text();

    return sitemapText;
}

let pageNamesList = new Array();
let pagePathsList = new Array();

let pageAndPathList = new Array();
async function TurnSitemapToListOfPages ()
{
    let sMapText = await DownloadSitemap();
    // console.log(sMapText);

    let splitText = sMapText.split('<?xml version="1.0" encoding="UTF-8"?>').join('') // XML header
                            .split('W H A T   A R E   Y O U  D O I N G   I N   M Y   S I T E M A P ? ! ').join('') // Easter egg message
                            .split('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">').join('') // XML body tag
                            .split('https://www.youtube.com/v/dQw4w9WgXcQ').join('') // Domain
                            .split('<url>')    .join('') // XML url section
                            .split('<loc>')    .join('') // XML address
                            .split('</url>')   .join('') // XML url section closed
                            .split('</loc>')   .join('') // XML address section close
                            .split('</urlset>').join('') // XML body close
                            .split('\t')       .join('') // TABs
                            .split('    ')     .join('') // 4 spaces
                            .split('<!--')     .join('') // HTML comments
                            .split('-->')      .join('') // HTML comments close
                            .split('\r')       .join('') // Carriage Return
                            .split(' ')        .join('') // 1 space
                            .split('\n') // line breaks

    // console.log("-- SPLIT TEST --");
    // console.log(splitText);

    let pageListArray = new Array();
    for (let i = 0; i < splitText.length; i++)
    {
        if (splitText[i].includes(".html") && !(splitText[i] == "/index.html"))
        {
            pageListArray[pageListArray.length] = splitText[i];
        }
    }
    // console.log(pageListArray);
    // console.log("=================================================================");

    let listHumanFormat = new Array();
    for (let i = 0; i < pageListArray.length; i++)
    {
        splitName = pageListArray[i].split("/");
        
        if (splitName[splitName.length - 1].includes("index"))
        {
            // console.log(splitName[splitName.length - 1] = (splitName[splitName.length - 2] + " list") );
            splitName[splitName.length - 1] = splitName[splitName.length - 2] + " list";
        }

        let replaceDashWithSpace = splitName[splitName.length - 1].split("-").join(" ");
        let removeHtmlExtension  = replaceDashWithSpace.split(".html").join("");
        let firstLetterUppercase = UppercaseFirstLetter(removeHtmlExtension);

        listHumanFormat[listHumanFormat.length] = firstLetterUppercase;
        // listHumanFormat[listHumanFormat.length] = UppercaseFirstLetter(splitName[splitName.length - 1].split("-").join(" ").split(".html").join("")); 

        // console.log(listHumanFormat[listHumanFormat.length - 1]);
    }
    // console.log(listHumanFormat);

    pageNamesList = listHumanFormat;
    pagePathsList = pageListArray;

    for (let i = 0; i < pagePathsList.length; i++)
    {

        pageAndPathList[pageAndPathList.length] = [pageNamesList[i],pagePathsList[i]];
    }
    // console.log("PAGE AND PATH LIST")
    // console.log(pageAndPathList);
    
    // DowbloadAndExtractAllPages();
    ProcessPageIndex();
    SpawnSearchResultsTableRows();
    InitSrcResTable();

    if (location.hash == undefined || location.hash == "")
    {
        return;
    }
    let urlHash = GetAddressHash().split("=")[1];    
    DisplaySearchResultsTable(SearchInPageLists(urlHash));
    $("#pageSearchInputBox")[0].value = urlHash;
}

function ChangeSearchMode (modeName)
{
    $("#contentSearchInputBox")[0].style.display = "block";
    $("#pageSearchInputBox")[0].style.display = "block";
    
    $("#contentSearchInputBox")[0].value = "";
    $("#pageSearchInputBox")   [0].value = "";

    switch (modeName)
    {
        default:
            currentSearchMode = "names";
            $("#contentSearchInputBox")[0].style.display = "none";
            break;

        case "names":
            currentSearchMode = "names";
            $("#contentSearchInputBox")[0].style.display = "none";
            break;

        case "content":
            location.hash = "";
            currentSearchMode = "content";
            $("#pageSearchInputBox")[0].style.display = "none";
            break;
    }
}

function SearchInPageLists (query)
{
    // console.time("searcnPages");
    // console.log("QUERY: " + query);
    let searchResults = new Array();
    let queryParts = query.split("");

    location.hash = "";
    if (queryParts.length < 2)
    {
        return "too short";
    }
    location.hash = "query=" + query;

    for (let i = 0; i < pageAndPathList.length; i++)
    {
        chosenRow = pageAndPathList[i];
        if (chosenRow[1].toLowerCase().includes( query.toLowerCase() ))
        {
            searchResults[searchResults.length] = chosenRow;
        }
    }
    // console.log(searchResults);
    // console.timeEnd("searcnPages");
    return searchResults;
}

const maxSearchResultsRows = 300;
function DisplaySearchResultsTable (_results)
{
    // console.log(_results);

    ShowSearchResultsTableRows(0,maxSearchResultsRows);

    let srcResTableRow = $(".searchResultsTableRow");
    let srcResNameCells = $(".srcTable-PageName");
    let srcResLocaCells = $(".srcTable-Location");

    if (_results == "too short" || _results.length < 1)
    {
        srcResNameCells[0].innerHTML = "<em>No results</em>";
        srcResLocaCells[0].innerHTML = "";
        $("#searchResultsInfoText")[0].textContent = "Results: 0";
        HideSearchResultsTableRows(1,maxSearchResultsRows);
        return;
    }

    _results.sort((a,b) => {
        const itemA = a[0].toUpperCase();
        const itemB = b[0].toUpperCase();
        if (itemA < itemB) { return -1; }
        if (itemA > itemB) { return  1; }
        return 0; // names must be equal 
    } );

    let fancifiedPathArr;
    let fancifiedPathString;

    for (let i = 0; i < _results.length; i++)
    {
        chosenRow = _results[i];
        // console.log(i + " : " + chosenRow);

        fancifiedPathArr = chosenRow[1].split("/");
        fancifiedPathArr[0] = "wiki";
        fancifiedPathString = fancifiedPathArr.join(" > ").split(".html").join("");
    
        srcResNameCells[i].innerHTML   = "<a href='" + chosenRow[1] + "'>" + chosenRow[0] + "</a>";
        srcResLocaCells[i].textContent = fancifiedPathString;
    }

    $("#searchResultsInfoText")[0].textContent = "Results: " + _results.length;
    HideSearchResultsTableRows(_results.length,maxSearchResultsRows);
}

function InitSrcResTable ()
{
    HideSearchResultsTableRows(0,maxSearchResultsRows);
    ShowSearchResultsTableRows(0,1);

    let srcResNameCells = $(".srcTable-PageName");
    let srcResLocaCells = $(".srcTable-Location");
    
    srcResNameCells[0].innerHTML = "<em>No results</em>";
    srcResLocaCells[0].innerHTML = "";
}

function HideSearchResultsTableRows (startIndex,endIndex)
{
    let srcResTableRow = $(".searchResultsTableRow");
    for (let i = startIndex; i < endIndex + 1; i++)
    {
        srcResTableRow[i].style.display = "none";
    }
}
function ShowSearchResultsTableRows (startIndex,endIndex)
{
    let srcResTableRow = $(".searchResultsTableRow");
    for (let i = startIndex; i < endIndex; i++)
    {
        srcResTableRow[i].style.display = "table-row";
    }
}

function SpawnSearchResultsTableRows ()
{
    let srcResTableRow = $(".searchResultsTableRow");
    let srcResTableBody = $("#searchResultsTableBody");
    let newSrcTableRow;

    for (let i = 0; i < maxSearchResultsRows; i++)
    {
        newSrcTableRow = srcResTableRow[0].cloneNode(true);
        srcResTableBody.append(newSrcTableRow);
    }

    srcResTableRow = $(".searchResultsTableRow");
    for (let i = 0; i < srcResTableRow.length; i++)
    {
        srcResTableRow[0].style.display = "none";
    }
}

function UppercaseFirstLetter (wordToCUpcase)
{
    let wordParts = wordToCUpcase.split("");
    wordParts[0] = wordParts[0].toUpperCase()
    let capedWord = wordParts.join("");

    return capedWord;
}

/////////////////////////////
// SEARCH CONTENT OF PAGES //
/////////////////////////////

function ExtractPageContent(html) 
{
    return new DOMParser()
        .parseFromString(html, "text/html")
        .documentElement.textContent;
}

async function DownloadPageHtml (_url)
{
    const fileData = await fetch(_url);
    const fileText = await fileData.text();

    return fileText;
}

async function DownloadAndExtractText (_url)
{
    const pageHtml = await DownloadPageHtml(_url);
    // console.log(pageHtml);

    let removeHead   = pageHtml.split("<body>")[1];
    let removeFooter = removeHead.split("</body>")[0];
    let removeCRs    = removeFooter.split("\r").join("");
    let removeTabs   = removeCRs.split("\t").join("");

    let extractedText = ExtractPageContent(removeTabs);

    let textLines = extractedText.split("\n");
    let cleanText = new Array();
    for (let i = 0; i < textLines.length; i++)
    {
        if (textLines[i] == "")
        {
            continue;
        }
        cleanText[cleanText.length] = textLines[i].split("  ").join("");
    }

    let cleanTextPass2 = new Array();
    for (let i = 0; i < cleanText.length; i++)
    {
        if (cleanText[i] == "" || cleanText[i] == " ")
        {
            continue;
        }
        cleanTextPass2[cleanTextPass2.length] = cleanText[i];
    }

    // console.log(cleanTextPass2);
    // console.log(cleanTextPass2.join(" "));
}

let extractedPagesText   = new Array();
let extractPagesAllInOne = new Array();
async function DowbloadAndExtractAllPages ()
{
    if (location.origin.includes("throne-fall.github.io"))
    {
        console.error("DowbloadAndExtractAllPages() cannot be run on this server");
        return;
    }

    // Disable content search radio
    $("#searchModeContentRadio")[0].disabled = true;
    // Start timer
    console.time("all_pages");

    // Download each page
    for (let i = 0; i < pagePathsList.length; i++)
    {
        const pageHtml = await DownloadPageHtml(pagePathsList[i]);
        // console.log(pageHtml);

        let removeHead   = pageHtml.split("<body>")[1];
        let removeFooter = removeHead.split("</body>")[0];
        let removeCRs    = removeFooter.split("\r").join("");
        let removeTabs   = removeCRs.split("\t").join("");

        let extractedText = ExtractPageContent(removeTabs);

        let textLines = extractedText.split("\n");
        let cleanText = new Array();
        for (let i = 0; i < textLines.length; i++)
        {
            if (textLines[i] == "")
            {
                continue;
            }
            cleanText[cleanText.length] = textLines[i].split("  ").join("");
        }

        let cleanTextPass2 = new Array();
        for (let i = 0; i < cleanText.length; i++)
        {
            if (cleanText[i] == "" || cleanText[i] == " ")
            {
                continue;
            }
            cleanTextPass2[cleanTextPass2.length] = cleanText[i];
        }

        // console.log(cleanTextPass2);
        // console.log(cleanTextPass2.join(" "));
        // console.log(i + "/" + pagePathsList.length)

        let progressPercent = 100 * i / pagePathsList.length;
        $("#searchModeContentLabel")[0].textContent = "Page content (" + Math.round(progressPercent) + "%)";

        extractedPagesText[extractedPagesText.length] = cleanTextPass2.join(" ");

        extractPagesAllInOne[extractPagesAllInOne.length] = [pageNamesList[i],pagePathsList[i],extractedPagesText[i]];
    }
    
    // console.log("================================================");
    console.log(extractPagesAllInOne);
    console.timeEnd("all_pages");

    $("#searchModeContentRadio")[0].disabled = false;
    $("#searchModeContentLabel")[0].textContent = "Page content";
}

async function DownloadPageIndex()
{
    const indexData = await fetch("/misc/pageIndex.json");
    const indexText = await indexData.text();
    // console.log(indexText);
    // console.log(JSON.parse(indexText));
    const indexArray = JSON.parse(indexText);
    return indexArray;
}

async function ProcessPageIndex () 
{
    console.time("INDEX");
    const pageIndex = await DownloadPageIndex();
    // console.log(pageIndex);

    extractPagesAllInOne = pageIndex;
    // console.log(extractPagesAllInOne);
    console.timeEnd("INDEX");
}

function SearchPageContents (_query)
{
    let queryParts = _query.split("");
    if (queryParts.length < 2)
    {
        return "too short";
    }
    
    let contentSearchResults = new Array();
    for (let i = 0; i < extractPagesAllInOne.length; i++)
    {
        chosenRow = extractPagesAllInOne[i];

        if (chosenRow[2].toLowerCase().includes(_query.toLowerCase()))
        {
            contentSearchResults[contentSearchResults.length] = chosenRow;
        }
    }
    // console.log(contentSearchResults);
    return  contentSearchResults;
}