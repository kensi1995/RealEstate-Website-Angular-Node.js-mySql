import { Component, OnInit } from '@angular/core';
import { Realestate } from '../models/realState.class';
import { AddRealestateService } from '../services/addRealestate.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category.class';
import { User } from '../models/User.class';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.css'],
})
export class AddRealEstateComponent implements OnInit {
  realestate: Realestate = {} as Realestate;
  loggedUser: any;
  textInputErr: boolean = false;
  priceErr: boolean = false;
  user: User = {} as User;

  categories: Category[] = [];
  //new
  selectedCategoryId!: number;
  constructor(
    private addRealestateService: AddRealestateService,
    private categoriesService: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories = () => {
    this.categoriesService.getCategories().subscribe((response: any) => {
      console.log('getCategories', response);
      this.categories = response;
    });
  };
  addRealestate(evt: any) {
    evt.preventDefault();

    if (this.realestate.name.length < 2) {
      this.textInputErr = true;
      return;
    }
    if (this.realestate.description.length < 2) {
      this.textInputErr = true;
      return;
    }
    if (this.realestate.location.length < 2) {
      this.textInputErr = true;
      return;
    }
    this.loggedUser = localStorage.getItem('LoggedUser');
    this.user = JSON.parse(this.loggedUser);
    this.realestate.user_id = this.user.id;
    //new
    this.realestate.category_id = this.selectedCategoryId;
    console.log('Publish realestate front ', this.realestate);
    this.addRealestateService
      .addRealestate(this.realestate)
      .subscribe((response) => {
        this.toastr.success("'You realestate is successfully published'");
        console.log(response);
      });
  }
}
