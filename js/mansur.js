/**
 * Mansur — Single Page Interactivity
 * Razor-Sharp Cutout Head & 4 Interactive Speech Bubbles
 */

document.addEventListener('DOMContentLoaded', () => {
  const mansurHead = document.getElementById('mansurHead');
  const mansurImg = document.getElementById('mansurImg');
  const bubbleStartup = document.getElementById('bubbleStartup');
  const bubbleBekorchi = document.getElementById('bubbleBekorchi');
  const bubbleWhatsUp = document.getElementById('bubbleWhatsUp');
  const bubbleBratim = document.getElementById('bubbleBratim');

  // ── Web Audio Synthesizer (Zero external dependencies) ──
  let audioCtx = null;

  function playPopSound(freqStart = 440, freqEnd = 800) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqStart, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (_) {}
  }

  // ── Mansur Head Click Reaction ──
  mansurHead?.addEventListener('click', () => {
    playPopSound(340, 720);
    mansurHead.classList.remove('clicked');
    void mansurHead.offsetWidth;
    mansurHead.classList.add('clicked');
    setTimeout(() => mansurHead.classList.remove('clicked'), 350);
  });

  // ── Speech Bubble Click Reaction & Wobble ──
  function triggerBubble(el, freq1, freq2) {
    playPopSound(freq1, freq2);
    el.classList.remove('wobble');
    void el.offsetWidth;
    el.classList.add('wobble');
    setTimeout(() => el.classList.remove('wobble'), 500);
  }

  bubbleStartup?.addEventListener('click', () => triggerBubble(bubbleStartup, 600, 950));
  bubbleBekorchi?.addEventListener('click', () => triggerBubble(bubbleBekorchi, 350, 650));
  bubbleWhatsUp?.addEventListener('click', () => triggerBubble(bubbleWhatsUp, 520, 920));
  bubbleBratim?.addEventListener('click', () => triggerBubble(bubbleBratim, 400, 780));

  // ── Parallax Smooth Follow on Mouse Move (Crisp 2D, No Blur) ──
  window.addEventListener('mousemove', (e) => {
    if (!mansurImg || window.innerWidth <= 860) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (e.clientX - centerX) / centerX;
    const deltaY = (e.clientY - centerY) / centerY;

    const moveX = deltaX * 10;
    const moveY = deltaY * 8;
    const rot = deltaX * 2.5;

    mansurImg.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rot}deg)`;
  });

  window.addEventListener('mouseleave', () => {
    if (mansurImg) {
      mansurImg.style.transform = 'translate(0px, 0px) rotate(0deg)';
    }
  });
});
