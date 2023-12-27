function twosec() {
  console.log('onesec called');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('1done');
      resolve('2done');
    }, 1000);
  });
}
function sixsec() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('6done');
      resolve('6done');
    }, 6000);
  });
}
async function foo() {
  console.log('calling x');
  const x = await twosec();
  console.log('calling y');
  const y = await sixsec();
}
foo();
let i = 0;
while (i < 50000) {
  console.log('hi');
  i += 1;
}
