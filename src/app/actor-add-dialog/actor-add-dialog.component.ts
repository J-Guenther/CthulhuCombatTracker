import { Component, OnInit } from '@angular/core';
import {CharacterService} from "../services/character.service";
import {ModalController} from "@ionic/angular";
import {Actor} from "../model/Actor";
import {Character} from "../model/Character";

@Component({
  selector: 'app-actor-add-dialog',
  templateUrl: './actor-add-dialog.component.html',
  styleUrls: ['./actor-add-dialog.component.scss'],
})
export class ActorAddDialogComponent implements OnInit {

  addMap = {};

  constructor(public characterService: CharacterService,
              private modalController: ModalController) { }

  ngOnInit() {}

  add(characterId: string) {
    if (!(characterId in this.addMap)) {
      this.addMap[characterId] = 1;
    } else {
      this.addMap[characterId] += 1;
    }

  }

  remove(characterId: string) {
    if (this.addMap[characterId] > 1) {
      this.addMap[characterId] -= 1;
    } else {
      this.addMap[characterId] = 0;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  addActorsToEncounter() {
    this.modalController.dismiss({
      actors: this.getSelectedCharacters()
    })
  }

  getSelectedCharacters() {
    const actors: Actor[] = [];
    for (const [key, value] of Object.entries(this.addMap)) {
      if (value > 0) {
        const character: Character = this.characterService.characters.find(character => character.id === key);
        for(let i = 0; i < value; i++) {
          const actor: Actor = {
            characterId: key,
            character: character,
            currentHealthPoints: character.healthPoints,
            majorWound: false,
            currentAttack: 0,
            currentSanity: character.sanity,
            currentMagicPoints: character.magicPoints,
            currentLuck: character.luck,
            firearmsReadied: false,
            target: null
          }
          actors.push(actor);
        }
      }
    }
    return actors;
  }
}
