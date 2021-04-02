import { Injectable } from '@angular/core';
import {Encounter} from "../model/Encounter";
import {Plugins} from "@capacitor/core";

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class EncounterService {

  public encounters: Encounter[];
  private ENCOUNTER_STORAGE_KEY: string = "encounters";
  public editEncounter: Encounter;

  constructor() { }

  save(encounter: Encounter) {
    const index = this.encounters.indexOf(encounter);
    if (index > -1) {
      this.encounters[index] = encounter;
    } else {
      this.encounters.push(encounter);
    }
    this.saveAll();
  }

  saveAll() {
    Storage.set({
      key: this.ENCOUNTER_STORAGE_KEY,
      value: JSON.stringify(this.encounters)
    });
  }

  async loadAll() {
    const encounterList = await Storage.get({key: this.ENCOUNTER_STORAGE_KEY});
    this.encounters = JSON.parse(encounterList.value) || [];
    console.log(this.encounters);
  }

  delete(encounter: Encounter) {
    const index = this.encounters.indexOf(encounter);
    if (index > -1) {
      this.encounters.splice(index, 1);
    }
    this.saveAll();
  }
}
