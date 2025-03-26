import { Component } from '@angular/core';
import { environment } from '@enviroments/environment';


@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.component.html',
})
export class GifsSideMenuHeaderComponent {
  env = environment;
}
