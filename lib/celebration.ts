// Epic Celebration System 🎉

export class CelebrationSystem {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: any[] = [];
  private confetti: any[] = [];
  private animationId: number | null = null;
  private celebrationText: string = '';
  private colors = [
    '#FF1461', '#18FF92', '#5A87FF', '#FBF38C', '#FF9A00',
    '#C913FF', '#00F5FF', '#FF006E', '#FFBE0B', '#FB5607',
    '#8338EC', '#3A86FF', '#06FFB4', '#FF4365', '#00D9FF'
  ];

  init(message: string = 'AWESOME! 🎉') {
    this.celebrationText = message;
    this.createCanvas();
    this.createConfetti();
    this.animate();
    this.showCelebrationMessage();
    
    // Auto cleanup after 5 seconds
    setTimeout(() => this.cleanup(), 5000);
  }

  private createCanvas() {
    // Remove existing canvas if any
    const existing = document.getElementById('celebrationCanvas');
    if (existing) existing.remove();

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'celebrationCanvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 99999;
    `;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
  }

  private createConfetti() {
    const confettiCount = 150;
    for (let i = 0; i < confettiCount; i++) {
      this.confetti.push({
        x: Math.random() * this.canvas!.width,
        y: -20,
        vx: Math.random() * 6 - 3,
        vy: Math.random() * 3 + 2,
        angle: Math.random() * 360,
        angleSpeed: Math.random() * 10 - 5,
        size: Math.random() * 8 + 5,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        type: Math.random() > 0.5 ? 'square' : 'circle',
        opacity: 1
      });
    }
  }

  private showCelebrationMessage() {
    const messageEl = document.createElement('div');
    messageEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      font-size: 60px;
      font-weight: 900;
      color: white;
      text-shadow: 
        0 0 10px rgba(255, 255, 255, 0.8),
        0 0 20px rgba(255, 255, 255, 0.6),
        0 0 30px rgba(102, 126, 234, 0.8),
        0 0 40px rgba(102, 126, 234, 0.6);
      z-index: 100000;
      pointer-events: none;
      animation: celebrationPulse 2s ease-out forwards;
      text-align: center;
      line-height: 1.2;
    `;
    messageEl.innerHTML = this.celebrationText;
    document.body.appendChild(messageEl);

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes celebrationPulse {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);

    // Remove message after animation
    setTimeout(() => {
      messageEl.remove();
      style.remove();
    }, 3000);
  }

  private animate() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw confetti
    this.confetti = this.confetti.filter(conf => {
      conf.y += conf.vy;
      conf.x += conf.vx;
      conf.angle += conf.angleSpeed;
      conf.vy += 0.1; // gravity
      
      if (conf.y > this.canvas!.height) return false;

      this.ctx!.save();
      this.ctx!.translate(conf.x, conf.y);
      this.ctx!.rotate(conf.angle * Math.PI / 180);
      this.ctx!.globalAlpha = conf.opacity;
      this.ctx!.fillStyle = conf.color;
      
      if (conf.type === 'square') {
        this.ctx!.fillRect(-conf.size/2, -conf.size/2, conf.size, conf.size);
      } else {
        this.ctx!.beginPath();
        this.ctx!.arc(0, 0, conf.size/2, 0, Math.PI * 2);
        this.ctx!.fill();
      }
      
      this.ctx!.restore();
      return true;
    });

    // Update and draw particles
    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.15; // gravity
      particle.life -= particle.decay || 0.02;
      
      if (particle.life <= 0) return false;

      this.ctx!.save();
      this.ctx!.globalAlpha = particle.life;
      this.ctx!.fillStyle = particle.color;
      this.ctx!.beginPath();
      this.ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx!.fill();
      this.ctx!.restore();
      
      return true;
    });

    // Continue animation if there are particles
    if (this.confetti.length > 0 || this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.cleanup();
    }
  }

  private cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas) {
      this.canvas.remove();
    }
    this.particles = [];
    this.confetti = [];
    this.canvas = null;
    this.ctx = null;
  }
}

// Simple celebration function for quick use
export function celebrate(message?: string) {
  const celebration = new CelebrationSystem();
  celebration.init(message);
}

// Epic celebration for milestones
export function epicCelebration(message: string) {
  const celebration = new CelebrationSystem();
  celebration.init(message);
  
  // Play sound if available
  try {
    const audio = new Audio('/celebration-sounds/success1.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Silently fail if audio can't play
    });
  } catch (e) {
    // No audio available
  }
}