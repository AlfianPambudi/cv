/* ============================================================
   CV JAPAN TEMPLATE — main.js
   Sakura · Dark/Light Mode · Music · Email · WhatsApp
   ============================================================ */

// ── Theme Manager ────────────────────────────────────────────
const ThemeManager = {
  key: 'cv-japan-theme',

  init() {
    const saved = localStorage.getItem(this.key) || 'dark';
    this.set(saved, false);

    document.getElementById('themeBtn').addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      this.set(current === 'dark' ? 'light' : 'dark');
    });
  },

  set(theme, animate = true) {
    if (animate) {
      document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById('themeIcon').textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem(this.key, theme);
  }
};

// ── Sakura Animation ─────────────────────────────────────────
const Sakura = {
  canvas: null,
  ctx: null,
  petals: [],
  animId: null,

  init() {
    this.canvas = document.getElementById('sakuraCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.spawn(30);
    this.animate();
  },

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  createPetal() {
    return {
      x: Math.random() * this.canvas.width,
      y: -20,
      size: Math.random() * 8 + 5,
      speedX: (Math.random() - 0.5) * 1.2,
      speedY: Math.random() * 1.5 + 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.3 ? '#ffb7c5' : '#ffd6e0',
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayAmp: Math.random() * 1.5 + 0.5,
    };
  },

  spawn(count) {
    for (let i = 0; i < count; i++) {
      const p = this.createPetal();
      p.y = Math.random() * window.innerHeight; // stagger start
      this.petals.push(p);
    }
  },

  drawPetal(p) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.5, p.size * 1.2, -p.size * 0.2, p.size, 0);
    ctx.bezierCurveTo(p.size * 1.2, p.size * 0.2, p.size * 0.5, p.size * 0.5, 0, 0);

    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.restore();
  },

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.petals.forEach((p, i) => {
      p.sway += p.swaySpeed;
      p.x += p.speedX + Math.sin(p.sway) * p.swayAmp;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      this.drawPetal(p);

      // Reset if out of bounds
      if (p.y > this.canvas.height + 20) {
        this.petals[i] = this.createPetal();
      }
    });

    // Occasionally add new petal
    if (Math.random() < 0.03 && this.petals.length < 60) {
      this.petals.push(this.createPetal());
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }
};

// ── Music Player ─────────────────────────────────────────────
const MusicPlayer = {
  audio: null,
  playing: false,
  btn: null,
  icon: null,
  status: null,

  init() {
    this.audio = document.getElementById('bgMusic');
    this.btn = document.getElementById('musicBtn');
    this.icon = document.getElementById('musicIcon');
    this.status = document.getElementById('musicStatus');
    const slider = document.getElementById('volumeSlider');

    // Default volume
    this.audio.volume = parseFloat(slider.value);

    slider.addEventListener('input', (e) => {
      this.audio.volume = parseFloat(e.target.value);
    });

    this.btn.addEventListener('click', () => {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    });

    // Auto handle audio end (loop is set in HTML)
    this.audio.addEventListener('error', () => {
      this.status.textContent = 'Tidak ada musik';
    });
  },

  play() {
    if (!this.audio.src || this.audio.src === window.location.href) {
      this.showNoMusicMsg();
      return;
    }
    this.audio.play().then(() => {
      this.playing = true;
      this.updateUI(true);
    }).catch(() => {
      this.showNoMusicMsg();
    });
  },

  pause() {
    this.audio.pause();
    this.playing = false;
    this.updateUI(false);
  },

  updateUI(isPlaying) {
    if (isPlaying) {
      this.btn.style.color = 'var(--accent)';
      this.btn.style.borderColor = 'var(--accent)';
      this.status.textContent = '♪ Bermain';
    } else {
      this.btn.style.color = '';
      this.btn.style.borderColor = '';
      this.status.textContent = 'Musik';
    }
  },

  showNoMusicMsg() {
    const s = this.status;
    s.textContent = '! Tambah file musik';
    s.classList.remove('hidden');
    setTimeout(() => {
      s.textContent = 'Musik';
    }, 3000);
  }
};

// ── Navbar Behavior ──────────────────────────────────────────
const Navbar = {
  el: null,

  init() {
    this.el = document.getElementById('navbar');
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Mobile menu
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => menu.classList.add('hidden'));
    });
  },

  onScroll() {
    if (window.scrollY > 60) {
      this.el.classList.add('scrolled');
    } else {
      this.el.classList.remove('scrolled');
    }
  }
};

// ── Skill Bars Animation ─────────────────────────────────────
const SkillBars = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-fill');
          fills.forEach(fill => {
            const w = fill.getAttribute('data-w');
            fill.style.width = w + '%';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skills-col').forEach(col => observer.observe(col));
  }
};

// ── Scroll Reveal ─────────────────────────────────────────────
const RevealOnScroll = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
};

