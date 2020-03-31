import { checkThemeLocal } from './themes';

export const tracker = async () => {

  const req = await fetch(`/track?theme=${(checkThemeLocal()) ? 1 : 0}&width=${screen.width}&height=${screen.height}`);
  const res = await req.json();
  return res;

}