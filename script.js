// ============================================
//  TERMINAL TYPEWRITER EFFECT
// ============================================

const lines = [
  { text: '$ whoami', class: 'cmd', delay: 300 },
  { text: 'evangelos.kotsis', class: 'val', delay: 900 },
  { text: '', class: '', delay: 1200 },
  { text: '$ cat profile.json', class: 'cmd', delay: 1400 },
  { text: '{', class: '', delay: 1900 },
  { text: '  "role": "System Administrator",', class: 'val', delay: 2100 },
  { text: '  "location": "Athens, GR",', class: 'val', delay: 2350 },
  { text: '  "focus": "Cloud & Security",', class: 'val', delay: 2600 },
  { text: '  "certs": ["AZ-900", "SC-900"],', class: 'val', delay: 2850 },
  { text: '  "status": "building & learning"', class: 'val', delay: 3100 },
  { text: '}', class: '', delay: 3350 },
  { text: '', class: '', delay: 3600 },
  { text: '# Seeking: cloud security roles', class: 'cmt', delay: 3800 },
];

const terminal = document.getElementById('terminal-text');

function typeLine(text, className, callback) {
  const span = document.createElement('span');
  if (className) span.className = className;
  terminal.appendChild(span);

  let i = 0;
  const speed = 28;
  const interval = setInterval(() => {
    span.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      terminal.appendChild(document.createElement('br'));
      if (callback) callback();
    }
  }, speed);
}

function runTerminal(index) {
  if (index >= lines.length) {
    // add blinking cursor at end
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    terminal.appendChild(cursor);
    return;
  }

  const line = lines[index];

  setTimeout(() => {
    if (line.text === '') {
      terminal.appendChild(document.createElement('br'));
      runTerminal(index + 1);
    } else {
      typeLine(line.text, line.class, () => runTerminal(index + 1));
    }
  }, index === 0 ? line.delay : 0);
}

// stagger each line manually using scheduled timeouts
function scheduleLines() {
  lines.forEach((line, i) => {
    setTimeout(() => {
      if (line.text === '') {
        terminal.appendChild(document.createElement('br'));
      } else {
        const span = document.createElement('span');
        if (line.class) span.className = line.class;
        span.textContent = line.text;
        terminal.appendChild(span);
        terminal.appendChild(document.createElement('br'));
      }

      if (i === lines.length - 1) {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        terminal.appendChild(cursor);
      }
    }, line.delay);
  });
}

scheduleLines();

// ============================================
//  SCROLL-BASED CARD ANIMATIONS
// ============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .timeline-item, .cert-badge').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ============================================
//  NAV ACTIVE LINK HIGHLIGHT
// ============================================
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});
