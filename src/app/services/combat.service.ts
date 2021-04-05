import { Injectable } from '@angular/core';
import {Actor} from "../model/Actor";
import {EncounterService} from "./encounter.service";

@Injectable({
  providedIn: 'root'
})
export class CombatService {

  currentPossibleTargetActors: Actor[] = [];

  constructor(public encounterService: EncounterService) { }

  initializePossibleTargets() {
    this.updatePossibleTargetsForActor(this.encounterService.editEncounter.currentTurn);
  }

  updatePossibleTargetsForActor(actor: Actor) {
    this.currentPossibleTargetActors = this.encounterService.editEncounter.actors.filter(a => a.characterId !== actor.characterId);
  }
}
