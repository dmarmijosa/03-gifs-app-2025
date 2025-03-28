import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, effect } from '@angular/core';
import { environment } from '@enviroments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'searchHistory';

const loadFromLocalStorage = () => {
  const gifsLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  return JSON.parse(gifsLocalStorage);
};

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);

  private trendingPage = signal<number>(0);

  trendingGifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    const agrupador = 3;
    for (let i = 0; i < this.trendingGifs().length; i += agrupador) {
      groups.push(this.trendingGifs().slice(i, i + agrupador));
    }
    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  searchHistoryKeys = computed(() => {
    return Object.keys(this.searchHistory());
  });

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  });

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);
    this.http
      .get<GiphyResponse>(`${environment.publicUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApikey,
          limit: 20,
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.trendingGifsLoading.set(false);
        this.trendingPage.update((page) => page + 1);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.publicUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApikey,
          limit: 20,
          q: query,
        },
      })
      .pipe(
        //map(({ data }) => data),
        //tap((data) => console.log('Giphy data:', data )),
        map(({ data }) => GifMapper.mapGiphyItemsToGifArray(data)),

        tap((gifs) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: gifs,
          }));
        })
      );
  }

  getHistoryGifs(query: string | undefined): Gif[] {
    if (!query) return [];
    return this.searchHistory()[query];
  }
}
