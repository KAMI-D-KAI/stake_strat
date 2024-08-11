// Utility functions for calculating expected values and other game properties
function calculateEV(winProbability, multiplier) {
    return winProbability * multiplier - (1 - winProbability);
}

function cardEvent(floatValue) {
    const CARDS = [
        '♦2', '♥2', '♠2', '♣2', '♦3', '♥3', '♠3', '♣3', '♦4', '♥4',
        '♠4', '♣4', '♦5', '♥5', '♠5', '♣5', '♦6', '♥6', '♠6', '♣6',
        '♦7', '♥7', '♠7', '♣7', '♦8', '♥8', '♠8', '♣8', '♦9', '♥9',
        '♠9', '♣9', '♦10', '♥10', '♠10', '♣10', '♦J', '♥J', '♠J',
        '♣J', '♦Q', '♥Q', '♠Q', '♣Q', '♦K', '♥K', '♠K', '♣K', '♦A',
        '♥A', '♠A', '♣A'
    ];
    return CARDS[Math.floor(floatValue * 52)];
}

function diamondEvent(floatValue) {
    const GEMS = ['green', 'purple', 'yellow', 'red', 'cyan', 'orange', 'blue'];
    return Array.from({ length: 5 }, () => GEMS[Math.floor(floatValue * 7)]);
}

function diceRollEvent(floatValue, target, rollOver) {
    const roll = (floatValue * 10001) / 100;
    return [roll, rollOver ? roll > target : roll < target];
}

function limboEvent(floatValue, maxMultiplier = 1_000_000, houseEdge = 0.99) {
    const floatPoint = (maxMultiplier * houseEdge) / (floatValue * maxMultiplier);
    const crashPoint = Math.max(Math.floor(floatPoint * 100) / 100, 1);
    return crashPoint;
}

function plinkoEvent(floatValue, rows, risk) {
    const DIRECTIONS = ["left", "right"];
    return Array.from({ length: rows }, () => DIRECTIONS[Math.floor(floatValue * 2)]);
}

function rouletteEvent(floatValue) {
    const POCKETS = Array.from({ length: 37 }, (_, i) => i);
    return POCKETS[Math.floor(floatValue * 37)];
}

function kenoEvent(floatValue, remainingSquares) {
    const SQUARES = Array.from({ length: remainingSquares }, (_, i) => i + 1);
    return SQUARES[Math.floor(floatValue * remainingSquares)];
}

function minesEvent(floatValue, remainingTiles) {
    return Math.floor(floatValue * remainingTiles);
}

function dragonTowerEvent(floatValue, level, difficulty) {
    const levelMap = {
        "easy": { count: 3, size: 4 },
        "medium": { count: 2, size: 3 },
        "hard": { count: 1, size: 2 },
        "expert": { count: 1, size: 3 },
        "master": { count: 1, size: 4 }
    };
    const { count, size } = levelMap[difficulty];
    return Array.from({ length: count }, () => Math.floor(floatValue * size));
}

function wheelEvent(floatValue, segments, risk) {
    const PAYOUTS = {
        '10': {
            'low': [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0],
            'medium': [0, 1.9, 0, 1.5, 0, 2, 0, 1.5, 0, 3],
            'high': [0, 0, 0, 0, 0, 0, 0, 0, 0, 9.9]
        },
        '20': {
            'low': [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0],
            'medium': [1.5, 0, 2, 0, 2, 0, 2, 0, 1.5, 0, 3, 0, 1.8, 0, 2, 0, 2, 0, 2, 0],
            'high': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19.8]
        },
        '30': {
            'low': [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0],
            'medium': [1.5, 0, 1.5, 0, 2, 0, 1.5, 0, 2, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 2, 0, 1.7, 0, 4, 0, 1.5, 0, 2, 0],
            'high': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29.7]
        },
        '40': {
            'low': [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0],
            'medium': [2, 0, 3, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 1.5, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 2, 0, 1.6, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 1.5, 0],
            'high': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39.6]
        },
        '50': {
            'low': [1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0, 1.2, 1.2, 1.2, 1.2, 0, 1.5, 1.2, 1.2, 1.2, 0],
            'medium': [2, 0, 1.5, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 1.5, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 1.5, 0, 2, 0, 2, 0, 1.5, 0, 3, 0, 1.5, 0, 2, 0, 1.5, 0, 1.5, 0, 5, 0, 1.5, 0, 2, 0, 1.5, 0],
            'high': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49.5]
        }
    };
    return PAYOUTS[String(segments)][risk][Math.floor(floatValue * segments)];
}

function crashEvent(floatValue) {
    const intValue = Math.floor(floatValue * (2 ** 32));
    const crashpoint = Math.max(1, (2 ** 32 / (intValue + 1)) * (1 - 0.01));
    return crashpoint;
}

