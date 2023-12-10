export function getLatestVersionRaw() {
  return fetch("https://ddragon.leagueoflegends.com/api/versions.json")
    .then(res => res.json())
    .catch(err => {
      console.error(err);
    });
}

export function getAllItemsRaw(version) {
  return fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`
  )
    .then(res => res.json())
    .catch(err => {
      console.error(err);
    });
}
