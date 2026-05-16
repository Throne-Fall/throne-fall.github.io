let s_position   = "";
let s_name       = "";
let s_score      = "";
let s_gold       = "";
let s_mutators   = "";
let s_proof      = "";
let s_usedWeapon = "";
let s_version    = "";
let s_date       = "";
let s_perks      = "";
let s_mutList    = "";
////////////////////////////
function ShowScores ()
{
    console.log("==== SUBMISSION INFO ==================================");
    console.log("Position: " + s_position);
    console.log("Name: " + s_name);
    console.log("Score: " + s_score);
    console.log("Gold: " + s_gold);
    console.log("Mutators: " + s_mutators);
    console.log("Proof: " + s_proof);
    console.log("UsedWeapon: " + s_usedWeapon);
    console.log("Version: " + s_version); 
    console.log("Date: " + s_date);
    console.log("=======================================================");
}

function CloseSubInfoWindow() 
{
    const subInfoWindow = document.getElementById("subInfoWindowsBackground");
    const subInfoOverlay = document.getElementById("subInfoOverlayWindow");

	subInfoWindow.classList.remove("windowOpenAnim");
	subInfoWindow.classList.add("windowCloseAnim");

    Sleep(500).then(() => 
	{ 
		subInfoOverlay.classList.add("overlayHideAnim");
	} );
    Sleep(750).then(() => 
	{ 
		subInfoOverlay.style.display = "none";
	} );
	location.hash = "";
	ResetSubInfoWindowValues ();
    
}

function ShowSubInfo (submissionIndex)
{
    if (!location.hash.toLowerCase().includes("score="))
    {
        // return;
    }
    if (location.pathname.toLowerCase().includes("embed"))
    {
        alert("Submission details are not available in embedded version.");
        return;
    }
    const subInfoWindow = document.getElementById("subInfoWindowsBackground");
    const subInfoOverlay = document.getElementById("subInfoOverlayWindow");
    
	subInfoWindow.classList.add("windowOpenAnim");
	subInfoWindow.classList.remove("windowCloseAnim");
    subInfoOverlay.classList.remove("overlayHideAnim");

    // console.log("===== NEW SUBUINFI =========");
    // submissionIndex = ExtractSubNumber(submissionIndex);
    // ResetSubInfoWindowValues();

    // if (submissionIndex.includes("submit"))
    // {
    //     return;
    // }

    document.getElementById("obsoleteSubInfoBar").style.display = "none";
    document.getElementById("rejectedSubInfoBar").style.display = "none";
    
    if (submissionIndex == "" || submissionIndex == undefined)
    {   return;   }
    
    if (submissionIndex >= scoresData.length)
    {
        console.log("ShowSubInfo | Invalid submission index: " + submissionIndex);
        return;
    }    
    const chosenSubmission = scoresData[submissionIndex];
    // console.log(chosenSubmission);
    if (chosenSubmission[sc_subDateColumn] == "Submission Date")
    {
        console.warn("ShowSubInfo | Invalid submission " + chosenSubmission + "; " + submissionIndex);
        return;
    }
   // console.log(chosenSubmission);
    
    if (chosenSubmission[sc_statusColumn] == "o")
    {
        // console.log("OBSOLETE");
        document.getElementById("obsoleteSubInfoBar").style.display = "block";
    }
    if (chosenSubmission[sc_statusColumn] == "r")
    {
        // console.log("REJECTED");
        document.getElementById("rejectedSubInfoBar").style.display = "block";
    }

    s_position   = chosenSubmission[sc_positionColumn];
    s_name       = chosenSubmission[sc_nameColumn];
    s_score      = chosenSubmission[sc_scoreColumn];
    s_gold       = chosenSubmission[sc_goldColumn];
    s_mutators   = chosenSubmission[sc_numOfMutsColumn];
    s_proof      = chosenSubmission[sc_proofColumn];
    s_usedWeapon = chosenSubmission[sc_weaponColumn];
    s_version    = chosenSubmission[sc_versionColumn];
    s_date       = chosenSubmission[sc_userDateColumn];
    s_perks      = chosenSubmission[sc_usedPerksColumn];
    s_mutList    = chosenSubmission[sc_usedMutsColumn]

    location.hash = "score=" + submissionIndex;
    // ShowScores ();
    AssignSubInfoWindowValues();
    AssignSubInfoIcons();
}

