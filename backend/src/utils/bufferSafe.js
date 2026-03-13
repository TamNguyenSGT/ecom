export function toBinary(base64Value) {
  if (!base64Value) return '';
  try {
    return Buffer.from(base64Value, 'base64').toString('binary');
  } catch (e) {
    return '';
  }
}

