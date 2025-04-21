let lastScrollTop = 0;
const header = document.querySelector("header");
const timeText = document.querySelector(".time");

document.addEventListener('DOMContentLoaded', function() {
    const columns = document.querySelectorAll('.column');
    const videos = document.querySelectorAll('.column video');
    let activeColumn = null;

    // Autoplay dan bisukan semua video saat halaman dimuat
    videos.forEach(video => {
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.play().catch(error => {
            console.error("Autoplay dicegah:", error);
        });
    });

    columns.forEach(column => {
        const h3 = column.querySelector('h3');
        const p = column.querySelector('p');
        const videoContainer = column.querySelector('.video-wrapper');
        const video = column.querySelector('video');
        const imageWrapper = column.querySelector('.image-wrapper'); // Dapatkan image wrapper
        const image = column.querySelector('.image-wrapper img');   // Dapatkan gambar

        if (p) {
            p.style.display = 'none';
        }

        column.addEventListener('click', function(event) {
            event.stopPropagation();

            if (activeColumn && activeColumn !== column) {
                activeColumn.classList.remove('active');
                const prevP = activeColumn.querySelector('p');
                const prevVideo = activeColumn.querySelector('video');
                const prevImageWrapper = activeColumn.querySelector('.image-wrapper');
                if (prevP) {
                    prevP.style.display = 'none';
                }
                if (prevVideo) {
                    prevVideo.muted = true;
                }
                if (prevImageWrapper) {
                    prevImageWrapper.classList.remove('active');
                }
                activeColumn = null;
            }

            if (!this.classList.contains('active')) {
                this.classList.add('active');
                if (p) {
                    p.style.display = 'block'; // Pastikan teks ditampilkan saat kolom aktif
                }
                if (video) {
                    video.muted = false;
                }
                if (imageWrapper) {
                    imageWrapper.classList.add('active');
                }
                activeColumn = this;
            } else {
                this.classList.remove('active');
                if (p) {
                    p.style.display = 'none'; // Pastikan teks disembunyikan saat kolom tidak aktif
                }
                if (video) {
                    video.muted = true;
                }
                if (imageWrapper) {
                    imageWrapper.classList.remove('active');
                }
                activeColumn = null;
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (activeColumn && !activeColumn.contains(event.target)) {
            const activeVideo = activeColumn.querySelector('video');
            const activeVideoContainer = activeColumn.querySelector('.video-wrapper');
            const activeImageWrapper = activeColumn.querySelector('.image-wrapper');
            activeColumn.classList.remove('active');
            const prevP = activeColumn.querySelector('p');
            if (prevP) {
                prevP.style.display = 'none';
            }
            if (activeVideo) {
                activeVideo.muted = true;
            }
            if (activeImageWrapper) {
                activeImageWrapper.classList.remove('active');
            }
            activeColumn = null;
        }
    });
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
