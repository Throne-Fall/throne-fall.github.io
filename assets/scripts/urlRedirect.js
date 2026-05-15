// 
// URL Redirect - 28/08/2024
// Redirecr old or incorrrect path formats to new ones
// e.g. /game content/eternal trials => /game-content/eternal-trials/
// 
const allPagesString = "/index.html;/game-content/eternal-trials.html;/misc/events/index.html;/misc/events/lightning-desert.html;/misc/events/questfair.html;/misc/hall-of-fame.html;/about/king.html;/about/languages.html;/about/leveling.html;/about/overview.html;/about/score.html;/about/system-requirements.html;/about/versions.html;/about/wiki.html;/game-content/buildings/archery-range.html;/game-content/buildings/barracks.html;/game-content/buildings/barricade.html;/game-content/buildings/blacksmith.html;/game-content/buildings/bridge.html;/game-content/buildings/castle-center.html;/game-content/buildings/field.html;/game-content/buildings/fishing-harbour.html;/game-content/buildings/gold-mine.html;/game-content/buildings/heros-quarter.html;/game-content/buildings/house.html;/game-content/buildings/index.html;/game-content/buildings/mill.html;/game-content/buildings/royal-forge.html;/game-content/buildings/shrine.html;/game-content/buildings/tower.html;/game-content/buildings/wall.html;/game-content/enemies/archer.html;/game-content/enemies/barrel-knight.html;/game-content/enemies/catapults.html;/game-content/enemies/elite-crossbow-men.html;/game-content/enemies/elite-enemies.html;/game-content/enemies/exploder.html;/game-content/enemies/flying-mage.html;/game-content/enemies/fury.html;/game-content/enemies/hunterling.html;/game-content/enemies/index.html;/game-content/enemies/mole-archer.html;/game-content/enemies/mole-knight.html;/game-content/enemies/monster-rider.html;/game-content/enemies/ogre.html;/game-content/enemies/peasant.html;/game-content/enemies/pikes.html;/game-content/enemies/quicksling.html;/game-content/enemies/racer.html;/game-content/enemies/ram.html;/game-content/enemies/shadow.html;/game-content/enemies/slime.html;/game-content/enemies/spiky-slime.html;/game-content/enemies/strange-statue.html;/game-content/enemies/swordsman.html;/game-content/enemies/wasp.html;/game-content/maps/durststein.html;/game-content/maps/frostsee.html;/game-content/maps/index.html;/game-content/maps/neuland.html;/game-content/maps/nordfels.html;/game-content/maps/sturmklamm.html;/game-content/maps/uferwind.html;/game-content/mutators/death-god.html;/game-content/mutators/destruction-god.html;/game-content/mutators/elite-god.html;/game-content/mutators/falcon-god.html;/game-content/mutators/growth-god.html;/game-content/mutators/index.html;/game-content/mutators/no-towers-pact.html;/game-content/mutators/no-units-pact.html;/game-content/mutators/no-walls-pact.html;/game-content/mutators/phoenix-god.html;/game-content/mutators/pray-to-the-war-gods.html;/game-content/mutators/range-god.html;/game-content/mutators/snake-god.html;/game-content/mutators/tiger-god.html;/game-content/mutators/turtle-god.html;/game-content/mutators/wasp-god.html;/game-content/perks/ancient-shrines.html;/game-content/perks/anti-air-telescope.html;/game-content/perks/arcane-towers.html;/game-content/perks/archery-skills.html;/game-content/perks/architects-council.html;/game-content/perks/big-harbours.html;/game-content/perks/castle-blueprints.html;/game-content/perks/castle-fortifications.html;/game-content/perks/commander-mode.html;/game-content/perks/daredevil.html;/game-content/perks/elite-towers.html;/game-content/perks/elite-warriors.html;/game-content/perks/faster-research.html;/game-content/perks/fortified-houses.html;/game-content/perks/gladiator-school.html;/game-content/perks/glass-cannon.html;/game-content/perks/gods-lotion.html;/game-content/perks/healing-spirits.html;/game-content/perks/health-potions.html;/game-content/perks/heavy-armor.html;/game-content/perks/ice-magic.html;/game-content/perks/indestructable-mines.html;/game-content/perks/index.html;/game-content/perks/lighter-materials.html;/game-content/perks/loan.html;/game-content/perks/melee-damage.html;/game-content/perks/melee-resistance.html;/game-content/perks/power-tower.html;/game-content/perks/pumpkin-fields.html;/game-content/perks/ranged-damage.html;/game-content/perks/ranged-resistance.html;/game-content/perks/ring-of-resurrection.html;/game-content/perks/royal-mint.html;/game-content/perks/spell-scroll.html;/game-content/perks/stronger-heros.html;/game-content/perks/treasure-hunter.html;/game-content/perks/war-horse.html;/game-content/perks/warrior-mode.html;/game-content/units/allied-crossbowmen.html;/game-content/units/berserks.html;/game-content/units/fire-archers.html;/game-content/units/firewing.html;/game-content/units/flails.html;/game-content/units/golem.html;/game-content/units/hunters.html;/game-content/units/index.html;/game-content/units/knights.html;/game-content/units/lizzard-rider.html;/game-content/units/longbows.html;/game-content/units/spearmen.html;/game-content/units/support-mage.html;/game-content/upgrades/assassins-training.html;/game-content/upgrades/ballista.html;/game-content/upgrades/builders-guild.html;/game-content/upgrades/castle-up.html;/game-content/upgrades/commander.html;/game-content/upgrades/explosive-trap.html;/game-content/upgrades/fortress-tower.html;/game-content/upgrades/godly-curse.html;/game-content/upgrades/hot-oil.html;/game-content/upgrades/improved-plow.html;/game-content/upgrades/index.html;/game-content/upgrades/magic-armor.html;/game-content/upgrades/royal-mastery.html;/game-content/upgrades/royal-training.html;/game-content/upgrades/scarecrows.html;/game-content/upgrades/support-tower.html;/game-content/upgrades/wind-spirits.html;/game-content/weapons/bow.html;/game-content/weapons/index.html;/game-content/weapons/lightning-staff.html;/game-content/weapons/shadow-codex.html;/game-content/weapons/spear.html;/game-content/weapons/sword.html";

