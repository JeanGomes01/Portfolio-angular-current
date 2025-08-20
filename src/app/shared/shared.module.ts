import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from './components/theme-toggle';
import { ParticlesBackgroundComponent } from './components/particles-background';

@NgModule({
  declarations: [
    ThemeToggleComponent,
    ParticlesBackgroundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThemeToggleComponent,
    ParticlesBackgroundComponent
  ]
})
export class SharedModule { }
