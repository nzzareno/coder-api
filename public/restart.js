// document.querySelector("#formx").addEventListener("input", function (e) {
//   const tgt = e.target;
//   if (tgt.type && tgt.type === "number") {
//     const val = tgt.value;
//     const nums = val.replace(/[^\d.-]/g, "");
//     if (!/\d+/.test(val)) tgt.value = "";
//   }
// });

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
