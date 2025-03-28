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
    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;

    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    console.log(isAtBottom);
    console.log({scrolltotal: scrollTop + clientHeight,scrollHeight});
  }
}
