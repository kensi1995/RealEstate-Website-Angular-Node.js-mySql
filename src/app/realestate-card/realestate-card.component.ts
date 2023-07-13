import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Realestate } from '../models/realState.class';
import { GetAllRealestatesService } from '../services/getAllRealestates.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-realestate-card',
  templateUrl: './realestate-card.component.html',
  styleUrls: ['./realestate-card.component.css'],
})
export class RealestateCardComponent implements OnInit {
  realestates: Realestate[] = [];
  realestate: Realestate = {} as Realestate;
  realesatteSubscription: Subscription | undefined;

  filteredRealestates: Realestate[] = [];
  searchQuery: string = '';
  constructor(
    private getAllRealestatesService: GetAllRealestatesService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnDestroy(): void {
    this.realesatteSubscription?.unsubscribe();
    this.searchService.resetValues();
  }

  ngOnInit(): void {
    this.realesatteSubscription = this.searchService.realestates.subscribe(
      (realestates: Realestate[]) => {
        this.realestates = realestates;
        this.filteredRealestates = realestates;
        console.log('Nekretnine', realestates);
      }
    );
    this.searchService.searchRealestates();

    this.searchService.searchQuery.subscribe(
      (query: string) => {
        // Perform the search and update the realestates array based on the query
        this.searchService.newsearchAllRealestates(query).subscribe(
          (results: any[]) => {
            this.realestates = results;
          },
          (error: any) => {
            console.error(error);
          }
        );
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  goToRealestatePage(i: number) {
    const realestate = this.realestates[i];
    this.router.navigateByUrl(`realestate/page/${i}`);
    console.log('ovdje realestates', realestate);
  }

  //new
  performSearch(query: string): void {
    this.filteredRealestates = this.realestates.filter((realestate) =>
      realestate.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // goToRealestatePage(realestateId: number) {
  //   this.router.navigateByUrl(`realestate/page/${realestateId}`);
  //   console.log('ovdje realestates', realestateId);
  // }
}
