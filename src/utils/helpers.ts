export const truncateStringWithSeparator = (
  strVal: string | null | undefined,
  length: number,
  separator: string | null | undefined,
  frontCharsLength: number
) => {
  const str = `${strVal}`;

  if (!length || str.length <= length) return str;

  separator = separator || "...";

  const sepLen = separator.length;
  const charsToShow = length - sepLen;
  let frontChars = 0;
  let backChars = 0;

  if (frontCharsLength > 0) {
    frontChars = frontCharsLength;
    backChars = charsToShow - frontChars;
  } else {
    frontChars = Math.ceil(charsToShow / 2);
    backChars = Math.floor(charsToShow / 2);
  }

  return (
    str.substr(0, frontChars) + separator + str.substr(str.length - backChars)
  );
};
