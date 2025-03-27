import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.publicUrl}/gifs/trenfding`, {
      params: {
        api_key: environment.giphyApikey,
        limit: 20,
      },
    });
  }
}
