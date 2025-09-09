// Video Celebration System with Dual Audio Support

export class VideoCelebrationSystem {
  private videoElement: HTMLVideoElement | null = null;
  private videoContainer: HTMLDivElement | null = null;
  private videoCleanupTimer: NodeJS.Timeout | null = null;
  private fireworksAudio: HTMLAudioElement | null = null;
  private hoorayAudio: HTMLAudioElement | null = null;
  private videoAvailableFiles = ['57_24_08_19.mp4'];

  init(): boolean {
    // Only proceed if we can create video elements safely and have videos
    if (!this.canCreateVideoSafely() || this.videoAvailableFiles.length === 0) {
      console.log('Video celebration: No video files available or unable to create video element');
      return false;
    }

    this.createVideoContainer();
    this.loadRandomVideo();
    return true;
  }

  private canCreateVideoSafely(): boolean {
    try {
      const testVideo = document.createElement('video');
      return testVideo && typeof testVideo.play === 'function';
    } catch (e) {
      return false;
    }
  }

  private createVideoContainer(): void {
    // Remove any existing video celebration first
    const existingContainer = document.getElementById('videoCelebrationContainer');
    if (existingContainer) {
      existingContainer.remove();
    }

    // Create container with unique ID and safe z-index
    this.videoContainer = document.createElement('div');
    this.videoContainer.id = 'videoCelebrationContainer';
    this.videoContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 99995;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    document.body.appendChild(this.videoContainer);
  }

