export function getAllItems(setAllItems, setRandomItem) {
  fetch("https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/item.json")
    .then(res => res.json())
    .then(res => {
      const allItemNames = Object.keys(res.data).map(itemKey =>
        compileItemInfo(res.data, itemKey)
      );
      setAllItems(allItemNames);

      const randomMaxItemIndex = getRandomMaxItem(res.data);
      const randomMaxItemBuildTree = getItemBuildTree(
        res.data,
        randomMaxItemIndex
      );
      setRandomItem(randomMaxItemBuildTree);
    })
    .catch(err => {
      console.error(err);
      setAllItems(false);
    });
}

function compileItemInfo(itemsMap, itemKey) {
  const itemBuildTree = {
    name: itemsMap[itemKey]["name"],
    image: itemsMap[itemKey]["image"]["full"],
    children: getItemChildren(itemsMap, itemKey)
  };

  return itemBuildTree;
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
  const n =
    (today.getDate() * 3 + today.getMonth() * 7 + today.getFullYear()) %
    maxIntExclusive;
  return n;
}
