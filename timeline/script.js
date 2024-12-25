// script.js

const timeline = document.querySelector('.timeline');
let isDragging = false;
let startX, scrollLeft;

// Mouse down event: Start dragging
timeline.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - timeline.offsetLeft;
  scrollLeft = timeline.offsetLeft;
  timeline.style.cursor = 'grabbing';
});

// Mouse leave event: Stop dragging when the mouse leaves the timeline
timeline.addEventListener('mouseleave', () => {
  isDragging = false;
  timeline.style.cursor = 'default';
});

// Mouse up event: Stop dragging
timeline.addEventListener('mouseup', () => {
  isDragging = false;
  timeline.style.cursor = 'default';
});

// Mouse move event: While dragging, move the timeline
timeline.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - timeline.offsetLeft;
  const walk = x - startX;
  timeline.style.left = scrollLeft + walk + 'px';
});

// For touch devices (mobile) - similar logic
timeline.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - timeline.offsetLeft;
  scrollLeft = timeline.offsetLeft;
});

timeline.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - timeline.offsetLeft;
  const walk = x - startX;
  timeline.style.left = scrollLeft + walk + 'px';
});

timeline.addEventListener('touchend', () => {
  isDragging = false;
});
