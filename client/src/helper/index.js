export const actPromise = (action, args) => {
  return new Promise((resolve, reject) => {
    action(...args, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};
