import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'portfolio-angular';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Garantir que o tema e cores sejam aplicados na inicialização
    this.themeService.setTheme(this.themeService.getCurrentTheme());
    this.themeService.setColor(this.themeService.getCurrentColor());
  }
}
