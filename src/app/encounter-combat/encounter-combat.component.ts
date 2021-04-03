import { Component, OnInit } from '@angular/core';
import {Encounter} from "../model/Encounter";
import {EncounterService} from "../services/encounter.service";

@Component({
  selector: 'app-encounter-combat',
  templateUrl: './encounter-combat.component.html',
  styleUrls: ['./encounter-combat.component.scss'],
})
export class EncounterCombatComponent implements OnInit {

  encounter: Encounter;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private encounterService: EncounterService) { }

  ngOnInit() {
    this.encounter = this.encounterService.editEncounter;
  }

}
