let mobiMenuHidden = true;

function ToggleMoniMenu () 
{
    if (mobiMenuHidden)
    {
        ShowMobiMenu()
    }
    else 
    {
        HideMobiMenu();
    }
}

function ShowMobiMenu () 
{
    document.getElementById("mobiNavMenu").style.display = "block";
    mobiMenuHidden = false;
    document.getElementById("mobiNavButton").classList.remove("btn-light");
    document.getElementById("mobiNavButton").classList.add("btn-warning");
}
function HideMobiMenu () 
{
    document.getElementById("mobiNavMenu").style.display = "none";
    mobiMenuHidden = true;
    document.getElementById("mobiNavButton").classList.remove("btn-warning");
    document.getElementById("mobiNavButton").classList.add("btn-light");

}