
var random = Math.random;

function randomInt(min, max) {
    return Math.floor(min + random() * (max - min + 1));
}

function probabilityTest (probability) {
    return random() <= probability;
}

function vary (value, perc) {
    var random = random() - random();
    var adjustment = random * value * perc;
    return Math.floor(value + adjustment);
}


// https://starmen.net/mother2/gameinfo/technical/equations.php

// Turn Order - Sort all players by speed -/+ 50%
// Run Away (Highest Speed PC - Highest Speed Enemy + 10 * turn number)%

// Avoid Mortal Damage - Survie with 1 HP  = guts/500 or 1/20 whichever is greater
function surviveMortalDamage(stats) {
    return probablityTest(Math.max(stats.guts/500, 1/20));
}

// Calling for help (maximum number of enemy type - number of enemy type)/(maximum number of enemy type) * 205/256. (205/256 is probably an approximation of 4/5.)


// Physical Attacks

// 1. Miss - Each weapon and NPC/enemy has a miss rate. Unarmed PCs have a miss rate of 1/16. Crying and/or nausea will increase this miss rate by 8/16. If the weapon misses, skip the remaining steps.
function didMiss(stats) {
  return probabilityTest(1/16 || stats.missRate + ())
}

// 2. SMAAAASH! - With the Bash command or Bash-like enemy/NPC attacks, the probability of a SMAAAASH! is equal to guts/500 or 1/20, whichever is greater. If a SMAAAASH is successful, it deals 4*offense-defense damage, and skip the remaining steps. (Yes, even step 5.) This damage is still affected by defending if applicable. If the target had a physical shield, it will be depleted.
function didSmash(stats) {
  return probablityTest(Math.max(stats.guts/500, 1/20));
}

// 3. Dodging - The target has a (2*target speed - attacker speed)/500 chance of dodging the attack. If the enemy dodges, skip the remaining steps.
function didDodge(attacker, target) {
  return probablityTest((2 * target.spd - attacker.spd)/500);
}

// 4. Damage - The attack will deal (attack level * offense - defense) +/- 25% damage. Bash, Shoot, and enemy/NPC projectile attacks have attack level 2, while Bash-like attacks can attack levels 1, 2, 3, and 4, depending on the attack.
function calcBashDamage(attackLevel, attacker, target) {
  return vary(attackLevel * attacker.off - target.def, 1/4);
}

// 5. Status - If the attack was Bash or a Bash-like enemy/NPC attack, the target will stop feeling strange if it was feeling strange.

// LevelUp - Stat gain = ((growth rate * old level) - ((stat-2) * 10)) * r/50
/*
r is given by one of the following:
* If the stat is vitality or IQ, and the new level is 10 or lower, r=5.
* Otherwise, if the new level is divisible by 4, r is a random number from 7 to 10.
* Otherwise, r is a random number from 3 to 6.
*/
function levelUpStatGain(growthRate, level, statId, statValue) {
    var r = (level % 4) ? randomInt(7, 10) : randomInt(3, 6);
    return ((growthRate * (level-1)) - ((statValue-2) * 10)) * r/50;
}

module.exports = {
    surviveMortalDamage: surviveMortalDamage
};
