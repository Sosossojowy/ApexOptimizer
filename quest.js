class Quest{
    static Id = 0;

    constructor(type){
        Quest.Id ++;
        this.id = Quest.Id
        this.type = type
    }
    toString(){
        return `quest of type ${this.type}`
    }
}
class LegendDamageQuest extends Quest{
    static TYPE = `DamageDealt`
    /**
     * 
     * @param {string} legend 
     * @param {number} damage 
     */
    constructor(legend, damage){
        super(LegendDamageQuest.TYPE)
        this.legend = legend;
        this.damage = damage;
    }
    toString(){
        return `Deal ${this.damage} damage as ${this.legend}`
    }
}

class WeaponDamageQuest extends Quest{
    static TYPE = `WeaponDamage`
    /**
     * 
     * @param {string} weapon 
     * @param {number} damage 
     */
    constructor(weapon, damage){
        super(WeaponDamageQuest.TYPE)
        this.weapon = weapon;
        this.damage = damage;
    }
    toString(){
        return `Deal ${this.damage} damage with ${this.weapon}`
    }
}

class LegendKillsQuest extends Quest{
    static TYPE = `Kills`
    /**
     * 
     * @param {string} legend 
     * @param {number} kills 
     */
    constructor(legend, kills){
        super(LegendKillsQuest.TYPE)
        this.legend = legend;
        this.kills = kills;
    }
    toString(){
        return `Get ${this.kills} kills as ${this.legend}`
    }
}

class WeaponKillsQuest extends Quest{
    static TYPE = `WeaponKills`
    /**
     * 
     * @param {string} weapon 
     * @param {number} kills 
     */
    constructor(weapon, kills){
        super(WeaponKillsQuest.TYPE)
        this.weapon = weapon;
        this.kills = kills;
    }
    toString(){
        return `Get ${this.kills} kills with ${this.weapon}`
    }
}

class LegendKnocksQuest extends Quest{
    static TYPE = `Knockdowns`
    /**
     * 
     * @param {string} legend 
     * @param {number} knocks 
     */
    constructor(legend, knocks){
        super(LegendKnocksQuest.TYPE)
        this.legend = legend;
        this.knocks = knocks;
    }
    toString(){
        return `Get ${this.knocks} knockdowns as ${this.legend}`
    }
}

class WeaponKnocksQuest extends Quest{
    static TYPE = `WeaponKnocks`
    /**
     * 
     * @param {string} weapon 
     * @param {number} knocks 
     */
    constructor(weapon, knocks){
        super(WeaponKnocksQuest.TYPE)
        this.weapon = weapon;
        this.knocks = knocks;
    }
    toString(){
        return `Get ${this.knocks} knockdowns with ${this.weapon}`
    }
}

class LegendPlaysQuest extends Quest{
    static TYPE = `Played`
    /**
     * @param {string} legend 
     * @param {number} plays 
     */
    constructor(legend, plays){
        super(LegendPlaysQuest.TYPE)
        this.legend = legend;
        this.plays = plays;
    }
    toString(){
        return `Play ${this.plays} games as ${this.legend}`
    }
}