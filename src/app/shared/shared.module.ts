import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from './components/theme-toggle';
import { ThemeButtonComponent } from './components/theme-button';
import { ParticlesBackgroundComponent } from './components/particles-background';
import { NavigationComponent } from './components/navigation';

@NgModule({
  declarations: [
    ThemeToggleComponent,
    ThemeButtonComponent,
    ParticlesBackgroundComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ThemeToggleComponent,
    ThemeButtonComponent,
    ParticlesBackgroundComponent,
    NavigationComponent
  ]
})
export class SharedModule { }
