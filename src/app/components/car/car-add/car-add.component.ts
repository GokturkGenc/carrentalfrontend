import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
   selector: 'app-car-add',
   templateUrl: './car-add.component.html',
   styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

   carAddForm: FormGroup;
   brands: Brand[] = [];
   colors: Color[] = [];
   constructor(private formBuilder: FormBuilder, private carService: CarService, private toastrService: ToastrService,
      private brandService: BrandService, private colorService: ColorService,) { }

   ngOnInit(): void {
      this.createCarAddForm();
      this.getBrands();
      this.getColors();
   }

   createCarAddForm() {
      this.carAddForm = this.formBuilder.group({
         carName: ["", Validators.required],
         dailyPrice: ["", Validators.required],
         colorId: ["", Validators.required],
         brandId: ["", Validators.required],
         modelYear: ["", Validators.required]
      })
   }

   getBrands() {
      this.brandService.getBrands().subscribe(responseSuccess => {
         this.brands = responseSuccess.data;
      }, responseError => {
         this.toastrService.error(responseError.message, responseError.name);
      });
   }

   getColors() {
      this.colorService.getColors().subscribe(responseSuccess => {
         this.colors = responseSuccess.data;
      }, responseError => {
         this.toastrService.error(responseError.message, responseError.name);
      });
   }


   add() {
      let car: Car = Object.assign({}, this.carAddForm.value);

      car.brandId = Number(car.brandId);
      car.colorId = Number(car.colorId);
      car.modelYear = String(car.modelYear);
      car.dailyPrice = Number(car.dailyPrice);

      if (!this.carAddForm.valid) {
         this.toastrService.warning('Lütfen boş bilgi bırakmayın', 'Dikkat');
         return;
      }

      this.carService.add(car).subscribe(responseSuccess => {
         this.carAddForm.reset();
         // this.carAddForm.get('brandId').setValue('');
         // this.carAddForm.get('colorId').setValue('');

         return this.toastrService.success(responseSuccess.message, 'Başarılı');
      }, responseError => {
         if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
               this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası'
               );
            }

            return;
         }

         console.log(responseError);
         this.toastrService.error(responseError.error.Message, responseError.error.StatusCode);
      });
   }
}