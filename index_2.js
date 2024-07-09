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
    console.log(id);
  const index = quests.findIndex((v) => v.id === id);
  if (index < 0) return;
  quests.splice(index, 1);
  renderQuests();
};

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
const getOptimizedQuests = (quests, doneQuests) => {
  const tasks = [];

  quests.forEach((dq) => {
    if (LegendQuest.is(dq)) {
      const alreadyQuests = tasks.filter(
        (t) => t.legend === dq.legend
      );
      if (alreadyQuests.length > 0) {
        alreadyQuests.forEach((at) =>
          at.quests.push({ id: dq.id, done: false })
        );
        return;
      }
      tasks
        .filter((t) => t.legend === "any")
        .forEach((e) => {
          tasks.push({
            ...e,
            id: ``,
            legend: dq.legend,
            quests: [...e.quests, { id: dq.id, done: false }],
          });
        });
      return tasks.push({
        id: ``,
        quests: [{ id: dq.id, done: false }],
        legend: dq.legend,
        weapon: "any",
      });
    } else if (WeaponQuest.is(dq)) {
      tasks
        .filter((t) => t.weapon === "any")
        .forEach((e) => {
          tasks.push({
            ...e,
            id: ``,
            weapon: e.weapon === "any" ? [dq.weapon] : [...e.weapon, dq.weapon],
            quests: [...e.quests, { id: dq.id, done: false }],
          });
        });
      return tasks.push({
        id: ``,
        quests: [{ id: dq.id, done: false }],
        legend: `any`,
        weapon: [dq.weapon],
      });
    }
  });
  const dedupe = (t) => {
    const deduped = [];
    for (const task of t) {
      const taskIn = deduped.find(
        (ts) =>
          ts.legend === task.legend &&
          JSON.stringify(ts.weapon) === JSON.stringify(task.weapon)
      );
      if (taskIn) {
        taskIn.quests = [
          ...new Set([
            ...taskIn.quests.map((z) => z.id),
            ...task.quests.map((z) => z.id),
          ]),
        ].map((tq) => ({ id: tq, done: false }));
      } else {
        deduped.push({
          ...task,
          id: `${task.legend}_${task.weapon}`.replace(/ /g, "-"),
        });
      }
    }
    for (const dd of deduped) {
      if (dd.id in doneQuests) {
        const doneQs = doneQuests[dd.id];
        dd.quests
          .filter((f) => doneQs.includes(f.id))
          .forEach((f) => (f.done = true));
      }
    }
    return deduped;
  };
  const dedupedTasks = dedupe(tasks);
  dedupedTasks.sort((a, b) => b.quests.length - a.quests.length);
  return dedupedTasks;
};
/**
 * @typedef {{id: string; legend: string; weapon: string; quests: {id:number; done:boolean;}[]}} Task
 */
const renderQuests = () => {
  save();
  /** @type {Task[]} */
  const tasks = getOptimizedQuests(quests, {});
  const taskList = document.querySelector(`#tasksList`);
  taskList.innerHTML = ``;
  for (const task of tasks) {
    const tr = document.createElement(`tr`);
    const td = document.createElement(`td`);
    const doneTd = document.createElement(`td`);

    tr.append(td, doneTd);
    td.innerText = `${task.legend} with ${task.weapon} (${task.quests.length})`;

    taskList.append(tr);
  }
  /** @type {HTMLTableSectionElement} */
  const list = document.querySelector(`#challangeList`);
  list.innerHTML = ``;
  for (const quest of quests) {
    const tr = document.createElement(`tr`);
    const td = document.createElement(`td`);
    const tdid = document.createElement(`td`);
    const deleteTd = document.createElement(`td`);
    const deleteButton = document.createElement(`button`);

    tr.append(tdid, td, deleteTd);
    td.innerText = `${quest}`;
    tdid.innerText = `${quest.id}`;
    deleteTd.append(deleteButton);
    deleteButton.innerText = `Delete`;
    deleteButton.onclick = () => deleteQuest(quest.id);
    list.prepend(tr);
  }
  console.log(tasks)
};

const LegendQuest = {
  /**
   *
   * @param {Quest} q
   * @returns
   */
  is(q) {
    return (q.type === LegendDamageQuest.TYPE 
        || q.type === LegendKillsQuest.TYPE
        || q.type === LegendKnocksQuest.TYPE 
        || q.type === LegendPlaysQuest.TYPE
    );
  },
};
const WeaponQuest = {
    /**
     *
     * @param {Quest} q
     * @returns
     */
    is(q) {
      return (q.type === WeaponDamageQuest.TYPE 
          || q.type === WeaponKillsQuest.TYPE
          || q.type === WeaponKnocksQuest.TYPE 
      );
    },
  };

questSelector.dispatchEvent(new Event(`change`));
load();
