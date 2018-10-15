const random = () => {
  return Promise.resolve(3);
};

const fuc = () => {
  let first, second, third;
  return random()
    .then(v => {
      first = v;
      return random();
    })
    .then(v => {
      second = v;
      return random();
    })
    .then(v => {
      third = v;
      return first + second + third;
    })
    .then(v => console.log(v));
};

const fun = () =>{
  const first = await random()
  const second = await random()
  const first = await random()
}

fuc();
