export function getAllItemsRaw() {
  return fetch(
    "https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/item.json"
  )
    .then(res => res.json())
    .catch(err => {
      console.error(err);
    });
}
