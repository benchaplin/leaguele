import seedrandom from "seedrandom";

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
  let randomItemIndex;
  let itemDepth = -1;
  while (itemDepth < 3 && randomItemIndex !== 4403) {
    randomItemIndex = itemsKeys[getDateSeededRandomInt(itemsKeys.length)];
    itemDepth = itemsMap[randomItemIndex]["depth"] || -1;
  }
  return randomItemIndex;
}

function getDateSeededRandomInt(maxIntExclusive) {
  const today = new Date();
  const rng = seedrandom(
    `${today.getDate()}${today.getMonth}${today.getFullYear()}`
  );
  console.log(Math.floor(rng() * maxIntExclusive));
  return Math.floor(rng() * maxIntExclusive);
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
