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
      name: ''
    };
  }

  ngOnInit() {

  }

  saveCharacter() {
    this.characterService.save(this.character);
  }
}
