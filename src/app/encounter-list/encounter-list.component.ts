import {Component, OnInit} from '@angular/core';
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
              public modalController: ModalController) {
  }

  ngOnInit() {
  }

  async presentModal() {
    this.encounterService.editEncounter = null;
    const modal = await this.modalController.create({
      component: EncounterAddDialogComponent,
      cssClass: 'my-custom-class'
    });
    modal.onWillDismiss().then(data => {
      if (data.data && data.data.encounterName) {
        this.saveEncounter(data.data.encounterName);
      }
    });
    return await modal.present();
  }

  saveEncounter(name: string) {
    const encounter: Encounter = {
      id: '' + new Date().getTime(),
      name: name,
      currentRound: 0,
      actors: []
    }
    this.encounterService.save(encounter);
    this.navigateToEncounter(encounter);
  }

  deleteEncounter(encounter: Encounter) {
    this.encounterService.delete(encounter);
  }

  navigateToEncounter(encounter: Encounter) {
    this.encounterService.editEncounter = encounter;
    this.router.navigate(['encounters/combat']);
  }

}
