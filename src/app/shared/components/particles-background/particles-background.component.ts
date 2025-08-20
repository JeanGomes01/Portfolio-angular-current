import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-particles-background',
  templateUrl: './particles-background.component.html',
  styleUrls: ['./particles-background.component.scss']
})
export class ParticlesBackgroundComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('particlesContainer', { static: true }) particlesContainer!: ElementRef;
  
  private animationId: number | null = null;
  private particles: Array<{x: number, y: number, vx: number, vy: number, size: number, opacity: number}> = [];
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
    this.repositionParticles();
  }

  ngOnInit(): void {
    this.initParticles();
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
    this.startAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private setupCanvas(): void {
    const canvasElement = this.particlesContainer.nativeElement;
    if (canvasElement instanceof HTMLCanvasElement) {
      this.canvas = canvasElement;
      const ctx = this.canvas.getContext('2d');
      if (ctx) {
        this.ctx = ctx;
        this.resizeCanvas();
      } else {
        console.error('Failed to get 2D context from canvas');
      }
    } else {
      console.error('Element is not a canvas');
    }
  }

  private resizeCanvas(): void {
    if (!this.canvas) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initParticles(): void {
    // Criar partículas simples
    for (let i = 0; i < 350; i++) {
      this.particles.push({
        x: Math.random() * (window.innerWidth || 1200),
        y: Math.random() * (window.innerHeight || 800),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  private repositionParticles(): void {
    if (!this.canvas) return;
    
    const canvas = this.canvas;
    this.particles.forEach(particle => {
      particle.x = Math.random() * canvas.width;
      particle.y = Math.random() * canvas.height;
    });
  }

  private startAnimation(): void {
    if (!this.ctx || !this.canvas) return;

    const animate = () => {
      if (!this.ctx || !this.canvas) return;
      
      // Limpar canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Atualizar e desenhar partículas
      this.particles.forEach(particle => {
        // Atualizar posição
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bater nas bordas
        if (particle.x < 0 || particle.x > this.canvas!.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > this.canvas!.height) particle.vy *= -1;
        
        // Manter na tela
        particle.x = Math.max(0, Math.min(this.canvas!.width, particle.x));
        particle.y = Math.max(0, Math.min(this.canvas!.height, particle.y));
        
        // Desenhar partícula
        this.ctx!.beginPath();
        this.ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx!.fillStyle = `rgba(138, 44, 226, ${particle.opacity})`;
        this.ctx!.fill();
      });
      
      // Desenhar conexões
      this.drawConnections();
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  private drawConnections(): void {
    if (!this.ctx) return;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(138, 44, 226, ${0.1 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }
}