  private loadRandomVideo(): void {
    // Create video element with unique properties
    this.videoElement = document.createElement('video');
    this.videoElement.id = 'videoCelebrationVideo';
    
    // Set video properties - FULLSCREEN with fade in
    this.videoElement.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 1s ease-in;
    `;
    
    this.videoElement.muted = false;  // Enable sound
    this.videoElement.volume = 0.5;    // Set volume to 50%
    this.videoElement.autoplay = true;
    this.videoElement.loop = false;
    this.videoElement.preload = 'auto';

    // Try to load a celebration video
    const videoFilename = this.getRandomVideoFile();
    if (videoFilename) {
      this.videoElement.src = `/celebration-videos/${videoFilename}`;
      
      this.videoElement.addEventListener('loadedmetadata', () => {
        console.log('Video celebration: Video loaded successfully');
        const videoDuration = this.videoElement!.duration;
        console.log('Video duration:', videoDuration, 'seconds');
        
        // Ensure video plays with sound
        this.videoElement!.play().catch(err => {
          console.log('Video celebration: Autoplay with sound may be blocked by browser', err);
        });
        
        // Fade in the video
        setTimeout(() => {
          if (this.videoElement) {
            this.videoElement.style.opacity = '0.7';
          }
        }, 100);
        
        // Play both sound effects
        this.playFireworksSound();
        this.playHooraySound();
      });
      
      this.videoElement.addEventListener('error', (e) => {
        console.log('Video celebration: Video failed to load, falling back gracefully');
        this.cleanup();
      });
      
      this.videoElement.addEventListener('ended', () => {
        console.log('Video celebration: Video ended naturally');
        // Don't auto-cleanup here since we want hooray sound to control duration
      });
      
      // Add video to container
      this.videoContainer!.appendChild(this.videoElement);
      
      // Safety timer reduced to 10 seconds (in case hooray sound fails to load)
      this.videoCleanupTimer = setTimeout(() => {
        console.log('Video celebration: Safety limit reached (10s), fading out');
        // Fade out before cleanup
        if (this.videoElement) {
          this.videoElement.style.opacity = '0';
        }
        setTimeout(() => {
          this.cleanup();
        }, 1000);
      }, 10000);
      
    } else {
      // No video available, cleanup container
      console.log('Video celebration: No video file available');
      this.cleanup();
    }
  }

  private getRandomVideoFile(): string | null {
    if (this.videoAvailableFiles.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * this.videoAvailableFiles.length);
    return this.videoAvailableFiles[randomIndex];
  }

  private playFireworksSound(): void {
    // Play the fireworks sound file directly
    this.fireworksAudio = new Audio('/celebration-sounds/fireworks-29629.mp3');
    this.fireworksAudio.volume = 0.7; // Adjust volume as needed
    
    // Play the sound
    this.fireworksAudio.play().then(() => {
      console.log('Fireworks sound playing successfully');
    }).catch(error => {
      console.log('Failed to play fireworks sound:', error);
    });
  }
  
  private playHooraySound(): void {
    // Play the hooray sound file directly
    this.hoorayAudio = new Audio('/celebration-sounds/hooray.mp3');
    this.hoorayAudio.volume = 0.8; // Slightly louder for hooray
    this.hoorayAudio.loop = false; // No looping - play once
    
    // Set up event listener to end video when hooray sound ends
    this.hoorayAudio.addEventListener('ended', () => {
      console.log('Hooray sound ended, stopping video celebration');
      // Fade out video
      if (this.videoElement) {
        this.videoElement.style.opacity = '0';
        // Stop video and cleanup after fade completes
        setTimeout(() => {
          if (this.videoElement) {
            this.videoElement.pause();
          }
          if (this.fireworksAudio) {
            this.fireworksAudio.pause();
          }
          this.cleanup();
        }, 1000); // Wait for fade transition to complete
      }
    });
    
    // Play the hooray sound
    this.hoorayAudio.play().then(() => {
      console.log('Hooray sound playing (no loop)');
    }).catch(error => {
      console.log('Failed to play hooray sound:', error);
    });
  }
  
  cleanup(): void {
    // Clear any timers
    if (this.videoCleanupTimer) {
      clearTimeout(this.videoCleanupTimer);
      this.videoCleanupTimer = null;
    }
    
    // Stop and remove fireworks audio
    if (this.fireworksAudio) {
      this.fireworksAudio.pause();
      this.fireworksAudio.src = '';
      this.fireworksAudio = null;
    }
    
    // Stop and remove hooray audio
    if (this.hoorayAudio) {
      this.hoorayAudio.pause();
      this.hoorayAudio.src = '';
      this.hoorayAudio = null;
    }
    
    // Remove video element safely
    if (this.videoElement) {
      this.videoElement.pause();
      this.videoElement.src = '';
      this.videoElement.load(); // Reset video element
      this.videoElement.remove();
      this.videoElement = null;
    }
    
    // Remove container safely
    if (this.videoContainer) {
      this.videoContainer.remove();
      this.videoContainer = null;
    }
  }
}

// Simple fallback celebration for when video is not available
function createSimpleCelebration(message: string): void {
  // Create celebration message
  const messageEl = document.createElement('div');
  messageEl.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    font-size: 48px;
    font-weight: 900;
    color: white;
    text-shadow: 
      0 0 10px rgba(255, 255, 255, 0.8),
      0 0 20px rgba(255, 255, 255, 0.6),
      0 0 30px rgba(102, 126, 234, 0.8),
      0 0 40px rgba(102, 126, 234, 0.6);
    z-index: 100000;
    pointer-events: none;
    animation: celebrationPulse 3s ease-out forwards;
    text-align: center;
    line-height: 1.2;
  `;
  messageEl.innerHTML = message || 'AWESOME! 🎉';
  document.body.appendChild(messageEl);

  // Add animation styles if not already present
  if (!document.getElementById('celebrationStyles')) {
    const style = document.createElement('style');
    style.id = 'celebrationStyles';
    style.textContent = `
      @keyframes celebrationPulse {
        0% {
          transform: translate(-50%, -50%) scale(0) rotate(-180deg);
          opacity: 0;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Remove message after animation
  setTimeout(() => messageEl.remove(), 4000);
  
  // Play a simple beep sound as fallback
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBQAA');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore if audio fails
  } catch(e) {}
}

// Main celebration function that tries video first, then falls back
export function epicCelebration(message?: string): void {
  // Try video celebration first
  const videoCelebration = new VideoCelebrationSystem();
  const videoSuccess = videoCelebration.init();
  
  if (videoSuccess) {
    console.log('Video celebration: Playing video celebration');
    // Video is playing, don't show simple fallback
  } else {
    // Video not available, fall back to simple celebration
    console.log('Video celebration: No video available, using simple celebration fallback');
    createSimpleCelebration(message || 'AWESOME! 🎉');
  }
}

// Expose globally for compatibility
if (typeof window !== 'undefined') {
  (window as any).epicCelebration = epicCelebration;
  (window as any).cleanupVideoCelebration = () => {
    // Emergency cleanup function
    const container = document.getElementById('videoCelebrationContainer');
    if (container) container.remove();
  };
}