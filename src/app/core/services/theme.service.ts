import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');
  public theme$ = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadTheme();
  }

  private loadTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // Se não estiver no browser, define tema padrão
      this.setTheme('light');
      return;
    }

    try {
      const savedTheme = localStorage.getItem('theme') as Theme;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else if (prefersDark) {
        this.setTheme('dark');
      } else {
        this.setTheme('light');
      }
    } catch (error) {
      console.warn('Error loading theme from localStorage:', error);
      this.setTheme('light');
    }
  }

  public getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  public toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  public setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('theme', theme);
        
        // Add transition class for smooth theme change
        document.documentElement.classList.add('theme-changing');
        
        // Small delay to ensure the transition class is applied
        setTimeout(() => {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.remove('light-theme');
          } else {
            document.documentElement.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
          }
          
          // Remove transition class after theme change
          setTimeout(() => {
            document.documentElement.classList.remove('theme-changing');
          }, 50);
        }, 10);
      } catch (error) {
        console.warn('Error setting theme:', error);
      }
    }
  }
}
