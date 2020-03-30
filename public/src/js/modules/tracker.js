import { checkThemeLocal } from './themes';

export const tracker = async () => {

  const req = await fetch(`/track?theme=${(checkThemeLocal()) ? 1 : 0}`);
  const res = await req.json();
  return res;

}