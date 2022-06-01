const parseISOString = (string) => {
  const date = new Date(string);
  let year = date.getFullYear();
  let month = Number(date.getMonth() + 1);
  let dt = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  if (dt < 10) {
    dt = "0" + dt;
  }
  if (min < 10) {
    min = "0" + min;
  }
  return dt + "-" + month + "-" + year + ", " + hour + ":" + min;
};
export default parseISOString;
