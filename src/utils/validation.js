// Single source of truth for the contact-form rules.
// The same patterns are used by the <input pattern="..."> attributes in the browser
// AND by the backend (api/contact.js), so they can never get out of sync.
//
// Note: written to be valid for the HTML `pattern` attribute (compiled with the "v" flag),
// so ( ) - etc. are escaped inside character classes.

export const FIELD_PATTERNS = {
  // starts with a letter, at least 2 letters, only letters / spaces / . ' -  (2-50 chars) -> "...", "123", "." are rejected
  name: "(?=.*[A-Za-z].*[A-Za-z])[A-Za-z][A-Za-z .'\\-]{1,49}",

  // real email: no leading/trailing/double dots, valid domain and a TLD of 2+ letters
  email:
    "[A-Za-z0-9]+(?:[._%+\\-][A-Za-z0-9]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9\\-]*[A-Za-z0-9])?\\.)+[A-Za-z]{2,}",

  // 3-100 chars with at least 3 letters/digits -> dots / symbols alone are rejected
  subject:
    "(?=.*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9])[A-Za-z0-9][A-Za-z0-9 .,!?'&:\\(\\)\\-]{2,99}",

  // 10-1000 chars with at least 10 letters/digits -> "..........." is rejected
  message: '(?=(?:[^A-Za-z0-9]*[A-Za-z0-9]){10})[\\s\\S]{10,1000}',
}

export const FIELD_LIMITS = { name: 50, email: 100, subject: 100, message: 1000 }

export const FIELD_MESSAGES = {
  required: 'This field is required.',
  name: 'Enter a valid name: letters only, 2-50 characters (e.g. John Doe).',
  email: 'Enter a valid email address (e.g. name@example.com).',
  subject: 'Subject must be 3-100 characters with real words or numbers, not only dots or symbols.',
  message: 'Message must be 10-1000 characters with real words, not only dots or symbols.',
}

const compile = (source) => {
  try {
    return new RegExp(`^(?:${source})$`, 'v')
  } catch {
    return new RegExp(`^(?:${source})$`, 'u')
  }
}

export const FIELD_REGEX = Object.fromEntries(
  Object.entries(FIELD_PATTERNS).map(([key, source]) => [key, compile(source)]),
)

// returns { name?: string, email?: string, ... } - empty object when everything is valid
export function validateContact(values) {
  const errors = {}
  for (const field of Object.keys(FIELD_PATTERNS)) {
    const value = typeof values?.[field] === 'string' ? values[field].trim() : ''
    if (!value) errors[field] = FIELD_MESSAGES.required
    else if (!FIELD_REGEX[field].test(value)) errors[field] = FIELD_MESSAGES[field]
  }
  return errors
}