function slideEvent(floatValue) {
    const intValue = Math.floor(floatValue * (2 ** 32));
    const result = Math.max(1, (2 ** 32 / (intValue + 1)) * (1 - 0.02));
    return result;
}

class Game {
    constructor(name, eventFunc, winProbability, multiplier, strategyFunc = null, config = []) {
        this.name = name;
        this.eventFunc = eventFunc;
        this.winProbability = winProbability;
        this.multiplier = multiplier;
        this.strategyFunc = strategyFunc;
        this.config = config;
        this.ev = calculateEV(winProbability, multiplier);
    }

    play(betAmount) {
        const floatValue = Math.random();
        const outcome = this.eventFunc(floatValue, ...this.config);
        if (this.strategyFunc) {
            const [strategy, payout] = this.strategyFunc(outcome, ...this.config);
            console.log(`Strategy: ${strategy}`);
            const win = payout > 0;
            return [win ? betAmount * payout : -betAmount, win, outcome];
        } else {
            const win = Math.random() < this.winProbability;
            return [win ? betAmount * this.multiplier : -betAmount, win, outcome];
        }
    }
}

class BettingStrategy {
    constructor(initialBalance, targetGoal) {
        this.balance = initialBalance;
        this.targetGoal = targetGoal;
        this.games = generateGameModes();
        this.betHistory = [];
        this.lossStreak = 0;
        this.maxLossStreak = 0;
        this.baseBet = Math.max(1, this.balance * 0.01);
    }

    selectGame() {
        const gamesSortedByEV = this.games.sort((a, b) => b.ev - a.ev);
        return gamesSortedByEV[Math.floor(Math.random() * Math.min(gamesSortedByEV.length, 3))];
    }

    determineBetAmount() {
        if (this.lossStreak === 0) {
            return this.baseBet;
        }

        const riskFactor = Math.min(1, this.lossStreak / 10);
        let betAmount = this.baseBet * (1 + riskFactor);
        return Math.min(betAmount, this.balance * 0.1);
    }

    suggestBet() {
        const game = this.selectGame();
        const betAmount = this.determineBetAmount();

        console.log(`Suggested Game: ${game.name}`);
        console.log(`Suggested Bet Amount: ${betAmount}`);
        console.log(`Expected Multiplier: ${game.multiplier}`);
        console.log(`Win Probability: ${game.winProbability}`);

        return [game, betAmount];
    }

    handleOutcome(game, betAmount, won) {
        const profitLoss = won ? betAmount * game.multiplier : -betAmount;
        this.balance += profitLoss;
        this.betHistory.push([game.name, betAmount, won, this.balance]);

        if (won) {
            this.lossStreak = 0;
        } else {
            this.lossStreak++;
            this.maxLossStreak = Math.max(this.lossStreak, this.maxLossStreak);
        }

        console.log(`After ${game.name}, Balance: ${this.balance}, Bet: ${betAmount}, Outcome: ${won ? 'Win' : 'Loss'}`);
    }

    runSimulation() {
        while (this.balance < this.targetGoal && this.balance > 0) {
            const [game, betAmount] = this.suggestBet();

            // Provide the strategy and bet details before asking for outcome
            alert(`Playing: ${game.name}\nBet Amount: ${betAmount}\nExpected Multiplier: ${game.multiplier}\nWin Probability: ${game.winProbability}`);

            const outcome = confirm("Did you win? Press OK for Yes, Cancel for No.");
            const won = outcome;

            this.handleOutcome(game, betAmount, won);

            if (this.balance < betAmount) {
                alert("Warning: Balance too low to continue with the current strategy.");
            }

            if (this.balance >= this.targetGoal) {
                alert("Target goal reached!");
                break;
            }
        }

        if (this.balance < this.determineBetAmount()) {
            alert("Strategy ended due to low balance.");
        }

        console.log("Bet History:", this.betHistory);
        document.getElementById("results").innerHTML = this.betHistory.map(
            (entry, index) => `<p>Round ${index + 1}: ${entry[0]} - Bet: ${entry[1]}, ${entry[2] ? 'Win' : 'Loss'}, New Balance: ${entry[3]}</p>`
        ).join('');
    }
}

function startSimulation() {
    const initialBalance = parseFloat(document.getElementById("balance").value);
    const targetGoal = parseFloat(document.getElementById("goal").value);

    if (isNaN(initialBalance) || isNaN(targetGoal)) {
        alert("Please enter valid numbers for balance and target goal.");
        return;
    }

    const strategy = new BettingStrategy(initialBalance, targetGoal);
    strategy.runSimulation();
}
