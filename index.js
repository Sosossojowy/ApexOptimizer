const selectors = {
  kills: `killsSelected`,
  games: `gamesSelected`,
  knocks: `knocksSelected`,
  legend: `legendSelected`,
  damage: `damageSelected`,
  weapontype: `weaponSelected`,
};
/** @type {Quest[]} */
const quests = [];
/**
 * @type {HTMLButtonElement}
 */
const addButton = document.querySelector(`#Add`);

const hide = (...ids) => {
  for (const id of ids)
    document.querySelector(`#${id}`).classList.add(`hidden`);
};
const hideall = () => {
  hide(...Object.values(selectors));
};
const show = (...ids) => {
  for (const id of ids)
    document.querySelector(`#${id}`).classList.remove(`hidden`);
};

const load = () => {
  const read = localStorage.getItem(`savedData`);
  if (!read) return;
  const object = JSON.parse(read);
  if (!Array.isArray(object)) return;
  for (const q of object) {
    if (!(`type` in q)) return;
    switch (q.type) {
      case LegendDamageQuest.TYPE:
        quests.push(new LegendDamageQuest(q.legend, q.damage));
        break;
      case LegendKillsQuest.TYPE:
        quests.push(new LegendKillsQuest(q.legend, q.kills));
        break;
      case LegendKnocksQuest.TYPE:
        quests.push(new LegendKnocksQuest(q.legend, q.knocks));
        break;
      case LegendPlaysQuest.TYPE:
        quests.push(new LegendPlaysQuest(q.legend, q.plays));
        break;
        case WeaponDamageQuest.TYPE:
        quests.push(new WeaponDamageQuest(q.weapon, q.damage));
        break;
      case WeaponKillsQuest.TYPE:
        quests.push(new WeaponKillsQuest(q.weapon, q.kills));
        break;
      case WeaponKnocksQuest.TYPE:
        quests.push(new WeaponKnocksQuest(q.weapon, q.knocks));
        break;
    }
  }
  renderQuests();
};
const save = () => {
  localStorage.setItem(`savedData`, JSON.stringify(quests));
};

/**
 * 
 * @param {number} id 
 */
const deleteQuest = (id) => {
  
  const index = quests.findIndex((v)=>v.id === id)
  if(index<0) return;
  quests.splice(index,1);
  renderQuests();
}

/**@type {HTMLSelectElement} */
const questSelector = document.querySelector(`#quest`);
questSelector.onchange = () => {
  console.log(questSelector.selectedOptions[0].value);
  const typ = questSelector.selectedOptions[0].value;
  hideall();
  if (typ === `Played`) {
    show(selectors.legend, selectors.games);
    addButton.onclick = () => {
      /**
       * @type {HTMLInputElement}
       */
      const game = document.querySelector(`#Game`);

      /**
       * @type {HTMLSelectElement}
       */
      const legend = document.querySelector(`#Legend`);
      quests.push(new LegendPlaysQuest(legend.value, +game.value));
      renderQuests();
    };
  } else if (typ === `Kills`) {
    show(selectors.legend, selectors.kills);
    addButton.onclick = () => {
      /**
       * @type {HTMLInputElement}
       */
      const kills = document.querySelector(`#Kill`);

      /**
       * @type {HTMLSelectElement}
       */
      const legend = document.querySelector(`#Legend`);
      quests.push(new LegendKillsQuest(legend.value, +kills.value));
      renderQuests();
    };
  } else if (typ === `DamageDealt`) {
    show(selectors.legend, selectors.damage);
    addButton.onclick = () => {
      /**
       * @type {HTMLInputElement}
       */
      const damage = document.querySelector(`#Damage`);

      /**
       * @type {HTMLSelectElement}
       */
      const legend = document.querySelector(`#Legend`);
      quests.push(new LegendDamageQuest(legend.value, +damage.value));
      renderQuests();
    };
  } else if (typ === `Knockdowns`) {
    show(selectors.legend, selectors.knocks);
    addButton.onclick = () => {
      /**
       * @type {HTMLInputElement}
       */
      const knockdowns = document.querySelector(`#Knock`);

      /**
       * @type {HTMLSelectElement}
       */
      const legend = document.querySelector(`#Legend`);
      quests.push(new LegendKnocksQuest(legend.value, +knockdowns.value));
      renderQuests();
    };
  } else if (typ === `WeaponDamage`) {
    show(selectors.weapontype, selectors.damage);
    addButton.onclick = () => {
      /**
       * @type {HTMLInputElement}
       */
      const damage = document.querySelector(`#Damage`);

      /**
       * @type {HTMLSelectElement}
       */
      const weapon = document.querySelector(`#Weapon`);
      quests.push(new WeaponDamageQuest(weapon.value, +damage.value));
      renderQuests();
    };
  } else if (typ === `WeaponKills`) {
    show(selectors.weapontype, selectors.kills);
    addButton.onclick = () => {
      /**
       * @type {HTMLInputElement}
       */
      const kills = document.querySelector(`#Kill`);

      /**
       * @type {HTMLSelectElement}
       */
      const weapon = document.querySelector(`#Weapon`);
      quests.push(new WeaponKillsQuest(weapon.value, +kills.value));
      renderQuests();
    };
  } else if (typ === `WeaponKnocks`) {
    show(selectors.weapontype, selectors.knocks);
    addButton.onclick = () => {
      /**
       * @type {HTMLInputElement}
       */
      const knockdowns = document.querySelector(`#Knock`);

      /**
       * @type {HTMLSelectElement}
       */
      const weapon = document.querySelector(`#Weapon`);
      quests.push(new WeaponKnocksQuest(weapon.value, +knockdowns.value));
      renderQuests();
    };
  }
};
/**
 * 
 * @param {Quest[]} quests 
 */
