/** Strip to digits (phone validation, etc.). */
export function digitsOnly(value) {
  return String(value).replace(/\D/g, '')
}
