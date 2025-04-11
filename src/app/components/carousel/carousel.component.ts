import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  slides = [
    {
      image: 'assets/images/sale.png',
      caption: '🔥 Большие скидки сегодня!'
    },
    {
      image: 'assets/images/new.png',
      caption: '🆕 Новые поступления'
    },
    {
      image: 'assets/images/free.png',
      caption: '🚚 Бесплатная доставка'
    }
  ];

  currentSlide = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000); // смена слайда каждые 3 секунды
  }
}
