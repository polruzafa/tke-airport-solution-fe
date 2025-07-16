export function getHoursMinutes(isostring) {
  const date = new Date(isostring);
  return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
}

export function formatDates(startTime, endTime) {
  return `${startTime ? getHoursMinutes(startTime) : ""} ${
    endTime ? "- " + getHoursMinutes(endTime) : ""
  }`;
}
