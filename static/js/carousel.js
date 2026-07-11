document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".carousel").forEach(function (carousel) {
    const track = carousel.querySelector("ul");
    const slides = Array.from(track.children);
    const dotsContainer = carousel.querySelector("ol");
    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    let current = 0;
    const total = slides.length;
    const duration = parseInt(carousel.getAttribute("duration"), 10) * 1000 || 0;
    let timer = null;

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;

      dots.forEach((dot, i) => {
        const link = dot.querySelector("a");
        if (link) link.classList.toggle("active", i === current);
      });
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (nextBtn) nextBtn.addEventListener("click", () => { next(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); resetTimer(); });

    dots.forEach((dot, i) => {
      const link = dot.querySelector("a");
      if (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          goTo(i);
          resetTimer();
        });
      }
    });

    function startTimer() {
      if (duration > 0 && total > 1) {
        timer = setInterval(next, duration);
      }
    }

    function resetTimer() {
      if (timer) clearInterval(timer);
      startTimer();
    }

    goTo(0);
    startTimer();
  });
});
