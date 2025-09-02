import { Component } from '@angular/core';
import { DummyDataService } from './services/dummy-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';

  constructor(private dummyData: DummyDataService) {
    dummyData.seed();
  }
}
