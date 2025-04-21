let lastScrollTop = 0;
const header = document.querySelector("header");
const timeText = document.querySelector(".time");

document.addEventListener('DOMContentLoaded', function() {
    const columns = document.querySelectorAll('.column');
    const contentGv = document.querySelector('.content-gv'); // Meskipun tidak kita gunakan untuk blur lagi
    let activeColumn = null;
  
    columns.forEach(column => {
        const h3 = column.querySelector('h3');
        const p = column.querySelector('p');
  
        if (p) {
            p.style.display = 'none';
        }
  
        column.addEventListener('click', function(event) {
            event.stopPropagation();
  
            if (activeColumn && activeColumn !== column) {
                activeColumn.classList.remove('active');
                const prevP = activeColumn.querySelector('p');
                if (prevP) {
                    prevP.style.display = 'none';
                }
                activeColumn = null;
            }
  
            if (!this.classList.contains('active')) {
                this.classList.add('active');
                if (p) {
                    p.style.display = 'block';
                }
                activeColumn = this;
            } else {
                this.classList.remove('active');
                if (p) {
                    p.style.display = 'none';
                }
                activeColumn = null;
            }
        });
    });
  
    document.addEventListener('click', function(event) {
        if (activeColumn && !activeColumn.contains(event.target)) {
            activeColumn.classList.remove('active');
            const prevP = activeColumn.querySelector('p');
            if (prevP) {
                prevP.style.display = 'none';
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