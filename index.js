const selectors = {
  kills: `killsSelected`,
  games: `gamesSelected`,
  knocks: `knocksSelected`,
  legend: `legendSelected`,
  damage: `damageSelected`,
};
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
/**@type {HTMLSelectElement} */
const questSelector = document.querySelector(`#quest`);
questSelector.onchange = () => {
  console.log(questSelector.selectedOptions[0].value);
  const typ = questSelector.selectedOptions[0].value;
  hideall();
  if (typ === `Played`) {
    show(selectors.legend, selectors.games);
  } else if (typ === `Kills`) {
    show(selectors.legend, selectors.kills);
  } else if (typ === `DamageDealt`) {
    show(selectors.legend, selectors.damage);
  } else if (typ === `Knockdowns`) {
    show(selectors.legend, selectors.knocks);
  }
};
questSelector.dispatchEvent(new Event(`change`));
