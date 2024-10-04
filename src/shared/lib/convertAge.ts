export const convertAge = (birthDate: string): string => {
  let ageInfo: string;
  const date = new Date(birthDate);
  const today = new Date();
  const t = new Date(today.getFullYear(), date.getMonth(), date.getDate());

  const age =
    today < t
      ? today.getFullYear() - date.getFullYear() - 1
      : today.getFullYear() - date.getFullYear();

  if (age % 10 === 1 && age !== 11) {
    ageInfo = `${age} год`;
  } else if (age === 11) {
    ageInfo = `${age} лет`;
  } else if (age % 10 === 2 || age % 10 === 3 || age % 10 === 4) {
    ageInfo = `${age} года`;
  } else {
    ageInfo = `${age} лет`;
  }

  return ageInfo;
};
