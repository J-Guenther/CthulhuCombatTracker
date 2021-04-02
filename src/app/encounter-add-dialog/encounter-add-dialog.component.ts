import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encounter-add-dialog',
  templateUrl: './encounter-add-dialog.component.html',
  styleUrls: ['./encounter-add-dialog.component.scss'],
})
export class EncounterAddDialogComponent implements OnInit {
  encounterName: string;

  constructor() { }

  ngOnInit() {}

}
