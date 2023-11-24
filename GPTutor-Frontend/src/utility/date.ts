export function datePlus30Days() {
  const currentDate = new Date();
  return new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
}
