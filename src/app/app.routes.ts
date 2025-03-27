import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page.component').then(
        (c) => c.DashboardPageComponent
      ),
    children: [
      {
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/search-page/search-page.component').then(
            (c) => c.SearchPageComponent
          ),
      },
      {
        path: 'trending',
        loadComponent: () =>
          import('./gifs/pages/trending-page/trending-page.component').then(
            (c) => c.TrendingPageComponent
          ),
      },
      {
        path: 'history/:query',
        loadComponent: () =>
          import('./gifs/pages/gif-history/gif-history.component'),
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
