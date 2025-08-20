import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit {
  
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  
  ngOnInit() {
    // Registrar os elementos customizados do Swiper
    register();
  }

  ngAfterViewInit() {
    // Aguardar um pouco mais para garantir que o DOM esteja pronto
    setTimeout(() => {
      this.initializeSwiper();
    }, 500);
  }

  private initializeSwiper() {
    try {
      const swiperEl = this.swiperContainer?.nativeElement;
      
      if (swiperEl) {
        console.log('Swiper element found, initializing...');
        
        // Configurações do Swiper
        const swiperParams = {
          slidesPerView: 'auto',
          spaceBetween: 20,
          centeredSlides: false,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          effect: 'slide',
          speed: 800,
          grabCursor: true,
          breakpoints: {
            320: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1200: { slidesPerView: 5, spaceBetween: 25 }
          }
        };

        // Aplicar configurações
        Object.assign(swiperEl, swiperParams);
        
        // Inicializar o Swiper
        swiperEl.initialize();
        
        console.log('Swiper initialized successfully');
        
        // Verificar se o Swiper foi inicializado
        setTimeout(() => {
          if (swiperEl.swiper) {
            console.log('Swiper instance created:', swiperEl.swiper);
          } else {
            console.log('Swiper instance not created, trying alternative approach...');
            this.initializeSwiperAlternative();
          }
        }, 1000);
        
      } else {
        console.log('Swiper element not found');
        this.initializeSwiperAlternative();
      }
    } catch (error) {
      console.error('Error initializing Swiper:', error);
      this.initializeSwiperAlternative();
    }
  }

  private initializeSwiperAlternative() {
    // Abordagem alternativa usando querySelector
    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      console.log('Found swiper-container via querySelector');
      
      const swiperParams = {
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: false,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        effect: 'slide',
        speed: 800,
        grabCursor: true,
        breakpoints: {
          320: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1200: { slidesPerView: 5, spaceBetween: 25 }
        }
      };

      Object.assign(swiperEl, swiperParams);
      swiperEl.initialize();
      
      console.log('Alternative Swiper initialization completed');
    }
  }
}
