export const getClasses = async () => {

  const req = await fetch('/classes');
  const res = await req.json();
  return res;

}

export const getEvents = async (classId) => {

  const req = await fetch(`/events?id=${classId}`);
  const res = await req.json();
  return res;

}