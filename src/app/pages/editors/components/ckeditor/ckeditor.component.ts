//declare var drawGauge: any;
//var tts =require('./tts.js');
import { ActivatedRoute, Params }   from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
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
  buttonText="Start";
  currentStepValue="Click start to begin cooking";
  recipeId=1583;
  recipe;

  currentStep=-1;

  minute;
  second;
  timerDone:boolean = false;
  timer;
  timerOn:boolean = true;


  public ckeditorContent:string = '<p>Hello CKEditor</p>';
  public config = {
    uiColor: '#F0F3F4',
    height: '600'
  };

  constructor(private http:Http,private route:ActivatedRoute){
    this.route.params.forEach((params: Params) => {
    let recipeId = params['recipeid'];
      this.http.get("https://pumpout.anyhowstep.com/recipes/"+recipeId).toPromise().then( res =>{
      this.recipe=res.json();
      }, err =>{
        console.log("Error")
        console.log(err);
      });
  });


  //let test= new tts.tts();
  
  }
  startRecipe(){
    console.log(this.currentStep);
    if(this.currentStep ==-1){
    this.currentStep = this.currentStep+1;
    this.currentStepValue=this.recipe.instructions[this.currentStep]
    console.log(this.currentStep);
    this.buttonText="Talk";
  }

  }
  
  goToNext() {
	if(this.currentStep<this.recipe.instructions.length) {
		console.log("going to next step");
		this.currentStep = this.currentStep+1;
    this.currentStepValue=this.recipe.instructions[this.currentStep]
	}else{
    this.currentStepValue="End of recipe. Enjoy!";
  }
  }
  
  goToPrev() {
	if(this.currentStep>0) {
		console.log("going to previous step");
		this.currentStep = this.currentStep-1;
    this.currentStepValue=this.recipe.instructions[this.currentStep];
	}
  }


 startTimer(){
	this.timerOn = false;
	console.log("entered");

	this.timer = Observable.timer(0, 1000).subscribe(t => {
	
		if(this.second==0)
		{
			if(this.minute ==0)
			{
				this.timerDone = true;
				this.timerOn= true;
				//Above not needed? just run following method
				this.finishedTimer();
				this.timer.unsubscribe();
			}
			else
			{
			this.minute -= 1;
			this.second = 59;	
			}
			
		}
		else
		{
			this.second -= 1;
		}
	})

 }
 
 finishedTimer(){
	tts2("The timer is done! The timer is done! The timer is done!");
 }
 pauseTimer(){
	 this.timerOn = true;
	 this.timer.unsubscribe();
 }
  chef () {
      var query = "search tomato";
      if (query.length == 0) {
        return;
      }
      var url     = "https://pumpout.anyhowstep.com/chef/"+encodeURIComponent(query);
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "json";
      request.send();
      request.onreadystatechange = function (event) {
        if (request.readyState === 4 && request.status === 200) {
          var data = request.response;
          console.log(data);
          if (data && data.intent) {
            data = data.intent;
            if (data.entities.intent) {
              var intent = data.entities.intent;
              switch (intent.value) {
                case "Pause Timer": {
                  break;
                }
                case "Resume Timer": {
                  break;
                }
                case "Set Timer": {
                  if (data.entities.duration) {
                    var total_seconds = 0;
                    for (var i=0; i<data.entities.duration.length; ++i) {
                      var d = data.entities.duration[i];
                      total_seconds += d.normalized.value;
                    }
                    if (total_seconds > 0) {
                      //Set the timer
                    }
                  }
                  break;
                }
                case "Search For Food": {
                  if (data.entities.Food && data.entities.Food.length > 0) {
                    var food = data.entities.Food[0].value;
                    //Search for food
                  }
                  break;
                }
                case "Select Recipe": {
                  if (data.entities.ordinal && data.entities.ordinal > 0) {
                    var index = data.entities.ordinal[0].value - 1; //To make is a 0-based index for internal use
                    //Select the indexed recipe, if valid
                  }
                  break;
                }
                case "Change Instruction": {
                  if (data.entities.Change_Type && data.entities.Change_Type.length > 0) {
                    var type = data.entities.Change_Type[0].value;
                    switch (type) {
                      case "next":
                      case "Next": {
                        //Next instruction
                        break;
                      }
                      case "previous":
                      case "Previous": {
                        //Previous instruction
                        break;
                      }
                      case "repeat":
                      case "Repeat": {
                        //Repeat instruction
                        break;
                      }
                    }
                  }
                  break;
                }
              }
            }
          }
        }
      };
    }
  
}
