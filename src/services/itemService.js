import { getAllItemsRaw } from "./api/ddragonClient";

export function getAllItems() {
  return getAllItemsRaw().then(res => {
    return Object.keys(res.data).map(itemKey =>
      compileItemInfo(res.data, itemKey)
    );
  });
}

export function getRandomItem(allItems, dateSeeded) {
  const fullItems = allItems.filter(
    item =>
      item.children.length > 0 &&
      item.children.filter(itemChildren => itemChildren.children.length > 0)
        .length > 0 &&
      item.name !== "The Golden Spatula"
  );
  const randomItem =
    fullItems[
      dateSeeded
        ? getDateSeededRandomInt(fullItems.length)
        : getRandomInt(fullItems.length)
    ];
  return randomItem;
}

function compileItemInfo(itemsMap, itemKey) {
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

function getDateSeededRandomInt(maxIntExclusive) {
  const today = new Date();
  const n =
    (today.getDate() * 3 + today.getMonth() * 7 + today.getFullYear()) %
    maxIntExclusive;
  return n;
}

function getRandomInt(maxIntExclusive) {
  return Math.floor(Math.random() * maxIntExclusive);
}
