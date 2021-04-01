import { Injectable } from '@angular/core';
import {Character} from "../model/character";
import {Plugins} from "@capacitor/core";

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  public characters: Character[];
  private CHARACTER_STORAGE_KEY: string = "characters";

  constructor() { }

  save(character: Character) {
    this.characters.push(character);
    this.saveAll();
  }

  saveAll() {
    Storage.set({
      key: this.CHARACTER_STORAGE_KEY,
      value: JSON.stringify(this.characters)
    });
  }

  async loadAll() {
    const characterList = await Storage.get({key: this.CHARACTER_STORAGE_KEY});
    this.characters = JSON.parse(characterList.value) || [];
    console.log(this.characters);
  }

  delete(character: Character) {
    const index = this.characters.indexOf(character);
    if (index > -1) {
      this.characters.splice(index, 1);
    }
    this.saveAll();
  }
}
