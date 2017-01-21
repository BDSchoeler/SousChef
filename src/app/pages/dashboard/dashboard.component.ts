import {Component, ViewEncapsulation} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {

  constructor(private http:Http) {
  }
  
  searchForRecipe(food) {
	console.log("Searching for " + food);
	this.http.get("http://pumpout.anyhowstep.com/recipes/search/"+food).subscribe( res =>{
		console.log("found result");
		console.log(res);

	}, err =>{
		console.log("Error")
		console.log(err);
	});
	
  }

}
