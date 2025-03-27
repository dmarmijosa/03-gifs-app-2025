import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'app-trending-page',
  //imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export class TrendingPageComponent {
  scrollDivRef = viewChild<ElementRef>('groupDiv');
  gifService = inject(GifService);

  onScroll(event: Event) {
    const scrollDiv =  this.scrollDivRef()?.nativeElement;
    console.log(scrollDiv);
  }
}
