import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EncounterService} from "../services/encounter.service";
import {Encounter} from "../model/Encounter";
import {ModalController} from "@ionic/angular";
import {EncounterAddDialogComponent} from "../encounter-add-dialog/encounter-add-dialog.component";

@Component({
  selector: 'app-encounter-list',
  templateUrl: './encounter-list.component.html',
  styleUrls: ['./encounter-list.component.scss'],
})
export class EncounterListComponent implements OnInit {

  deleteMode = false;

  constructor(private router: Router,
              public encounterService: EncounterService,
              public modalController: ModalController) { }

  ngOnInit() {}

  async addEncounter() {
    this.encounterService.editEncounter = null;
    await this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EncounterAddDialogComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  deleteEncounter(encounter: Encounter) {
    this.encounterService.delete(encounter);
  }

  navigateToEncounter(encounter: Encounter) {
    this.encounterService.editEncounter = encounter;
    this.router.navigate(['encounters/combat']);
  }

}
