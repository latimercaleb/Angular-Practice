import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, Observable } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

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

    myObserver: any = {
      next: (x: number) => this.obs2Data.push(`Input of ${x} stored as ${Math.pow(x,2)}`),
      error: (x: any) => this.obs2Data.push(`Error of ${x}`),
      complete: () => this.obs2Data.push(`Complete() on Obs 2 was called`)
    };

    testObs: any;

    ngOnInit(){
      this.header = "RxJs: Basics in Practice"
      this.subheaderText = ['Custom Observer'];
      this.obs1 = {cx:0, cy:0};
      this.obs1clicked = false;
      this.testObs = null;
      this.obs2clicked = false;
      this.obs2Data = [];
      this.makeNewText('RxJS Operators, map() & throttleTime()');
    }

    makeNewText(header: string){
      const number = ++ this.subheaderText.length; 
      const newMessage = `Sub ${number}: ${header}`;
      this.subheaderText.push(newMessage);
    }

    ngOnDestroy(){
      this.testObs.unsubscribe();
    }

    triggerEvent(evtData: any){
      this.obs1clicked = true;
      console.dir(`OBS_1: Show data: ${evtData}`);
      const clickData = from([evtData]);
      clickData.pipe(
        throttleTime(1000),
        map((evtData) => {
          return {
            xCoordinate: evtData.clientX,
            yCoordinate: evtData.clientY
          }
        })
      ).subscribe(
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
      this.testObs = Observable.create(function(obs){
        obs.next(2);
        //obs.error('asudhf');    
        setTimeout(() => {
          obs.complete();
        },3000);
        obs.next(3);
      }).subscribe(this.myObserver)
    }
}
