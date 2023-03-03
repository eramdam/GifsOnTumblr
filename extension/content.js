function switchAttribute(el, attr) {
  const currAttr = el.getAttribute(attr) || '';
  if (!currAttr) {
    return;
  }

  el.setAttribute(attr, currAttr.replace(/\.gifv/g, '.gif'));
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

const posts = document.body;

const isTumblrDashboard =
  String(window.location).startsWith('https://www.tumblr.com/') ||
  String(window.location).startsWith('https://tumblr.com/');
const isTumblrBlog =
  Boolean(document.querySelector('iframe.tmblr-iframe')) ||
  String(window.location).match(/https:\/\/[\w\W]+\.tumblr\.com\/image\//);

const onMutation = () => {
  if (!posts) {
    return;
  }

  const possibleAttributes = ['href', 'src', 'data-src', 'srcset'];

  possibleAttributes.forEach((attr) => {
    Array.from(posts.querySelectorAll(`[${attr}*=".gifv"][${attr}*=".media.tumblr."]`)).forEach(
      (el) => {
        switchAttribute(el, attr);
      }
    );
  });

  // We want to do this only on Tumblr's dashboard
  if (isTumblrDashboard) {
    const Slideshows = posts.querySelectorAll('[data-lightbox]');

    Array.from(Slideshows).forEach((el) => switchLightbox(el));
  }
};

const postsObserver = new MutationObserver(onMutation);

console.log({
  isTumblrDashboard,
  isTumblrBlog
});
if (isTumblrDashboard || isTumblrBlog) {
  postsObserver.observe(posts, {
    childList: true,
    subtree: true
  });

  onMutation();
}
