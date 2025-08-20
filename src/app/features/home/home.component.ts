import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private typingInterval: any;
  private erasingInterval: any;
  public displayText = 'Software Developer';
  public displayTextWithCursor = 'Software Developer|';
  private isBrowser: boolean;
  private currentIndex = 0;
  private isTyping = true;

  // Texto fixo para digitação
  private readonly text = 'Software Developer';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Só executa no browser e com delay para evitar problemas de SSR
    if (this.isBrowser) {
      // Delay para garantir que a página carregou completamente
      setTimeout(() => {
        this.startTypingEffect();
      }, 2000);
    }
  }

  ngOnDestroy() {
    this.clearIntervals();
  }

  private clearIntervals() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
    if (this.erasingInterval) {
      clearInterval(this.erasingInterval);
      this.erasingInterval = null;
    }
  }

  private startTypingEffect() {
    // Limpa qualquer intervalo existente
    this.clearIntervals();
    this.currentIndex = 0;
    this.displayText = '';
    this.displayTextWithCursor = '';
    
    // Pequeno delay para garantir que o DOM está pronto
    setTimeout(() => {
      this.typeText();
    }, 100);
  }

  private typeText() {
    this.typingInterval = setInterval(() => {
      try {
        if (this.currentIndex < this.text.length) {
          this.displayText = this.text.substring(0, this.currentIndex + 1);
          this.displayTextWithCursor = this.text.substring(0, this.currentIndex + 1) + '|';
          this.currentIndex++;
        } else {
          clearInterval(this.typingInterval);
          this.typingInterval = null;
          // Aguarda 2 segundos antes de começar a apagar
          setTimeout(() => {
            this.eraseText();
          }, 2000);
        }
      } catch (error) {
        console.error('Error in typing:', error);
        this.clearIntervals();
      }
    }, 80); // Velocidade de digitação: 80ms por caractere
  }

  private eraseText() {
    this.erasingInterval = setInterval(() => {
      try {
        if (this.currentIndex > 0) {
          this.displayText = this.text.substring(0, this.currentIndex - 1);
          this.displayTextWithCursor = this.text.substring(0, this.currentIndex - 1) + '|';
          this.currentIndex--;
        } else {
          clearInterval(this.erasingInterval);
          this.erasingInterval = null;
          // Aguarda 500ms antes de começar a digitar novamente
          setTimeout(() => {
            this.typeText();
          }, 500);
        }
      } catch (error) {
        console.error('Error in erasing:', error);
        this.clearIntervals();
      }
    }, 40); // Velocidade de apagamento: 40ms por caractere (mais rápido)
  }
}
