import { getAllItemsRaw, getLatestVersionRaw } from "./api/ddragonClient";

export function getLatestVersion() {
  return getLatestVersionRaw().then(res => res[0]);
}

export async function getAllItems() {
  const version = await getLatestVersion();
  return getAllItemsRaw(version).then(res => {
    return Object.keys(res.data).reduce((acc, itemKey) => {
      const item = res.data[itemKey];
      /* Filter out:
      - Non-Summoner's Rift (map 11)
      - Required ally items
      - Ornn upgrades (sometimes missing requiredAlly)
      */

      if (
        item.maps["11"] &&
        item.requiredAlly === undefined &&
        !item.description.includes("ornnBonus")
      ) {
        acc.push(compileItemInfo(res.data, itemKey));
      }
      return acc;
    }, []);
  });
}

export function getRandomItem(allItems, dateSeeded) {
  const fullItems = allItems.filter(
    item =>
      item.children.length > 0 &&
      item.children.filter(itemChildren => itemChildren.children.length > 0)
        .length > 0
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
