import { Component } from '@angular/core';
import { ThemeService, ColorScheme } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  isSwitcherOpen = false;

  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleSwitcher(): void {
    this.isSwitcherOpen = !this.isSwitcherOpen;
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.themeService.setTheme(theme);
  }

  setColor(color: ColorScheme): void {
    this.themeService.setColor(color);
  }
}