function AssignSubInfoWindowValues ()
{
    // Hude all proof types elements
    document.getElementById("subIinfoVideoDiv").style.display = "none";
    document.getElementById("subIinfoImageDiv").style.display = "none";
    document.getElementById("subIinfoExternalImgDiv").style.display = "none";

    //  Assing corect proof
    if (IsPicServiceSupoorted(s_proof))
    {
        document.getElementById("subIinfoImageDiv").style.display = "block";
        document.getElementById("subInfoImg").src = s_proof;
        document.getElementById("subInfoImgLink").href = s_proof;
    }
    else
    {
        if (s_proof.includes(".mp4"))
        {
            document.getElementById("subIinfoVideoDiv").style.display = "block";
            document.getElementById("subInfoVideo").src = s_proof;
            document.getElementById("subIinfoFileUrl").textContent = "";
        }
        else if (s_proof.includes("youtu"))
        {
            document.getElementById("subIinfoVideoDiv").style.display = "block";
            document.getElementById("subInfoVideo").src = GetEmbedYTLink(s_proof);
            document.getElementById("subIinfoFileUrl").href = s_proof;
            document.getElementById("subIinfoFileUrl").textContent = ShortenYTLink(s_proof);
            // document.getElementById("subInfoImg").style.display = "none";            
        }
        else
        {
            document.getElementById("subIinfoExternalImgDiv").style.display = "block";
            document.getElementById("extenralImgButtonLink").href = s_proof;
        }
    }

    // Assign perks
    if (s_perks != "")
    {   document.getElementById("si_perksList").textContent = MakeModifierList(s_perks,"text");  }
    else
    {   document.getElementById("si_perksList").textContent = "Unknown";    }
    
    //  Assign uttators
    if (s_mutList != "")
    {   document.getElementById("si_mutatorsList").textContent = MakeModifierList(s_mutList,"text"); }
    else
    {   document.getElementById("si_mutatorsList").textContent = s_mutators; }

    // Assign positiom 
    document.getElementById("si_position").textContent = "#" + s_position;

    //  Assign the rest
    document.getElementById("si_name").textContent = s_name;
    document.getElementById("si_score").textContent = SplitScore(s_score);
    document.getElementById("si_gold").textContent = s_gold;
    // document.getElementById("si_mutators").textContent = s_mutators;
    document.getElementById("si_weapon").textContent = s_usedWeapon;
    document.getElementById("si_version").textContent = FormatVersionNumber(s_version);
    document.getElementById("si_date").textContent = FormatSubmissionDate(s_date);
    
    document.getElementById("subInfoOverlayWindow").style.display = "block";
}

function ResetSubInfoWindowValues ()
{
    document.getElementById("obsoleteSubInfoBar").style.display = "none";
    document.getElementById("rejectedSubInfoBar").style.display = "none";

    document.getElementById("subInfoVideo").src = "";
    document.getElementById("subInfoImg").src = "";

    document.getElementById("subIinfoVideoDiv").style.display = "none";
    document.getElementById("subIinfoImageDiv").style.display = "none";
    document.getElementById("subIinfoExternalImgDiv").style.display = "none";

    document.getElementById("si_name").textContent     = ""
    document.getElementById("si_score").textContent    = "";
    document.getElementById("si_gold").textContent     = "";
    // document.getElementById("si_mutators").textContent = "";
    document.getElementById("si_weapon").textContent   = "";
    document.getElementById("si_version").textContent  = "";
    document.getElementById("si_date").textContent     = "";
    // document.getElementById("sil_proof").textContent    = "";
}

