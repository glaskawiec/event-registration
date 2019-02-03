import { isEmail } from 'validator';

export const email = value => value && !isEmail(value) ? 'Invalid email address' : undefined
export const required = value => value ? undefined : 'Required'