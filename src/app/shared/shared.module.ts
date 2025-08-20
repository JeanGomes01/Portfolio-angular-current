import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from './components/theme-toggle';
import { ParticlesBackgroundComponent } from './components/particles-background';
import { NavigationComponent } from './components/navigation';

@NgModule({
  declarations: [
    ThemeToggleComponent,
    ParticlesBackgroundComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ThemeToggleComponent,
    ParticlesBackgroundComponent,
    NavigationComponent
  ]
})
export class SharedModule { }
