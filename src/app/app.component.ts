import {Component, OnInit} from '@angular/core';
import {MenuController} from "@ionic/angular";
import {CharacterService} from "./services/character.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private menu: MenuController,
              private characterService: CharacterService) {

  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  ngOnInit(): void {
    this.characterService.loadAll();
  }
}
