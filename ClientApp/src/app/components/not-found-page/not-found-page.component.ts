import {Component, inject, OnInit} from '@angular/core';
import {DialogRef} from "../../feature/dialog/dialog-ref";
import {DialogConfig} from "../../feature/dialog/dialog-config";

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css'],
})
export class NotFoundPageComponent implements OnInit{
  private readonly dialogRef = inject(DialogRef<NotFoundPageComponent>)
  private readonly config = inject(DialogConfig)
  private data: any;

  ngOnInit() {
    this.data = this.config.data
    console.log(this.data)
  }
}
