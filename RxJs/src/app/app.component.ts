import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    header: String;
    subheaderText: String[];

    ngOnInit(){
      this.header = "RxJs: Basics in Practice"
      this.subheaderText = [];
    }

    makeNewText(header: string){
      const number = ++ this.subheaderText.length; 
      const newMessage = `Sub ${number}: ${header}`;
      this.subheaderText.push(newMessage);
    }

    ngOnDestroy(){

    }
}
