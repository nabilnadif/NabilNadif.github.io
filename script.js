let lastScrollTop = 0;
const header = document.querySelector("header");
const timeText = document.querySelector(".time");

document.addEventListener('DOMContentLoaded', function() {
  const contentSection = document.querySelector('.content-section');
  const columns = document.querySelectorAll('.column');
  let overlay, zoomedElement;

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  }

  function zoomIn(element) {
    zoomedElement = element.cloneNode(true); // Clone elemen yang diklik
    zoomedElement.classList.add('zoomed');
    document.body.appendChild(zoomedElement);

    // Buramkan konten lain
    columns.forEach(col => {
      if (col !== element.parentNode) {
        col.classList.add('blurred');
      }
    });

    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Mencegah scrolling latar belakang
  }

  function zoomOut() {
    if (zoomedElement) {
      zoomedElement.remove();
      zoomedElement = null;
    }
    columns.forEach(col => col.classList.remove('blurred'));
    if (overlay) {
      overlay.style.display = 'none';
    }
    document.body.style.overflow = 'auto'; // Izinkan scrolling lagi
  }

  // Tambahkan event listener ke setiap kolom
  columns.forEach(column => {
    column.addEventListener('click', function(event) {
      const clickedElement = event.target.closest('.image-wrapper img, .video-wrapper video');
      if (clickedElement) {
        if (!overlay) {
          createOverlay();
          overlay.addEventListener('click', zoomOut); // Tutup saat overlay diklik
        }
        zoomIn(clickedElement);
      }
    });
  });
});

function revealOnScroll() {
  const progressBars = document.querySelectorAll(".progress-bar");
  const progressPercents = document.querySelectorAll(".progress-percent");
  const windowHeight = window.innerHeight;

  progressBars.forEach((bar, index) => {
    const barTop = bar.getBoundingClientRect().top;
    if (barTop < windowHeight - 100 && !bar.classList.contains("animated")) {
      let percent = bar.getAttribute("data-percent");
      bar.style.width = percent + "%";
      bar.classList.add("animated");
      let counter = 0;
      let interval = setInterval(() => {
        if (counter >= percent) {
          clearInterval(interval);
        } else {
          counter++;
          progressPercents[index].textContent = counter + "%";
        }
      }, 15);
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(revealOnScroll, 300);
});

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  lastScrollTop = scrollTop;
});


const yearText = document.getElementById("year");
const year = new Date().getFullYear();

yearText.textContent = year;

function updateTime() {
  const now = new Date();
  const jakartaTime = now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  const [date, time] = jakartaTime.split(", ");
  timeText.textContent = `${time} GMT+7`;
}

setInterval(updateTime, 1000);
updateTime();

const audio = document.getElementById("audio");
const musicBtn = document.getElementById("music-button");
const icon = musicBtn.querySelector("span");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    icon.textContent = "▶";
  } else {
    audio.play();
    icon.textContent = "⏸";
  }
  isPlaying = !isPlaying;
});

audio.addEventListener("ended", () => {
  icon.textContent = "▶";
  isPlaying = false;
});
