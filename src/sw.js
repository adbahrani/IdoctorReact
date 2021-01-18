export default function swDev() {
  console.log("SwDev");
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  navigator.serviceWorker.register(swUrl).then(res => {
    console.log(res);
  });
}
