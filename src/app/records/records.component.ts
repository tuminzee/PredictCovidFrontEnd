import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { Router } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import {MatCardModule} from '@angular/material/card';
import { RecordComponent } from './record/record.component';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  records = [];

  constructor(private recordsService: RecordsService,
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    //this.openDialog()
    this.recordsService.getRecords()
    .subscribe(
      res => {
        this.records = res
    },
      err => {
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status == 401){
            this.router.navigate(['/login'])
          }
          if(err.status == 500){
            this.router.navigate(['/login'])
          }
        }
      }
    )
  }



  openDialog(){
    this.dialog.open(DialogComponent)
  }

  openRecordDialog(record){
    //console.log(record)
    this.dialog.open(RecordComponent, {
      data: { record: record }
    });
  }

}
