// import { MatDialog } from '@angular/material/dialog/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';




@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

giphiesArray: any[] = [];

// Giphy API
API_KEY: string = "usDR6lVRtajZJCK3GPcAGqkudMGH4a54";
count: number = 12;
offset: number = 0;


  constructor(public dialog: MatDialog , private fetchData: ServicesService) { }

  ngOnInit(): void {
    this.fetchData.getPhotos(this.API_KEY, this.count, this.offset).subscribe(data => {
      this.giphiesArray = data.data;
      // console.log(this.giphiesArray);
      
    }
    )
  }

  loadMore() {
    this.offset += this.count;
    this.count = 8;
    this.fetchData.getPhotos(this.API_KEY, this.count, this.offset).subscribe(data => {
      this.giphiesArray = [...this.giphiesArray, ...data.data]
      console.log(this.giphiesArray); 
    }
    )
  }

  openDialog(data: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        data
      }
    });
    
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      
    })
  }

}
