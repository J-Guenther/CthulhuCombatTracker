import {Component, OnInit} from '@angular/core';
import {Character} from "../model/Character";
import {CharacterService} from "../services/character.service";
import {Attack} from "../model/Attack";

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.scss'],
})
export class CharacterAddComponent implements OnInit {

  character: Character;
  newAttack: Attack;

  constructor(private characterService: CharacterService) {
    if (this.characterService.editCharacter) {
      this.character = this.characterService.editCharacter;
    } else {
      this.character = {
        id: '' + new Date().getTime(),
        name: '',
        dexterity: 0,
        strength: 0,
        constitution: 0,
        size: 0,
        power: 0,
        healthPoints: 0,
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
    this.newAttack = {
      name: '',
      id: '',
      skillValue: 0,
      formula: '',
      impale: false,
      withDb: false
    };
  }

  ngOnInit() {

  }

  saveCharacter() {
    this.character.attacks.forEach(attack => {
      attack.formula = attack.formula.replace('D', 'd');
    })
    this.character.damageBonus.replace('D', 'd');
    if (isNaN(+this.character.damageBonus) && !this.character.damageBonus.includes('d')) {
      this.character.damageBonus = '0';
    }
    this.characterService.save(this.character);
  }

  public calculateHealthPoints() {
    if (this.character.constitution && this.character.size) {

      this.character.healthPoints = Math.floor((+this.character.constitution + +this.character.size) / 10);
    }
  }

  public calculateDodge() {
    if (this.character.dexterity) {
      this.character.dodge = Math.floor(+this.character.dexterity / 2);
    }
  }

  public calculateSanity() {
    if (this.character.power) {
      this.character.sanity = +this.character.power
    }
  }

  public calculateDamageBonusAndBuild() {
    if (this.character.size && this.character.strength) {
      const sum = +this.character.size + +this.character.strength;
      if (sum >= 2 && sum <= 64){
        this.character.damageBonus = '-2';
        this.character.build = -2;
      } else if (sum >= 65 && sum <= 84) {
        this.character.damageBonus = '-1';
        this.character.build = -1;
      } else if (sum >= 85 && sum <= 124) {
        this.character.damageBonus = 'None';
        this.character.build = 0;
      } else if (sum >= 125 && sum <= 164) {
        this.character.damageBonus = '1d4';
        this.character.build = 1;
      } else if (sum >= 165 && sum <= 204) {
        this.character.damageBonus = '1d6';
        this.character.build = 2;
      } else if (sum >= 205 && sum <= 284) {
        this.character.damageBonus = '2d6';
        this.character.build = 3;
      } else if (sum >= 285 && sum <= 364) {
        this.character.damageBonus = '3d6';
        this.character.build = 4;
      } else if (sum >= 365 && sum <= 444) {
        this.character.damageBonus = '4d6';
        this.character.build = 5;
      } else if (sum >= 445 && sum <= 524) {
        this.character.damageBonus = '5d6';
        this.character.build = 6
      } else if (sum > 524) {
        const additionalDiceAndBuild = 5 + Math.floor((sum - 524) / 80);
        this.character.damageBonus = additionalDiceAndBuild + 'd6';
        this.character.build = additionalDiceAndBuild + 1;
      }
    }

  }

  public calculateMagicPoints() {
    if (this.character.power) {
      this.character.magicPoints = Math.floor(+this.character.power / 5);
    }
  }

  remove(attack: Attack) {
    const index = this.character.attacks.indexOf(attack);
    if (index > -1) {
      this.character.attacks.splice(index, 1);
    }
  }

  addAttack() {
    this.newAttack.id = '' + new Date().getTime();
    this.character.attacks.push(this.newAttack);
    this.newAttack = {
      name: '',
      id: '',
      skillValue: 0,
      formula: '',
      impale: false,
      withDb: false
    };
  }

  // TODO Formula matching
  // https://stackoverflow.com/questions/52252114/dd-style-compound-dice-expression-regex
}
