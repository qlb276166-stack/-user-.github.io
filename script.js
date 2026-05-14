const filterButtons = [...document.querySelectorAll(".filter-btn")];
const portfolioItems = [...document.querySelectorAll(".portfolio-item")];
const gallery = document.querySelector(".gallery");
const galleryImage = gallery?.querySelector("img");
const galleryTitle = gallery?.querySelector("figcaption strong");
const galleryCategory = gallery?.querySelector("figcaption span");
const galleryClose = gallery?.querySelector(".gallery-close");
const galleryPrev = gallery?.querySelector(".gallery-prev");
const galleryNext = gallery?.querySelector(".gallery-next");
const galleryPlay = gallery?.querySelector(".gallery-play");

let visibleItems = portfolioItems;
let activeIndex = 0;
let autoplayTimer = null;
let isPlaying = true;

function setActiveFilter(button) {
  filterButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
}

function filterPortfolio(category) {
  visibleItems = portfolioItems.filter((item) => {
    const match = category === "All" || item.dataset.category === category;
    item.classList.toggle("hide", !match);
    item.classList.toggle("show", match);
    return match;
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button);
    filterPortfolio(button.dataset.tab || "All");
  });
});

function renderGalleryItem() {
  const item = visibleItems[activeIndex];
  if (!item || !galleryImage || !galleryTitle || !galleryCategory) return;

  galleryImage.src = item.dataset.src || "";
  galleryImage.alt = item.dataset.title || "作品大图";
  galleryTitle.textContent = item.dataset.title || "";
  galleryCategory.textContent = `${activeIndex + 1} / ${visibleItems.length} · ${item.dataset.category || ""}`;
}

function stopAutoplay() {
  if (autoplayTimer) window.clearInterval(autoplayTimer);
  autoplayTimer = null;
}

function startAutoplay() {
  stopAutoplay();
  if (!isPlaying || visibleItems.length <= 1) return;
  autoplayTimer = window.setInterval(() => {
    moveGallery(1);
  }, 3800);
}

function openGallery(item) {
  const category = item.dataset.category;
  const nextVisible = portfolioItems.filter((card) => {
    return card.dataset.category === category && !card.classList.contains("hide");
  });
  visibleItems = nextVisible.length ? nextVisible : portfolioItems;
  activeIndex = Math.max(0, visibleItems.indexOf(item));
  isPlaying = true;
  if (galleryPlay) galleryPlay.textContent = "暂停轮播";
  renderGalleryItem();
  if (gallery) gallery.hidden = false;
  document.body.style.overflow = "hidden";
  startAutoplay();
}

function closeGallery() {
  stopAutoplay();
  if (gallery) gallery.hidden = true;
  if (galleryImage) galleryImage.src = "";
  document.body.style.overflow = "";
}

function moveGallery(direction) {
  if (!visibleItems.length) return;
  activeIndex = (activeIndex + direction + visibleItems.length) % visibleItems.length;
  renderGalleryItem();
}

portfolioItems.forEach((item) => {
  item.addEventListener("click", () => openGallery(item));
});

galleryClose?.addEventListener("click", closeGallery);
galleryPrev?.addEventListener("click", () => {
  moveGallery(-1);
  startAutoplay();
});
galleryNext?.addEventListener("click", () => {
  moveGallery(1);
  startAutoplay();
});

galleryPlay?.addEventListener("click", () => {
  isPlaying = !isPlaying;
  galleryPlay.textContent = isPlaying ? "暂停轮播" : "继续轮播";
  if (isPlaying) startAutoplay();
  else stopAutoplay();
});

gallery?.addEventListener("click", (event) => {
  if (event.target === gallery) closeGallery();
});

window.addEventListener("keydown", (event) => {
  if (!gallery || gallery.hidden) return;
  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") {
    moveGallery(-1);
    startAutoplay();
  }
  if (event.key === "ArrowRight") {
    moveGallery(1);
    startAutoplay();
  }
});
