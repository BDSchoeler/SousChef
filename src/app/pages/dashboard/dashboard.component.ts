import {Component, ViewEncapsulation} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {
  recipes;
  constructor(private http:Http) {
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

}