function AssignSubInfoIcons ()
{
    document.getElementById("si_perksList").style.display = "none";
    document.getElementById("si_mutatorsList").style.display = "none";
    // document.getElementById("si_weapon").style.display = "none";

    //
    // W E A P O N
    //
    let weaponIcon = document.getElementById("subInfoWeaponIcon");
    let weaponWikiLink = document.getElementById("weaponWikiLink");
    let usedWeapon = s_usedWeapon;

    switch(usedWeapon)
    {
        default:
            weaponIcon.src = "../img/error.png";
            weaponIcon.title = ("< ! > \"" + usedWeapon + "\" is not on the list of recognized weapons.");
            break;

        case "unknown":
            weaponIcon.src = "./img/icons/unknown icon.png";
            weaponIcon.title = "Unknown";
            weaponWikiLink.href = "#";
            break;

        case "Bow":
            weaponIcon.src = "./img/icons/weapons/bow_and_dagger.png";
            weaponIcon.title = "Bow";
            weaponWikiLink.href = "https://throne-fall.github.io/game%20content/weapons/Bow.html";
            break;
            
        case "Spear":
            weaponIcon.src = "./img/icons/weapons/light_spear.png";
            weaponIcon.title = "Spear";
            weaponWikiLink.href = "https://throne-fall.github.io/game%20content/weapons/Spear.html";
            break;
            
        case "Sword":
            weaponIcon.src = "./img/icons/weapons/heavy_sword.png";
            weaponIcon.title = "Sword";
            weaponWikiLink.href = "https://throne-fall.github.io/game%20content/weapons/Sword.html";
            break;
            
        case "Lightning staff":
            weaponIcon.src = "./img/icons/weapons/lightning_staff.png";
            weaponIcon.title = "Lightning staff";
            weaponWikiLink.href = "https://throne-fall.github.io/game%20content/weapons/Lightning_Staff.html";
            break;
            
        case "The Shadow Codex":
            weaponIcon.src = "./img/icons/weapons/shadow_codex.png";
            weaponIcon.title = "Lightning staff";
            weaponWikiLink.href = "https://throne-fall.github.io/game%20content/weapons/shadow_codex.html";
            break;
    }

    //
    // P E R K S 
    //
    let perksIcons = document.getElementsByClassName("subInfoPerkIcon");
    let perkWikiLink = document.getElementsByClassName("perkWikiLink");
    let perkName = document.getElementsByClassName("subInfoPerkName");
    let usedPerksTitle = MakeModifierList(s_perks,"text");
    let usedPerksIcon = MakeModifierList(s_perks,"image");
    let chosenPerk;

    for (let i = 0; i < perksIcons.length; i++)
    {
        chosenPerk = usedPerksTitle[i];
        chosenPerkIcon = usedPerksIcon[i];

        if (chosenPerk == "" || chosenPerk == undefined)
        {
            console.log('chosenperk is empty string');
            perksIcons[i].src = "./img/nothing.png";
            perksIcons[i].title = chosenPerk; 
            perkName[i].textContent = usedPerksTitle[i];
            continue;
        }
        if (chosenPerk == "unknown" || chosenPerk == "Unknown")
        {
            perksIcons[i].src = "./img/icons/unknown icon.png";
            perksIcons[i].title = chosenPerk; 
            perkName[i].textContent = usedPerksTitle[i];
        }
        else if (chosenPerk == "None" || chosenPerk == "- NONE -" || chosenPerk == "NONE")
        {
            if (usedPerksIcon.length <=  2)
            {
                // Left
                perksIcons[0].src = "./img/nothing.png";
                perksIcons[0].title = ""; 
                perkName[0].textContent = "";
                // Middle
                perksIcons[1].src = "./img/nothing.png";
                perksIcons[1].title = chosenPerk; 
                perkName[1].textContent = chosenPerk;
                // Right
                perksIcons[2].src = "./img/nothing.png";
                perksIcons[2].title = ""; 
                perkName[2].textContent = "";
                break;
            }
            else
            {
                // Left
                perksIcons[0].src = "./img/nothing.png";
                perksIcons[0].title = ""; 
                perkName[0].textContent = "";
                // Middle
                perksIcons[1].src = "./img/nothing.png";
                perksIcons[1].title = chosenPerk; 
                perkName[1].textContent = chosenPerk;
                // Right
                perksIcons[2].src = "./img/nothing.png";
                perksIcons[2].title = ""; 
                perkName[2].textContent = "";
                break;
            }
        }
        else
        {
            perkWikiLink[i].href = GetPerkPageName(chosenPerk);

            perksIcons[i].src = "./img/icons/perks/" + chosenPerkIcon + ".png";
            perksIcons[i].title = chosenPerk; 
            perkName[i].textContent = usedPerksTitle[i];
        }
    }

    //
    // M U T A T O R S
    //
    let mutatorIcons = document.getElementsByClassName("subInfomutatorIcon");
    let mutatorWikiLink = document.getElementsByClassName("mutatorWikiLink");
    let mutatorName = document.getElementsByClassName("subInfoMutatorName");
    let usedMutatorsIcon  = MakeModifierList(s_mutList,"image");
    let usedMutatorsTitle = MakeModifierList(s_mutList,"text");
    let chosenMutator;

    for (let i = 0; i < mutatorIcons.length; i++)
    {
        chosenMutator = usedMutatorsTitle[i];
        chosenMutatorIcon = usedMutatorsIcon[i];

        if (chosenMutator == "" || chosenMutator == undefined)
        {
            console.log('chosenMutator is empty string');
            mutatorIcons[i].src = "./img/nothing.png";
            mutatorIcons[i].title = chosenMutator; 
            mutatorName[i].textContent = usedMutatorsIcon[i];
            continue;
        }
        // UNKNOWN
        if (chosenMutator == "unknown")
        {
            mutatorWikiLink[i].href = "#";

            document.getElementById("si_mutatorsList").style.display = "block";
            document.getElementById("si_mutatorsList").textContent = chosenMutator;

            mutatorIcons[i].src = "./img/nothing.png";
            mutatorIcons[i].title = ""; 
            mutatorName[i].textContent = "";
            continue;
        }
        // NONE
        else if (chosenMutator == "None" || chosenMutator == "- NONE -" || chosenMutator == "NONE")
        {
            mutatorWikiLink[i].href = "#";

            document.getElementById("si_mutatorsList").style.display = "block";
            document.getElementById("si_mutatorsList").textContent = chosenMutator;

            mutatorIcons[i].src = "./img/nothing.png";
            mutatorIcons[i].title = ""; 
            mutatorName[i].textContent = "";
            continue;
        }
        // HAS MUTATORS
        else 
        {
            mutatorWikiLink[i].href = GetMutatorPageName(chosenMutator);

            mutatorIcons[i].src = "./img/icons/mutators/" + chosenMutatorIcon + ".png";
            mutatorIcons[i].title = chosenMutator; 
            mutatorName[i].textContent = usedMutatorsTitle[i];
        }
    }
    for (let i = usedMutatorsIcon.length; i < mutatorIcons.length; i++)
    {
        mutatorIcons[i].src = "./img/nothing.png";
    }
}