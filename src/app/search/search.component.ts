import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  realestateName: string = '';
  //new
  searchQuery: string = '';

  constructor(private SearchService: SearchService) {}
  //new
  @Output() searchEvent = new EventEmitter<string>();

  ngOnInit(): void {}

  //new
  search(): void {
    this.searchEvent.emit(this.searchQuery);
  }

  async searchRealestates() {
    this.SearchService.updateFilter({ realestateName: this.realestateName });
    await this.SearchService.searchRealestates();
  }
}
