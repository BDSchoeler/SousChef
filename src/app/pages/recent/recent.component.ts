import {Component, ViewEncapsulation} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ActivatedRoute, Router,Params }   from '@angular/router';
@Component({
  selector: 'recent',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./recent.scss')],
  template: require('./recent.html')
})
export class Recent {

	
	allAdded =false;
	numberAdded=0;
	recipeArray=[{title:"Corn, Cherry Tomato and Basil Pizza", img:"//www.pws-cdn.com/the-recipe-depository/uploads/1218-corn-cherry-tomato-and-basil-pizza-1444593941.jpg", id:"1218"},
	{title:"Pasta with Lemon Sauce", img:"//www.pws-cdn.com/the-recipe-depository/uploads/1941-pasta-with-lemon-sauce.jpg", id:"1941"}, 
	{title:"Deep Dish Caramel Snickers Cookies", img:"//www.pws-cdn.com/the-recipe-depository/uploads/1346-deep-dish-caramel-snickers-cookies.jpg", id:"1346"},
	{title:"Cheesey Broccoli Bake", img:"//www.pws-cdn.com/the-recipe-depository/uploads/1583-cheesey-broccoli-bake-1441650109.jpg", id:"1583"}
	];
  constructor(private router:Router,private http:Http) {
	  /*this.recipeArray.push(this.searchForRecipe(1346));
	  this.recipeArray.push(this.searchForRecipe(636));
	  this.recipeArray.push(this.searchForRecipe(1218));
	  this.recipeArray.push(this.searchForRecipe(1941));
	  this.recipeArray.push(this.searchForRecipe(1340));
	  this.recipeArray.push(this.searchForRecipe(1583));*/
  }
  
  searchForRecipe(foodId) {
	console.log("Searching for " + foodId);
	this.http.get("https://pumpout.anyhowstep.com/recipes/"+foodId).toPromise().then( res =>{
		console.log(res.json());
		this.numberAdded+=1;
		if(this.numberAdded==6){
			this.allAdded=true;
		}
      return res.json();
      }, err =>{
        console.log("Error")
        console.log(err);
      });
	
  }
  redirectToRecipe(id){
  	console.log("trying to change page")
  	//this.router.navigate(['#/pages/editors/ckeditor/'+ id]);
  	this.router.navigate(['/pages/editors/ckeditor/'+ id]);

  }
}
