import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService, Theme, ColorScheme } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  menuItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: '👨‍💻' },
    { path: '/projects', label: 'Projects', icon: '💼' },
    { path: '/contact', label: 'Contact', icon: '📧' }
  ];

  isMenuOpen = false;
  hoveredItem: string | null = null;
  currentTheme: Theme = 'light';
  currentColor: ColorScheme = 'blue';
  
  private themeSubscription?: Subscription;
  private colorSubscription?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.theme$.subscribe((theme: Theme) => {
      this.currentTheme = theme;
    });

    // Subscribe to color changes
    this.colorSubscription = this.themeService.color$.subscribe((color: ColorScheme) => {
      this.currentColor = color;
    });

    // Get initial values
    this.currentTheme = this.themeService.getCurrentTheme();
    this.currentColor = this.themeService.getCurrentColor();
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.colorSubscription) {
      this.colorSubscription.unsubscribe();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onMouseEnter(item: string): void {
    this.hoveredItem = item;
  }

  onMouseLeave(): void {
    this.hoveredItem = null;
  }

  isHovered(item: string): boolean {
    return this.hoveredItem === item;
  }
}
