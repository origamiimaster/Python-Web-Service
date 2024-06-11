console.log("Starting!");

document.getElementById("submit").addEventListener("click", () => {
    console.log("Calculating...")
    calculate();
})

function calculate() {
    const nonlandCount = document.getElementById("nonland").value;
    const untappedLandCount = document.getElementById("untapped").value;
    const tappedLandCount = document.getElementById("tapped").value;
    console.log(nonlandCount, untappedLandCount, tappedLandCount)

    let bigResults = [];
    for (let i = 0; i < 10; i++) {
        bigResults.push(0);
    }

    // Run N=1000 simulations:
    let numberOfSimulations = 10000
    for (let simulation = 0; simulation < numberOfSimulations; simulation++) {
        let results = runSimulation(nonlandCount, untappedLandCount, tappedLandCount);
        for (let turn = 0; turn < results.length; turn++) {
            let manaAmount = results[turn];
            bigResults[turn] += manaAmount;
        }
    }
    for (let i = 0; i < 10; i++) {
        bigResults[i] = bigResults[i] / numberOfSimulations;
    }

    console.log(bigResults);
    drawGraph(bigResults)
}

function runSimulation(nonlandCount, untappedLandCount, tappedLandCount) {
    let results = [];

    // Build Deck: 
    const deck = buildDeck(nonlandCount, untappedLandCount, tappedLandCount);
    shuffleArray(deck);

    const hand = [];
    const battlefield = [];
    // Draw 7 cards. 
    for (let i = 0; i < 7; i++) {
        hand.push(deck.pop());
    }

    // Simulate a random walk using only the following rule: Always play a land if able. 
    // Run only up until turn 10. 
    for (let turn = 0; turn < 10; turn++) {
        // Draw a card: 
        hand.push(deck.pop())
        // Try playing a land: 
        let landIndices = []
        for (let i = 0; i < hand.length; i++) {
            if (hand[i] > 0) {
                landIndices.push(i);
            }
        }
        if (landIndices.length == 0) {
            results.push(battlefield.length)
        } else {
            // Select a random land to play: 
            let landIndex = landIndices[Math.floor(Math.random() * landIndices.length)];
            let land = hand[landIndex];
            hand.splice(landIndex, 1);
            battlefield.push(land);
            if (land == 1) {
                results.push(battlefield.length);
            } else {
                results.push(battlefield.length - 1);
            }
        }
    }

    return results;
}


function buildDeck(nonlandCount, untappedLandCount, tappedLandCount) {
    const deck = []
    for (let i = 0; i < nonlandCount; i++) {
        deck.push(0);
    }
    for (let i = 0; i < untappedLandCount; i++) {
        deck.push(1);
    }
    for (let i = 0; i < tappedLandCount; i++) {
        deck.push(2);
    }
    return deck;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function arrayToStringFormat(handArr, deckArr, fieldArr) {
    let outputString = ""
    for (let i = 0; i < handArr.length; i++) {
        outputString += handArr[i];
    }
    outputString += ";"
    for (let i = 0; i < deckArr.length; i++) {
        outputString += deckArr[i];
    }
    outputString += ";"
    for (let i = 0; i < fieldArr.length; i++) {
        outputString += fieldArr[i];
    }
    return outputString;
}

function stringFormatToArray(stringFormat) {
    let zones = stringFormat.split(";");
    let handArr = [];
    let deckArr = [];
    let fieldArr = [];
    for (let i = 0; i < zones[0].length; i++) {
        handArr.push(Number(zones[0][i]))
    }
    for (let i = 0; i < zones[0].length; i++) {
        deckArr.push(Number(zones[1][i]))
    }
    for (let i = 0; i < zones[0].length; i++) {
        fieldArr.push(Number(zones[2][i]))
    }
    return [handArr, deckArr, fieldArr]
}

function drawGraph(results) {
    const graph = document.getElementById("graph");
    graph.replaceChildren([]);
    for (let i = 0; i < 10; i++) {
        let barHolder = document.createElement("div");
        barHolder.classList.add("barholder");
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = (results[i] / 10) * 100 + "px";
        barHolder.appendChild(bar);
        let indicator = document.createElement("div");
        indicator.classList.add("barnumber");
        indicator.innerHTML = results[i].toFixed(1);
        barHolder.appendChild(indicator);
        graph.appendChild(barHolder);
    }
}
