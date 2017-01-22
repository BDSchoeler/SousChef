import {Component, ViewEncapsulation} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ActivatedRoute, Router,Params }   from '@angular/router';
@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {
  recipes;
  constructor(private http:Http, private router:Router, private route: ActivatedRoute) {
  }
  
  searchForRecipe(food) {
	console.log("Searching for " + food);

	this.http.get("https://pumpout.anyhowstep.com/recipes/search/"+food).toPromise().then( res =>{
		console.log("Found Result");
		console.log(res.json().results);
		this.recipes=res.json().results;

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
