const gen = require("random-seed");

export function getRandomItemBuildTree(setter) {
  fetch("https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/item.json")
    .then(res => res.json())
    .then(res => {
      const randomMaxItemIndex = getRandomMaxItem(res.data);

      const randomMaxItemBuildTree = getItemBuildTree(
        res.data,
        randomMaxItemIndex
      );

      setter(randomMaxItemBuildTree);
    })
    .catch(err => {
      console.error(err);
      setter(false);
    });
}

function getRandomMaxItem(itemsMap) {
  const itemsKeys = Object.keys(itemsMap);
  const fullItemKeys = itemsKeys.filter(
    itemKey => itemsMap[itemKey]["depth"] === 3
  );
  const randomItemKey =
    fullItemKeys[getDateSeededRandomInt(fullItemKeys.length)];
  return randomItemKey;
}

function getDateSeededRandomInt(maxIntExclusive) {
  const today = new Date();
  const random = gen.create(
    `${today.getDate()}${today.getMonth}${today.getFullYear()}`
  );
  if ([53].includes(random(maxIntExclusive))) {
    return random(maxIntExclusive) + 1;
  }
  return random(maxIntExclusive);
}

function getItemBuildTree(itemsMap, itemKey) {
  const itemBuildTree = {
    name: itemsMap[itemKey]["name"],
    image: itemsMap[itemKey]["image"]["full"],
    children: getItemChildren(itemsMap, itemKey)
  };

  return itemBuildTree;
}

function getItemChildren(itemsMap, itemKey) {
  if (itemsMap[itemKey]["from"]) {
    return itemsMap[itemKey]["from"].map(childKey => ({
      name: itemsMap[childKey]["name"],
      image: itemsMap[childKey]["image"]["full"],
      children: getItemChildren(itemsMap, childKey)
    }));
  } else {
    return [];
  }
}

export function getAllItems(setter) {
  fetch("https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/item.json")
    .then(res => res.json())
    .then(res => {
      const allItemNames = Object.keys(res.data).map(itemKey => ({
        name: res.data[itemKey]["name"],
        image: res.data[itemKey]["image"]["full"]
      }));
      setter(allItemNames);
    })
    .catch(err => {
      console.error(err);
      setter(false);
    });
}
