import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-encounter-add-dialog',
  templateUrl: './encounter-add-dialog.component.html',
  styleUrls: ['./encounter-add-dialog.component.scss'],
})
export class EncounterAddDialogComponent implements OnInit {
  encounterName: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  createEncounter() {
    this.modalController.dismiss({
      'encounterName': this.encounterName
    })
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