// ── Portfolio Filter ─────────────────────────────────────────
const PortfolioFilter = {
  init() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-card');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
            card.classList.remove('hidden');
            setTimeout(() => card.classList.add('visible'), 50);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }
};

// ── Form Tabs ────────────────────────────────────────────────
const FormTabs = {
  init() {
    const tabs = document.querySelectorAll('.form-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-tab');
        document.querySelectorAll('.form-panel').forEach(p => {
          p.classList.add('hidden');
          p.classList.remove('active');
        });
        const panel = document.getElementById(target + 'Form');
        panel.classList.remove('hidden');
        panel.classList.add('active');
      });
    });
  }
};

// ── Email Form ────────────────────────────────────────────────
const EmailForm = {
  init() {
    document.getElementById('sendEmailBtn').addEventListener('click', () => this.send());
  },

  async send() {
    const name    = document.getElementById('emailName').value.trim();
    const email   = document.getElementById('emailAddress').value.trim();
    const subject = document.getElementById('emailSubject').value.trim();
    const message = document.getElementById('emailMessage').value.trim();

    if (!name || !email || !subject || !message) {
      this.feedback('Tolong isi semua field ya 🙏', 'error');
      return;
    }

    const btn     = document.getElementById('sendEmailBtn');
    const btnText = document.getElementById('emailBtnText');
    const spinner = document.getElementById('emailSpinner');

    btn.disabled = true;
    btnText.textContent = 'Mengirim...';
    spinner.classList.remove('hidden');
    this.clearFeedback();

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      const data = await res.json();

      if (data.success) {
        this.feedback('✅ ' + data.message, 'success');
        this.clearForm();
      } else {
        this.feedback('❌ ' + data.message, 'error');
      }
    } catch {
      this.feedback('❌ Gagal terhubung ke server.', 'error');
    } finally {
      btn.disabled = false;
      btnText.textContent = 'Kirim Email';
      spinner.classList.add('hidden');
    }
  },

  feedback(msg, type) {
    const el = document.getElementById('emailFeedback');
    el.textContent = msg;
    el.className = `form-feedback ${type}`;
    el.classList.remove('hidden');
    if (type === 'success') {
      setTimeout(() => el.classList.add('hidden'), 5000);
    }
  },

  clearFeedback() {
    const el = document.getElementById('emailFeedback');
    el.classList.add('hidden');
  },

  clearForm() {
    ['emailName','emailAddress','emailSubject','emailMessage'].forEach(id => {
      document.getElementById(id).value = '';
    });
  }
};

// ── WhatsApp Form ─────────────────────────────────────────────
const WhatsAppForm = {
  init() {
    document.getElementById('sendWaBtn').addEventListener('click', () => this.send());

    // Quick contact card
    document.getElementById('waQuickBtn').addEventListener('click', () => {
      // Scroll ke form WA dan switch tab
      document.getElementById('kontak').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        document.querySelectorAll('.form-tab')[1].click();
      }, 600);
    });
  },

  async send() {
    const name    = document.getElementById('waName').value.trim();
    const topic   = document.getElementById('waTopic').value;
    const message = document.getElementById('waMessage').value.trim();

    if (!name || !message) {
      this.feedback('Tolong isi nama dan pesan 🙏', 'error');
      return;
    }

    const fullMessage = topic
      ? `[${topic}]\n\n${message}`
      : message;

    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message: fullMessage })
      });
      const data = await res.json();

      if (data.success) {
        window.open(data.url, '_blank');
      } else {
        this.feedback('❌ Gagal membuka WhatsApp.', 'error');
      }
    } catch {
      this.feedback('❌ Gagal terhubung ke server.', 'error');
    }
  },

  feedback(msg, type) {
    const el = document.getElementById('waFeedback');
    el.textContent = msg;
    el.className = `form-feedback ${type}`;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 4000);
  }
};

// ── Smooth active nav highlight on scroll ─────────────────────
const ActiveNav = {
  init() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });

      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
          link.style.color = 'var(--accent)';
        }
      });
    }, { passive: true });
  }
};

// ── Init Everything ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Sakura.init();
  MusicPlayer.init();
  Navbar.init();
  SkillBars.init();
  RevealOnScroll.init();
  PortfolioFilter.init();
  FormTabs.init();
  EmailForm.init();
  WhatsAppForm.init();
  ActiveNav.init();

  // Animate hero elements on load
  setTimeout(() => {
    document.querySelectorAll('.hero-content > *').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i * 100);
    });
  }, 100);
});


const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicStatus = document.getElementById("musicStatus");
const volumeSlider = document.getElementById("volumeSlider");

music.volume = 0.3;

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicStatus.textContent = "Pause";
  } else {
    music.pause();
    musicStatus.textContent = "Musik";
  }
});

volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});