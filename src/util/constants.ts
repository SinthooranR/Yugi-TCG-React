export const apiUrlYtcg = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;

export const propertiesToShow = [
  { key: "level", label: "Level" },
  { key: "atk", label: "Attack" },
  { key: "def", label: "Defense" },
  { key: "attribute", label: "Attribute" },
  { key: "frameType", label: "Type" },
  { key: "race", label: "Race" },
  { key: "archetype", label: "Archetype" },
  { key: "desc", label: "Description" },
];

export const getAttributeImage = (attribute?: string, frameType?: string) => {
  let imgVal;

  if (frameType === "spell") {
    imgVal = "SPELL";
  } else if (frameType === "trap") {
    imgVal = "TRAP";
  } else {
    imgVal = attribute;
  }
  return `/images/icons/${imgVal}.svg`;
};
