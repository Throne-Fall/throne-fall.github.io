let chartTextColour = "#fff";
function SetGlobalChartsProperties ()
{
    window.Apex = 
    {
        chart:
        {
            foreColor: chartTextColour,
            toolbar:
            {
                tools:
                {
                    download: false,
                }
            },
        },
    }
}

function DrawAllCharts ()
{
    let colours = [];
	// OS
	const osNames  = ["Windows" , "Android" , "Mac OS" , "iOS" , "Linux" , "Other"];
	const osValues = [  66.5    ,   11.6    ,   8.4    ,  7.3  ,   4.8   ,   0.5  ];
	      colours  = ["#285b9c","#008000","#1d7aff","#808080","#d4b92c","#000"];
	DrawPieChart(osNames,osValues,"osShare",colours);

    // Browser
    const browserNanes  = ["Chrome" , "Firefox" , "Safari" , "Edge" , "Opera" , "Other"];
    const browserValues = [  61.5   ,   17.9    ,   7.8    ,   5.6  ,    4    ,   3.2  ];
          colours       = ["#008000","#ea9b0b","#02c8f1","#0d529b","#ae0909","#000000"];
    DrawPieChart(browserNanes,browserValues,"browserShare",colours);

    // Hourly visits
    const hourVisitsNames  = ["0",  "1",  "2",  "3", 
                              "4",  "5",  "6",  "7", 
                              "8",  "9",  "10", "11", 
                              "12", "13", "14", "15", 
                              "16", "17", "18", "19", 
                              "20", "21", "22", "23"];
    const hourVisitsValues = [16.2, 16.2, 13.8, 15.4, 
                              14.4, 15.2, 13.2, 15.3, 
                              15.2, 15.9, 14.4, 13.1,
                              14.8, 17.1, 17.3, 20.5, 
                              20,   20.5, 19.4, 21.3,
                              20.1, 21.3, 17.5, 15.8 ];
    DrawBarGraph(hourVisitsNames,hourVisitsValues,"hourlyVisits");

    // Week day visits
    const wdvNames = ["Mon","Tue" ,"Wed" ,"Thu" ,"Fri" ,"Sat" ,"Sun" ];
    const wdvValue = [65.4 , 61.78, 55.63, 54.83, 49.58, 56.03, 60.51];
    DrawBarGraph(wdvNames,wdvValue,"weekDayVisits");

    // Monthly visits
    const monVisName = ["Apr", "May", "Jun",
                        "Jul", "Aug", "Sep",
                        "Oct", "Nov", "Dec"];
    const monVisVals = [5410 , 4516 , 6444,
                        7843 , 5920 , 7069,
                        39118, 17912, 12760];
    DrawBarGraph(monVisName,monVisVals,"monthlyVisits",false,20000);
}

function DrawPieChart (dataLabel,dataValue,graphName,_colors)
{
    // Clear previous chart
    $("#" + graphName + "-graph")[0].innerHTML = ""; 

    const options =
    {
        chart:
        {   
            type: "pie",
            width: "100%",
            height: "100%",
        },
        legend:
        {
            position: "bottom",
        },
        colors: _colors,
        series: dataValue,
        labels: dataLabel,
    }
    const chart = new ApexCharts(document.querySelector("#" + graphName + "-graph"), options);
    chart.render();
}

let graphHeight = "99%";
function DrawLineGraph (dataLabel,dataValue,graphName,isCompact,showDataLabels,_colors)
{
    graphHeight = "99%";
    // Clear previous chart
    $("#" + graphName + "Graph")[0].innerHTML = ""; 
    if (_colors == undefined)
    {   _colors = [defaultGraphColour]  }
    
    if (showDataLabels == undefined)
    {   showDataLabels = false;   }

    if (isCompact == undefined)
    {   isCompact = false;   }

    if (isCompact == true)
    {   graphHeight = "64px";  }

    let options =
    {
        chart: 
        {
            type: 'area',
            height: graphHeight,
            width: "100%",
            sparkline: 
            {
                enabled: isCompact,
            }
        },
        colors: _colors,
        series: 
        [{
            name: '',
            data: dataValue,
        }],
        title: 
        {
            // text: graphTitle,
            align: "center",
        },
        yaxis:
        {
            min: 0,
        },
        xaxis: 
        {
            categories: dataLabel,
            labels:
            {
                show: true,
                rotate: 0,
                style:
                {
                    // fontSize: "0.75rem"
                }
            }
        },
        stroke:
        {
            curve: "smooth",
        },
        grid: 
        {
            show: true,
            borderColor: '#90A4AE',
            strokeDashArray: 0,
            position: 'back',
            xaxis: 
            {
                lines: 
                {
                    show: false,
                },
            },   
            yaxis: 
            {
                lines: 
                {
                    show: !isCompact,
                }
            },  
            row: 
            {
                colors: undefined,
                opacity: 0.5
            },  
            column: 
            {
                colors: undefined,
                opacity: 0.25,
            },  
            padding: 
            {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },  
        },
        dataLabels:
        {
            // Always hidden because it ,ake the graph a lot clenrer
            enabled: showDataLabels,
        },
    }
    const chart = new ApexCharts(document.querySelector("#" + graphName + "Graph"), options);
    chart.render();
}

function DrawBarGraph (dataLabel,dataValue,graphName,drawHorizontally,maxHeight)
{
    graphHeight = "99%";
    // Clear previous chart
    $("#" + graphName + "-graph")[0].innerHTML = ""; 
    if (drawHorizontally == undefined)
    {  drawHorizontally = false  }

    if (maxHeight == undefined)
    {
        maxHeight = undefined;
    }
    scaleMax = maxHeight

    let options =
    {
        chart:
        {
            type: "bar",
            width: "100%",
            height: graphHeight,
        },
        colors: ["#ffa700"],
        plotOptions: 
        {
            bar: 
            {
                borderRadius: 5,
                borderRadiusApplication: 'end',
                horizontal: drawHorizontally,
            }
        },
        series:
        [
            {
                data: dataValue,
                name: "",
            }
        ],
        xaxis:
        {
            categories: dataLabel,
        },
        yaxis:
        {
            min: 0,
            max: scaleMax,
        },
        grid: 
        {
            borderColor: '#aec0c2',
        },
    }
    const chart = new ApexCharts(document.querySelector("#" + graphName + "-graph"), options);
    chart.render();
}