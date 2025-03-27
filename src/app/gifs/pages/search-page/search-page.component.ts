import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {

  private gifService = inject(GifService);

  gifs = signal<Gif[]>([])

  onSearch(query:string){
    this.gifService.searchGifs(query).subscribe((resp)=>{
      this.gifs.set(resp)
    });

  }
}
