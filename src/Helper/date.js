/**
 * calculates age from a birthday string.
 * @param {string} birthdayStr - Date string (e.g. "1995-08-21"), "08/21/1995")
 * @returns {number} age in years
*/
export function calculateAge(birthdayStr) {
  const birthDate = new Date(birthdayStr);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
}
