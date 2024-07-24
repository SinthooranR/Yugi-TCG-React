export const apiUrlYtcg = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;

export default function delayCall(delay: number) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!");
    }, delay);
  });
  return promise;
}

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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  let adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    adjustedDate
  );

  const [datePart, timePart] = formattedDate.split(", ");
  const [month, day, year] = datePart.split("/");
  const [hoursMinutes, period] = timePart.split(" ");
  const [hours, minutes] = hoursMinutes.split(":");

  return `${month}/${day}/${year} at ${parseInt(hours)}:${minutes} ${period}`;
};
