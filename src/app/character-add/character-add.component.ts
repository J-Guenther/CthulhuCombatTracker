import { Component, OnInit } from '@angular/core';
import {Character} from "../model/character";
import {CharacterService} from "../services/character.service";

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.scss'],
})
export class CharacterAddComponent implements OnInit {

  character: Character;

  constructor(private characterService: CharacterService) {
    this.character = {
      id: '',
      name: '',
      dexterity: 0,
      strength: 0,
      constitution: 0,
      size: 0,
      power: 0,
      healthPoints: 0,
      majorWound: false,
      dodge: 0,
      numberOfAttacks: 0,
      damageBonus: '',
      build: 0,
      move: 0,
      sanity: 0,
      magicPoints: 0,
      luck: 0,
      armor: 0,
      attacks: []
    };
  }

  ngOnInit() {

  }

  saveCharacter() {
    this.characterService.save(this.character);
  }
}
