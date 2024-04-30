class Quest{
    constructor(type){
        this.type = type
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
}

class WeaponDamageQuest extends Quest{
    static TYPE = `WeaponDamage`
    constructor(weapon, damage){
        super(WeaponDamageQuest.TYPE)
        this.weapon = weapon;
        this.damage = damage;
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
}

class WeaponKillsQuest extends Quest{
    static TYPE = `WeaponKills`
    constructor(weapon, kills){
        super(WeaponKillsQuest.TYPE)
        this.weapon = weapon;
        this.kills = kills;
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
}

class WeaponKnocksQuest extends Quest{
    static TYPE = `WeaponKnocks`
    constructor(weapon, knocks){
        super(WeaponKnocksQuest.TYPE)
        this.weapon = weapon;
        this.knocks = knocks;
    }
}

class LegendPlaysQuest extends Quest{
    static TYPE = `Played`
    /**
     * 
     * @param {string} legend 
     * @param {number} plays 
     */
    constructor(legend, plays){
        super(LegendPlaysQuest.TYPE)
        this.legend = legend;
        this.plays = plays;
    }
}