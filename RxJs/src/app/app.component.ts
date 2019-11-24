import { Component, OnInit, OnDestroy } from '@angular/core';
import { from } from 'rxjs';
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

    ngOnInit(){
      this.header = "RxJs: Basics in Practice"
      this.subheaderText = [];
      this.obs1 = {cx:0, cy:0};
      this.obs1clicked = false;
    }

    makeNewText(header: string){
      const number = ++ this.subheaderText.length; 
      const newMessage = `Sub ${number}: ${header}`;
      this.subheaderText.push(newMessage);
    }

    ngOnDestroy(){

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
}
