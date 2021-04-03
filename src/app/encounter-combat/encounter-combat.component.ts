import { Component, OnInit } from '@angular/core';
import {Encounter} from "../model/Encounter";
import {EncounterService} from "../services/encounter.service";
import {EncounterAddDialogComponent} from "../encounter-add-dialog/encounter-add-dialog.component";
import {ModalController} from "@ionic/angular";
import {ActorAddDialogComponent} from "../actor-add-dialog/actor-add-dialog.component";

@Component({
  selector: 'app-encounter-combat',
  templateUrl: './encounter-combat.component.html',
  styleUrls: ['./encounter-combat.component.scss'],
})
export class EncounterCombatComponent implements OnInit {

  encounter: Encounter;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private encounterService: EncounterService,
              private modalController: ModalController) {
    this.encounter = this.encounterService.editEncounter;
  }

  ngOnInit() {

  }

  async presentModal() {
    this.encounterService.editEncounter = null;
    const modal = await this.modalController.create({
      component: ActorAddDialogComponent,
      cssClass: 'my-custom-class'
    });
    modal.onWillDismiss().then(data => {
    });
    return await modal.present();
  }

}
