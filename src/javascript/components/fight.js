import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    function checkHealth(health) {
        if (health <= 0) {
            return true
        } else {
            return false
        }
    }

    function healthIndicatorsWidth(startHealth, damage) {
        const rest = damage / startHealth * 100
        if (rest < 0) {
            return 0
        } else {
            return rest
        }
    }

    function criticalHitTimer(fighter) {
        console.log(fighter.name + '`s Critical Hit is ready!')
        return fighter.criticalHit = true
    }
    return new Promise((resolve) => {
        // resolve the promise with the winner when fight is over
        let health1 = firstFighter.health
        let health2 = secondFighter.health
        firstFighter.criticalHit = true
        secondFighter.criticalHit = true

        document.addEventListener("keydown", keysPressed, false);
        document.addEventListener("keyup", keysReleased, false);
        const healthIndicatorLeft = document.getElementById('left-fighter-indicator')
        const healthIndicatorRight = document.getElementById('right-fighter-indicator')

        var keys = new Map();

        function keysReleased(e) {

            keys.delete(e.code)
        }

        function keysPressed(e) {
            keys.set(e.code, true)
            let damage;

            if (keys.has(controls.PlayerOneCriticalHitCombination[0]) && keys.has(controls.PlayerOneCriticalHitCombination[1]) && keys.has(controls.PlayerOneCriticalHitCombination[2])) {
                if (firstFighter.criticalHit) {
                    console.log("Player1 CRITICAL HIT!!")
                    firstFighter.criticalHit = false
                    damage = firstFighter.attack * 2
                    health2 = health2 - damage
                    console.log(`CriticalDamaged:${damage}`)
                    setTimeout(criticalHitTimer, 10000, firstFighter)
                }
            }
            if (keys.has(controls.PlayerTwoCriticalHitCombination[0]) && keys.has(controls.PlayerTwoCriticalHitCombination[1]) && keys.has(controls.PlayerTwoCriticalHitCombination[2])) {
                if (secondFighter.criticalHit) {
                    console.log("Player 2 CRITICAL HIT!!")
                    secondFighter.criticalHit = false
                    damage = secondFighter.attack * 2

                    health1 = health1 - damage
                    console.log(`CriticalDamaged:${damage}`)

                    setTimeout(criticalHitTimer, 10000, secondFighter)
                }
            }
            if (keys.has(controls.PlayerOneAttack) && !e.repeat) {
                console.log("Player 1 ATTACK!")
                    // let damage;
                if (keys.has(controls.PlayerTwoBlock)) {
                    damage = getDamage(firstFighter, secondFighter)
                    console.log("Player 2 Blocked")
                } else {
                    damage = getHitPower(firstFighter)
                    console.log("Player 2 Damaged")
                }
                health2 = health2 - damage
                console.log(`Damaged:${damage}`)
            }
            if (keys.has(controls.PlayerTwoAttack) && !e.repeat) {
                console.log("Player 2 ATTACK!")
                if (keys.has(controls.PlayerOneBlock)) {
                    damage = getDamage(secondFighter, firstFighter)
                    console.log("Player 1 Blocked")
                } else {
                    damage = getHitPower(secondFighter)
                    console.log("Player 1 Damaged")
                }
                health1 = health1 - damage
                console.log(`Damaged:${damage}`)
            }

            healthIndicatorLeft.style.width = `${healthIndicatorsWidth(firstFighter.health,health1)}%`
            healthIndicatorRight.style.width = `${healthIndicatorsWidth(secondFighter.health,health2)}%`
            console.log(health1, health2)
            if (checkHealth(health1)) {
                document.removeEventListener('keydown', keysPressed)
                document.removeEventListener('keyup', keysReleased)
                resolve(secondFighter)
            }
            if (checkHealth(health2)) {
                document.removeEventListener('keydown', keysPressed)
                document.removeEventListener('keyup', keysReleased)
                resolve(firstFighter)
            }
        }
    });
}

export function getDamage(attacker, defender) {
    // return damage
    const damage = getHitPower(attacker) - getBlockPower(defender)
    if (damage <= 0) { return 0 } else { return damage }
}

export function getHitPower(fighter) {
    // return hit power

    const criticalHitChance = getRandomInt(1, 2)
    const power = fighter.attack * criticalHitChance;

    return power
}

export function getBlockPower(fighter) {
    // return block power

    const dodgeChanse = getRandomInt(1, 2)
    const power = fighter.defense * dodgeChanse

    return power
}

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}