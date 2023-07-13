import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.class';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
})
export class AdminCategoriesComponent implements OnInit {
  categories: any;
  newCategory: string = '';
  category: Category = {} as Category;
  togle: boolean = false;
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  togleInput() {
    this.togle = true;
  }

  saveCategory() {
    this.category.name = this.newCategory;
    this.categoriesService.addCategory(this.category).subscribe((response) => {
      console.log('Category is saved', this.category);
      this.getCategories();
    });

    this.newCategory = '';
    this.togle = false;
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((response: any) => {
      this.categories = response;
      console.log(response);
    });
  }
}
