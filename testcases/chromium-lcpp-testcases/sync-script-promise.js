function placeLCPImage() {
  console.log('Placing LCP image');
  const img = document.createElement('img');
  img.src = "https://placehold.co/600x400?text=synchronously+\n+placed+image+\n+by+script";
  document.body.appendChild(img);
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