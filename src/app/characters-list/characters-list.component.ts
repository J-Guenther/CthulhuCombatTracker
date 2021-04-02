import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CharacterService} from "../services/character.service";
import {Character} from "../model/Character";

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {

  deleteMode = false;

  constructor(private router: Router,
              public characterService: CharacterService) { }

  ngOnInit() {}

  addCharacter() {
    this.characterService.editCharacter = null;
    this.router.navigate(['characters/edit']);
  }

  deleteCharacter(character: Character) {
    this.characterService.delete(character);
  }

  navigateToCharacter(character: Character) {
    this.characterService.editCharacter = character;
    this.router.navigate(['characters/edit'])
  }
}
