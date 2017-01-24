var random = Math.random;

function randomPyramid() {
    return random() - random();
}

function randomInt(min, max) {
    return Math.floor(min + random() * (max - min + 1));
}

function chance(probability) {
    return random() <= probability;
}

function vary (value, perc) {
    var adjustment = randomPyramid() * value * perc;
    return Math.floor(value + adjustment);
}

module.exports = {
    random: random,
    randomPyramid: randomPyramid,
    randomInt: randomInt,
    chance: chance,
    vary: vary
};
