module.exports = setDate;

function setDate() {
  let date = new Date();

  const options = { weekday: "long", month: "long", day: "numeric" };

  const locale = "en";

  let kindOfDay = date.toLocaleDateString(locale, options);

  return kindOfDay;
}
