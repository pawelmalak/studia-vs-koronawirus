const container = document.querySelector('.container');

const getData = async () => {

  const req = await fetch('/classes');
  const res = await req.json();
  return res;

}

(async () => {
  console.log(await getData());
})();