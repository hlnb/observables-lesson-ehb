import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubScription: Subscription;
  customObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
   // creating an observable
    const myNumbers = Observable.interval(1000)
    .map(
      (data: number) =>{
        return data * 2
      }
    ); //creates //a new number
    this.numbersObsSubScription =myNumbers.subscribe(
      (number: number)=>{
        console.log(number);
      }
    );

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
      observer.next("first pagckage")
      },2000);
      setTimeout(() => {
        observer.next("second pagckage")
        },4000);
        setTimeout(() => {
          observer.error("this does not work")
          },5000);
    });
    this.customObsSubscription = myObservable.subscribe(
      (data: string)=>{ console.log(data);},
      (error: string)=>{ console.log(error);},
       () => {console.log('completed');}
    );

  }
  ngOnDestroy(){
    this.numbersObsSubScription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }

}