async function AttemptToCorrectUrl ()
{
    let originalPath = location.pathname.toLowerCase();

    let fixedPath = originalPath.split("upgrade%20paths").join("upgrades")
                                .split("%20").join("-")
                                .split("_")  .join("-")
                                
    let allPagesArr = new Array();
    allPagesArr = allPagesString.split(";");
    console.log(allPagesArr);

    for (let i = 0; i < allPagesArr.length; i++)
    {
        if (fixedPath == allPagesArr[i])
        {   
            DisplayRedirectMessage(fixedPath, originalPath);
            HidePageNotFoundContent();

            milliseconds = 1000; 
            setTimeout(() =>
            {
                location.href = origin + fixedPath + "?redirfrom=" + originalPath.split(".")[0];
            }, milliseconds);

            return;
        }
    }
}

function DisplayRedirectMessage (newPath,oldPath)
{
    $(".pageTitle")[0].textContent = "Old or incorrect name format.";
    document.title = "Please wait...";

    $("var")[0].textContent = oldPath.split(".")[0];
    $("var")[1].textContent = newPath.split(".")[0];
}

function HidePageNotFoundContent ()
{
    // Hide default 404 page content
    $("#possibleCausesList")[0].style.display = "none"; 
    $("#possibleCauses")    [0].style.display = "none";

    // Show reirect message
    $("#lookingForSimPage")[0].style.display = "block";

    // Add codeblock style to old and new url text
    $("var")[0].classList.add("codeBlock");
    $("var")[1].classList.add("codeBlock");
}