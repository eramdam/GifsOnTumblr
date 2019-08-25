function switchAttribute(el, attr) {
  const currAttr = el.getAttribute(attr) || '';
  if (!currAttr) return;

  el.setAttribute(attr, currAttr.replace('.gifv', '.gif'));
}

const posts = document.querySelector('#posts');

const onMutation = () => {
  const GIFsLinks = posts.querySelectorAll(`[href*=".gifv"]`);
  const GIFSImages = posts.querySelectorAll(`[src*=".gifv"]`);

  Array.from(GIFsLinks).forEach(el => {
    switchAttribute(el, 'href');
  });

  Array.from(GIFSImages).forEach(el => {
    switchAttribute(el, 'src');
  });

  console.log(`Switched ${GIFsLinks.length} links and ${GIFSImages.length} images to GIFs`);
};

const postsObserver = new MutationObserver(onMutation);

postsObserver.observe(posts, {
  childList: true
});

onMutation();
