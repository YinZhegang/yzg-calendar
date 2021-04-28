export function constructArr(day) {
  const firstDay = new Date(day.getFullYear(), day.getMonth(), 1);
  const l = firstDay.getDay() === 0 ? 6 : (firstDay.getDay() - 1);
  const firstTd = new Date(firstDay.getTime() - l * 24 * 3600 * 1000);
  const darArr = [[], [], [], [], [], []];
  for (let i = 0; i < 42; i++) {
    darArr[Math.ceil(((i + 1) / 7)) - 1].push(new Date(firstTd.getTime() + i * 24 * 3600 * 1000));
  }
  return darArr;
}

export function constructArrByNum(now, num) {
  return 1;
}
