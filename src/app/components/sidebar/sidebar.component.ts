import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  brands:Brand[];
  currentBrand:Brand | null;
  colors:Color[];
  currentColor:Color | null;
  
  constructor(private brandService:BrandService,private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand:Brand){
    if (brand==this.currentBrand) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  getAllBrandClass(){
    if (!this.currentBrand) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  ClearCurrentBrand(){
    this.currentBrand=null;
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

  setCurrentColor(color:Color){
    this.currentColor = color;
  }

  getCurrentColorClass(color:Color){
    if (color==this.currentColor) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  getAllColorClass(){
    if (!this.currentColor) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  ClearCurrentColor(){
    this.currentColor=null;
  }

}
