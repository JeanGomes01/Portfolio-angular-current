import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private typingInterval: any;
  private erasingInterval: any;
  public displayText = 'Software Developer';
  public displayTextWithCursor = 'Software Developer|';
  private isBrowser: boolean;
  private currentIndex = 0;
  private isTyping = true;

  private readonly text = 'Software Developer';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    
    if (this.isBrowser) {
      
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
    
    this.clearIntervals();
    this.currentIndex = 0;
    this.displayText = '';
    this.displayTextWithCursor = '';

   
    setTimeout(() => {
      this.typeText();
    }, 100);
  }

  private typeText() {
    this.typingInterval = setInterval(() => {
      try {
        if (this.currentIndex < this.text.length) {
          this.displayText = this.text.substring(0, this.currentIndex + 1);
          this.displayTextWithCursor =
            this.text.substring(0, this.currentIndex + 1) + '|';
          this.currentIndex++;
        } else {
          clearInterval(this.typingInterval);
          this.typingInterval = null;
         
          setTimeout(() => {
            this.eraseText();
          }, 2000);
        }
      } catch (error) {
        console.error('Error in typing:', error);
        this.clearIntervals();
      }
    }, 80);
  }

  private eraseText() {
    this.erasingInterval = setInterval(() => {
      try {
        if (this.currentIndex > 0) {
          this.displayText = this.text.substring(0, this.currentIndex - 1);
          this.displayTextWithCursor =
            this.text.substring(0, this.currentIndex - 1) + '|';
          this.currentIndex--;
        } else {
          clearInterval(this.erasingInterval);
          this.erasingInterval = null;
          
          setTimeout(() => {
            this.typeText();
          }, 500);
        }
      } catch (error) {
        console.error('Error in erasing:', error);
        this.clearIntervals();
      }
    }, 40); 
  }

  public isDownloading = false;
  public downloadMessage = 'Download CV';

  onDownloadClick() {
    this.isDownloading = true;
    this.downloadMessage = 'Baixando...';

    
    setTimeout(() => {
      this.isDownloading = false;
      this.downloadMessage = 'Download concluído ✅';

      
      setTimeout(() => {
        this.downloadMessage = 'Download CV';
      }, 2000);
    }, 1500);
  }
}
