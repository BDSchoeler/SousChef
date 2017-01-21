import { Component, ViewEncapsulation } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import './ckeditor.loader.ts';

@Component({
  selector: 'ckeditor-component',
  encapsulation: ViewEncapsulation.None,
  template: require('./ckeditor.html'),
  styles: [require('./ckeditor.scss')]
})

export class Ckeditor {
  recipeId=1583;
  recipe;
  public ckeditorContent:string = '<p>Hello CKEditor</p>';
  public config = {
    uiColor: '#F0F3F4',
    height: '600'
  };

  constructor(private http:Http){
  this.http.get("https://pumpout.anyhowstep.com/recipes/"+this.recipeId).toPromise().then( res =>{
    console.log("found result");
    console.log(res.json());
    this.recipe=res.json();

  }, err =>{
    console.log("Error")
    console.log(err);
  });
  
  }
}
