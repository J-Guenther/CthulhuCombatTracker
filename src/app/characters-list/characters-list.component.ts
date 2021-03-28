import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CharacterService} from "../services/character.service";

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {

  constructor(private router: Router,
              public characterService: CharacterService) { }

  ngOnInit() {}

  addCharacter() {
    this.router.navigate(['characters/edit']);
  }
}
