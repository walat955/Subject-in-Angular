import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  ngOnInit(){

    //Subject: Does not have an initial value 
    //This creates a new Subject instance.
    //it doesn't emit anything until someone calls its next() method.
    //does not save any value.
    const subject = new Subject();

    //subscriber 1
    subject.subscribe(console.log);
    //subcriber 2
    subject.subscribe(console.log);
    //both subscriber 1 and 2 will get value ('hello').
    subject.next('hello');
    //subscriber 3
    subject.subscribe(console.log);
    //all 3 subscriber will get value (2025).
    subject.next(2025);
    /*note: notes that we create subscriber then we give it a value using subject.next(data)
      * example just to clear: 
            subscriber 1
            subscriber 2
            subject.next(data)
      * if we do it like this:
            subject.next(data)
            subscriber 1
            subscriber 2
        both subscriber will have no value because subject does not save any value,
        thatway when using subject we need to create subscribers first then add value. 
    */


    /*
      *  this is the same as subscriber 1 but using function.
      *  subject.subscribe(function(data){console.log(data)});
      *  a short way to use function is using arrow function =>
      *  example: subject.subscribe((data) => {console.log(data)});
    */

    /*
     *  this create a new BehaviorSubject instance.
     *  BehaviorSubject: Requires an initial value, our initial value here is (123).
     *  <any> is the type of the BSubject and can be deleted,
        but then you will be able to pass only number because your initial value is a number.
     *  BehaviorSubject save the last value only, that mean all subscribers will always get the last value.
        in our example all 3 subscribers will get the last value which is ('dudu').
    */
    const BSubject = new BehaviorSubject<any>(123);
    //subscriber 1
    BSubject.subscribe(console.log);
    //subscriber 2
    BSubject.subscribe(console.log);
    //both subscribers 1 and 2 will get value (123).

    //all subscribers 1, 2 and 3 will get value ('dudu').
    BSubject.next('dudu');
    //subscriber 3
    BSubject.subscribe(console.log);


    /*
    Why use BehaviorSubject?
    This specialized subject is ideal when you want to maintain and provide a "current value" to subscribers.
    Think of it as a scoreboard in a basketball game.
    Even if you join watching in the middle of the game,
    you'll still see the current score. Similarly,
    when a new observer subscribes to a BehaviorSubject, 
    it immediately receives the current value (or the last value that was emitted).

    It's important to remember that a BehaviorSubject requires an initial value upon instantiation.
    This is where it differs from a regular Subject which doesn't have an initial value.
    Picture a newly installed scoreboard – with BehaviorSubject,
    you set a starting score, say 0-0. With a regular Subject,
    the board remains blank until a point is scored.
    Subscribers (early or late) of a normal Subject will not receive emissions until the Subject emits a value.

    Contrasting with ReplaySubject, while both provide historical values,
    ReplaySubject can relay multiple previous values, not just the last one.
    If the basketball scoreboard could show the last five scores in the match sequence,
    that'd be akin to ReplaySubject. ReplaySubject also does not receive an initial seed value.

    In conclusion, if you need to ensure subscribers always get the latest value upon subscription,
    or you have an initial seed value, BehaviorSubject is your pick.
    If you need more historical emissions, consider ReplaySubject.
    And if you don't need any history at all, a simple Subject might be what you're looking for.
    */

  }
}
