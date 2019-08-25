function switchAttribute(el, attr) {
  const currAttr = el.getAttribute(attr) || '';
  if (!currAttr) {
    return;
  }

  el.setAttribute(attr, currAttr.replace('.gifv', '.gif'));
}

function switchLightbox(el) {
  const lightboxJSONString = el.getAttribute('data-lightbox');

  if (!lightboxJSONString) {
    return;
  }

  const lightboxJSON = JSON.parse(lightboxJSONString);

  for (const key in lightboxJSON) {
    if (lightboxJSON.hasOwnProperty(key)) {
      const element = lightboxJSON[key];
      if (String(element).endsWith('.gifv')) {
        lightboxJSON[key] = String(element).replace('.gifv', '.gif');
      }
    }
  }

  el.setAttribute('data-lightbox', JSON.stringify(lightboxJSON));
}

const posts = document.querySelector('#posts');
console.log('posts', posts);

const onMutation = () => {
  if (!posts) {
    return;
  }

  const GIFsLinks = posts.querySelectorAll(`[href*=".gifv"]`);
  const GIFSImages = posts.querySelectorAll(`[src*=".gifv"]`);
  const GIFSDataSrc = posts.querySelectorAll(`[data-src*=".gifv"]`);

  Array.from(GIFsLinks).forEach(el => {
    switchAttribute(el, 'href');
  });

  Array.from(GIFSImages).forEach(el => {
    switchAttribute(el, 'src');
  });
  Array.from(GIFSDataSrc).forEach(el => {
    switchAttribute(el, 'data-src');
  });

  const Slideshows = posts.querySelectorAll('[data-lightbox]');

  Array.from(Slideshows).forEach(el => switchLightbox(el));

  console.log({
    GIFsLinks: GIFsLinks.length,
    GIFSImages: GIFSImages.length,
    GIFSDataSrc: GIFSDataSrc.length,
    Slideshows: Slideshows.length
  });
};

const postsObserver = new MutationObserver(onMutation);

postsObserver.observe(posts, {
  childList: true,
  subtree: true
});

onMutation();