const taskCalc = (quests) =>{
 const tasks = []
 for(const quest of quests){
  
 }
 return tasks
}

const renderQuests = () => {
  save();
  /** @type {HTMLTableSectionElement} */
  const list = document.querySelector(`#challangeList`);
  list.innerHTML = ``;
  for (const quest of quests) {
    const tr = document.createElement(`tr`);
    const td = document.createElement(`td`);
    const deleteTd = document.createElement(`td`)
    const deleteButton = document.createElement(`button`)
    tr.append(td,deleteTd);
    td.innerText = `${quest}`;
    deleteTd.append(deleteButton)
    deleteButton.innerText = (`Delete`)
    deleteButton.onclick = () => deleteQuest(quest.id)
    list.append(tr);
  }
};
questSelector.dispatchEvent(new Event(`change`));
load();

/**
 * 

...............................................................................................................
...............................................................................................................
...............................................................................................................
...............................................................................................................
...............................................................................................................
...............................................................................................................
...............................................................................................................
...............................................................................................................
...............................................................................................................
...............................................................................................................
.....................:..::::.......................................................:.:..:.:.:::::.:............
............:...:.::::::::::::::..:.::.:.:....................:::.....:....:::.:.::::::::::::::xX+::::.........
........:::::::;+X$&&&&&&&&&&&&$$Xx+;;::::.:::::...............::::::.:::;;+xX$$&&&&&&&&&&&&&$X+;;X$X+:........
......::;XX;+$&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&$+:::........::x$&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&X+:x$X;:.....
....::x$x;x&&&&&&&Xxxx++++++++xX$$&&&&&&&&&&&&&&&;::........:.:+$&&&&&&&&&&&&&&&&$XXxx++;::;+xx$&&&&&x:;x:.....
..::+$;:X&&&$x;:::::.:.:........:::::::;++xxXXx+::.............::;xXXXXx++;:::::::.:..:.::..::::::+X&&&x::::...
...:::;$&$+::::.......::::::::::::::::::::::.:::::................:::::::::::::::::::::::::.:....::.:+X&$+::...
....:.:+;::........::::+xxxxxxxxxxxxxxxxx++:::..................:::::;;;;;;;;;;;;;;;;;;++;:.:..........:;;::...
....::.::.:.......:::::;;:::::::::::::::::::X$;::.............:::+$$:::::::::;;;;;;;;;++xx;::::::.......::.....
................::+$$$X$&&&&&&&&&&&$&&&$X+::;$&x::............::+&X:::+X$$&&$$&&&&&&&&&&$XxX$X;::..............
.............:::X$x;:::x&&&&&&x+&&X::$$+:::::x&x:..............:+&x:::::;$&+:;&&&&&&&$+X$+:::;x$x:::...........
...........:::xX;::::::x&&&&&&&&&&X::;X&+::.:;$::..............::xx::.:;$$;::;&&&&&&&&&&$;::::::+X+::..........
...........:;+::X$x++++x&&&&&&&&&&+::::+X;:::+;::...............::+::::x+;;;;;X&&&&&&&&&$xxxXX$$;::;:..........
...........::..:.:+XXXXXXXXXXXXXXXXXXXXXXx;:.:.......................:++++++++++++++++++++++++:::..............
...................:::..........:::::::::::............................::......::::::::::::::::................
...............................................................................................................
...............................................................................................................
...............................................................................................................
...............................................................................................................
...............................................................................................................
...............................................................................................................
...................................................................................................:::::.......
.................................................................................................:.:;X:........
.................................................................................................::xX::........
.................................................................................................:XX:::........
..............................................................................................:::XX::..........
..............................................................................................::$X:::..........
....................................................................................:.......:::$X::............
..................................................................................:::+::.....:x$;..............
................................................................................:::+$X::...::+$+:::............
............................................................................:.:::+$$;::...:.;$x::..............
...........................................................................::;x$&$;::.....::X$;::..............
.............................::.............................::..::::::::+x$&&&X+::::......:;$+:.:..............
..........................::+$+::::::.:......:::::::::::::::;;+xxX$&&&&&$X+;::::.:........:XX:.................
...........................:x&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&$Xx++;::::.:.............::;$+:.................
...........................::$$;;;;+++++++++++++;;;;;;:::::::::....::::.................::+X::.................
............................::$+:::.....................................................::xx:::................
.......................................................................................:::x;::.................
.......................................................................................::;x:...................
........................................................................................:::::..................
...............................................................................................................
...............................................................................................................


 */