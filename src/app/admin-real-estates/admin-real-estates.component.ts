import { Component, OnInit } from '@angular/core';
import { Realestate } from '../models/realState.class';
import { GetAllRealestatesService } from '../services/getAllRealestates.service';
import { AddRealestateService } from '../services/addRealestate.service';

@Component({
  selector: 'app-admin-real-estates',
  templateUrl: './admin-real-estates.component.html',
  styleUrls: ['./admin-real-estates.component.css'],
})
export class AdminRealEstatesComponent implements OnInit {
  realestates: Realestate[] = [];
  realestate: Realestate = {} as Realestate;
  constructor(
    private getAllRealestatesService: GetAllRealestatesService,
    private deleteRealestate: AddRealestateService
  ) {}

  ngOnInit(): void {
    this.getRealestates();
  }

  deleteOneRealestate(realestateId: number) {
    this.deleteRealestate
      .deleteRealestate(realestateId)
      .subscribe((response) => {
        console.log('Realestate is deleted');
        this.getRealestates();
      });
  }

  getRealestates() {
    this.getAllRealestatesService
      .getRealestates(this.realestate)
      .subscribe((response: any) => {
        console.log(response);
        this.realestates = response;
      });
  }
}
