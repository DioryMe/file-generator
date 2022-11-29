export function getDate(outputString: string): string | undefined {
  const matchArray = outputString.match(/(?<=creation_time[\s]*:\s).*/)
  return matchArray? matchArray[0] : undefined
}