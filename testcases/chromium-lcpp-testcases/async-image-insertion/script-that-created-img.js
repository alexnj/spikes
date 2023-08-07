function createLCPImage() {
  console.log('Creating LCP image');
  const img = document.createElement('img');
  img.src = "https://placehold.co/600x400?text=synchronously+\n+placed+image+\n+by+script";
  window.__img = img;
}

(async function() {
  await new Promise(resolve => {
    console.log('resolve()');
    setTimeout(() => {
      console.log('setTimeout()');
      createLCPImage()
    }, 300);
});
})();