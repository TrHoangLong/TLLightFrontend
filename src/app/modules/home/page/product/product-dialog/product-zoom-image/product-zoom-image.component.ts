import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-zoom-image',
  templateUrl: './product-zoom-image.component.html',
  styleUrls: ['./product-zoom-image.component.css']
})
export class ProductZoomImageComponent implements OnInit {

  src: any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.src = data;
   }

  ngOnInit(): void {
  }

}
