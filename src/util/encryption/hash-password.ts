import { genSalt, hash } from 'bcrypt';

export default async function hashPassword(
  saltRounds: number,
  password: string,
): Promise<string> {
  const salt = await genSalt(saltRounds);

  return hash(password, salt);
}
