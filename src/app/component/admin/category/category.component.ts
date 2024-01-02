import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { find } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  constructor(private categoryservice: CategoryService,private toastr: ToastrService) {}
  editId = 0;
  id: number = 0;
  category: string = '';
  categories: Category[] = [];
  Sno:number=1

  ngOnInit(): void {
    this.categoryservice.getCategories().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.categories = response.data;
          console.log(response.data);
          
         
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        this.toastr.error("  hiii ")
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }
  onSubmit(categoryForm: NgForm): void {
    const addcategory: Category = {
      id: 0,
      category: this.category,
    };

    console.log('Submitting category:', addcategory);

    if (this.editId === 0) {
      this.categoryservice.addCategories(addcategory).subscribe({
        next: (response: any) => {
          this.categories = response.data;
          categoryForm.reset();
          console.log('Category added successfully:', response);
          this.toastr.success("category Added")
        },
        error: (err) => {
          console.error('An error occurred while adding the category:', err);
        },
        complete: () => console.log('Category addition complete.'),
      });
    } else {
      this.categoryservice
        .updateCategories({ id: this.id, category: this.category })
        .subscribe({
          next: (response: any) => {
            this.categories = response.data;
            categoryForm.reset();

            console.log('Category added successfully:', response);
          },
          error: (err) => {
            console.error('An error occurred while adding the category:', err);
          },
        });
    }
  }

  edit(category: Category) {
    (this.id = category.id), (this.category = category.category);
    this.editId = 1;

    // this.id = id;
    // let newCategory = this.categories.find((item) => item.id == id);
    // this.category = newCategory?.category!;
  }

  delete(id: number) {
    console.log(id);
    this.categoryservice.deleteCategory(id).subscribe({
      next: (response: any) => {
        this.ngOnInit();
        console.log('Category added successfully:', response);
      },
      error: (err) => {
        console.error('An error occurred while adding the category:', err);
      },
    });
  }
  close() {
    this.editId = 0;
    this.category = '';
    this.id = 0;
  }
}
