function PageReadyEvent()
{
    console.log("PAGE READY.\nWaiting for leaderboard.");
    // document.getElementById("scoreCategoryButton").classList.add("active");

    SelectRandomBackground(1);
    CheckSavedTheme();
    GetformID();
    SpawnTableRows();
    GetSubData();
    OpenSubmitFromURL();
    dummy2();
}
function EmbedPageReadyEvent()
{
    console.log("PAGE READY.\nWaiting for leaderboard.");

    // SelectRandomBackground(1);
    // CheckSavedFontStyle();
    // CheckSavedTheme();
    // CheckAnimState();

    GetformID();
    SpawnTableRows();
    GetSubData();
    // OpenSubmitFromURL();
}

let LbReady = false;
function LeaderBoarReadyEvent ()
{
    console.log("LEADERBOARD READY.");
    LbReady = true;

    ChangeTableData('Neuland',false); // Load Neuland subs

    ShowSubInfo(GetAdressHash(),false); // Open submission by its number
    FindSubmissionById(GetAdressHash()); // Open submission by its ID

    // $("#statisticsButtonHeader")[0].disabled = false;

    $("#nl_score_btn")[0].disabled = false;
    $("#nf_score_btn")[0].disabled = false;
    $("#ds_score_btn")[0].disabled = false;
    $("#fs_score_btn")[0].disabled = false;
    $("#uf_score_btn")[0].disabled = false;
    $("#st_score_btn")[0].disabled = false;
    $("#et_score_btn")[0].disabled = false;
    // $("#searchButton")[0].disabled = false;
    $("#ets1_score_btn")[0].disabled = false;
    $("#ets1_score_btn")[0].disabled = false;
}

function EmbedLeaderBoarReadyEvent()
{
    console.log("LEADERBOARD READY.");

    ChangeTableData('Neuland',false); // Load Neuland subs
}