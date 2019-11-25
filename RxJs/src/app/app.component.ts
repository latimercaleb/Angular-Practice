import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { from, Observable, interval, Observer, Subscription, Subject, fromEvent } from 'rxjs';
import { throttleTime, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    header: String;
    subheaderText: String[];

    obs1: {cx: number, cy:number};
    obs1clicked: boolean;

    obs2clicked: boolean;
    obs2Data: String[];

    obs3clicked: boolean;
    obs3Data: Number[];


    myObserver: any = {
      next: (x: number) => this.obs2Data.push(`Input of ${x} stored as ${Math.pow(x,2)}`),
      error: (x: any) => this.obs2Data.push(`Error of ${x}`),
      complete: () => this.obs2Data.push(`Complete() on Obs 2 was called`)
    };

    subscription: Subscription;
    @ViewChild('inp') myInput: ElementRef;

    ngOnInit(){
      this.header = "RxJs: Basics in Practice";
      this.subheaderText = [
        '1: Custom Observer',
        '2: Interval Observer',
        '3: Manual Subject',
        '4: Operators debounceTime() & distinctUntilChanged()'
      ];
      this.obs1 = {cx:0, cy:0};
      this.obs1clicked = false;

      this.subscription = null;

      this.obs2clicked = false;
      this.obs2Data = [];

      this.obs3clicked = false;
      this.obs3Data = [];
    }

    ngOnDestroy(){
      this.subscription.unsubscribe();
    }

    triggerEvent(evtData: any){
      this.obs1clicked = true;
      this.clearSubscription();
      console.dir(`OBS_1: Show data: ${evtData}`);
      
      const clickData = from([evtData]).pipe(
        throttleTime(1000),
        map((evtData) => {
          return {
            xCoordinate: evtData.clientX,
            yCoordinate: evtData.clientY
          }
        })
      );
      
      this.subscription = clickData.subscribe(
        (evtData) => {
          console.log('asdfa');
          this.obs1.cx = evtData.xCoordinate;
          this.obs1.cy = evtData.yCoordinate;
        },
        (err) => console.log('This would be an error, but there\'s no error on a click evt'),
        () => {console.log('Obs 1 completed');}
      );
    }

    customObservable(){
      this.obs2clicked = true;
      const customObs = Observable.create(function(obs){
        obs.next(2);
        //obs.error('asudhf');    
        setTimeout(() => {
          obs.complete();
        },3000);
        obs.next(3);
      });
      this.clearSubscription();
      this.subscription = customObs.subscribe(this.myObserver);
    }

    obs3operators(){
      this.obs3clicked = true;
      const intervalObs = interval(1000);
      this.clearSubscription();
      this.subscription = intervalObs.pipe(
        map((val: number) => val),
        filter((val) => {
          return val % 2 !== 0;  
         })
        // throttleTime(2000)
      ).subscribe(
        (val: number) => this.obs3Data.push(val)
      );
    }

    subject1(){
      const subject = new Subject();
      let temp = subject.subscribe({
        next: (x) => console.log('Val ' + x)
      });

      let other = subject.subscribe({
        next: (x) => console.log('Val2 ' + x)
      });

      subject.next('Test Data');

      temp.unsubscribe();

      subject.next('Another test');

      other.unsubscribe();
    }

    obs4chain(){
      this.clearSubscription();
      const observable = fromEvent(this.myInput.nativeElement, 'input');

      this.subscription = observable.subscribe(
        (evt) => console.log(evt)
      );
      
    }

  

    private clearSubscription(){
      console.log('Checking subscription');
      if (this.subscription){
        this.subscription.unsubscribe();
      }else{
        return true;
      }
    }
}
