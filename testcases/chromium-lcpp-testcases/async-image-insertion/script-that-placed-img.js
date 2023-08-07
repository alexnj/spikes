function placeLCPImage() {
  console.log('Placing LCP image');
  if (window.__img) document.body.append(window.__img);
}

(async function() {
  await new Promise(resolve => {
    console.log('resolve()');
    setTimeout(() => {
      console.log('setTimeout()');
      placeLCPImage()
    }, 300);
});
})();