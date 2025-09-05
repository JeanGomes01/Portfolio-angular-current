import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';
export type ColorScheme = 'purple' | 'red' | 'violet' | 'blue' | 'gold' | 'pink' | 'lime' | 'orange' | 'green' | 'yellow';

export interface ColorPalette {
  primary: string;
  accent: string;
  primaryDark: string;
  primaryLight: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');
  private colorSubject = new BehaviorSubject<ColorScheme>('blue');
  public theme$ = this.themeSubject.asObservable();
  public color$ = this.colorSubject.asObservable();

  private colorPalettes: Record<ColorScheme, ColorPalette> = {
    purple: {
      primary: '#8b5cf6',
      accent: '#7c3aed',
      primaryDark: '#7c3aed',
      primaryLight: '#a78bfa'
    },
    red: {
      primary: '#ef4444',
      accent: '#dc2626',
      primaryDark: '#dc2626',
      primaryLight: '#f87171'
    },
    violet: {
      primary: '#7c3aed',
      accent: '#6d28d9',
      primaryDark: '#6d28d9',
      primaryLight: '#a78bfa'
    },
    blue: {
      primary: '#3b82f6',
      accent: '#2563eb',
      primaryDark: '#2563eb',
      primaryLight: '#60a5fa'
    },
    gold: {
      primary: '#f59e0b',
      accent: '#d97706',
      primaryDark: '#d97706',
      primaryLight: '#fbbf24'
    },
    pink: {
      primary: '#ec4899',
      accent: '#db2777',
      primaryDark: '#db2777',
      primaryLight: '#f472b6'
    },
    lime: {
      primary: '#84cc16',
      accent: '#65a30d',
      primaryDark: '#65a30d',
      primaryLight: '#a3e635'
    },
    orange: {
      primary: '#f97316',
      accent: '#ea580c',
      primaryDark: '#ea580c',
      primaryLight: '#fb923c'
    },
    green: {
      primary: '#22c55e',
      accent: '#16a34a',
      primaryDark: '#16a34a',
      primaryLight: '#4ade80'
    },
    yellow: {
      primary: '#eab308',
      accent: '#ca8a04',
      primaryDark: '#ca8a04',
      primaryLight: '#facc15'
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadTheme();
    this.loadColor();
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

  private loadColor(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.setColor('blue');
      return;
    }

    try {
      const savedColor = localStorage.getItem('colorScheme') as ColorScheme;
      if (savedColor && this.colorPalettes[savedColor]) {
        this.setColor(savedColor);
      } else {
        this.setColor('blue');
      }
    } catch (error) {
      console.warn('Error loading color from localStorage:', error);
      this.setColor('blue');
    }
  }

  public getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  public getCurrentColor(): ColorScheme {
    return this.colorSubject.value;
  }

  public getCurrentColorPalette(): ColorPalette {
    return this.colorPalettes[this.getCurrentColor()];
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
        this.applyThemeAndColor();
      } catch (error) {
        console.warn('Error setting theme:', error);
      }
    }
  }

  public setColor(color: ColorScheme): void {
    this.colorSubject.next(color);
    
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('colorScheme', color);
        this.applyThemeAndColor();
      } catch (error) {
        console.warn('Error setting color:', error);
      }
    }
  }

  private applyThemeAndColor(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const theme = this.getCurrentTheme();
      const colorPalette = this.getCurrentColorPalette();
      
      // Add transition class for smooth theme change
      document.documentElement.classList.add('theme-changing');
      
      // Small delay to ensure the transition class is applied
      setTimeout(() => {
        // Apply theme classes
        if (theme === 'dark') {
          document.documentElement.classList.add('dark-theme');
          document.documentElement.classList.remove('light-theme');
        } else {
          document.documentElement.classList.add('light-theme');
          document.documentElement.classList.remove('dark-theme');
        }

        // Apply color variables
        document.documentElement.style.setProperty('--primary-color', colorPalette.primary);
        document.documentElement.style.setProperty('--accent-color', colorPalette.accent);
        document.documentElement.style.setProperty('--primary-dark', colorPalette.primaryDark);
        document.documentElement.style.setProperty('--primary-light', colorPalette.primaryLight);
        
        // Remove transition class after theme change
        setTimeout(() => {
          document.documentElement.classList.remove('theme-changing');
        }, 50);
      }, 10);
    } catch (error) {
      console.warn('Error applying theme and color:', error);
    }
  }
}
