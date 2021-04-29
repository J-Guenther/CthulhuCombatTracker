import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Actor} from "../model/Actor";
import {Attack} from "../model/Attack";
import {DiceRoller} from "dice-roller-parser";
import {SuccesslevelService} from "../services/successlevel.service";
import {SuccessLevel} from "../model/SuccessLevel";

@Component({
  selector: 'app-attack-dialog',
  templateUrl: './attack-dialog.component.html',
  styleUrls: ['./attack-dialog.component.scss'],
})
export class AttackDialogComponent implements OnInit {

  @Input() initiator: Actor;
  @Input() target: Actor;
  @Input() attack: Attack;

  constructor(private modalController: ModalController,
              private successlevelService: SuccesslevelService) { }

  ngOnInit() {
    console.log(this.target.character.attacks);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  resolveCombat() {
    this.modalController.dismiss({

    })
  }

  fightBack($event: any) {
    // https://www.npmjs.com/package/dice-roller-parser
    const opponentAttack: Attack = $event.detail.value;
    const diceRoller = new DiceRoller();
    const opponentSuccess = this.successlevelService.calculateSuccessLevel(opponentAttack.skillValue, diceRoller.roll('1d100').value);
    const mySuccess = this.successlevelService.calculateSuccessLevel(this.attack.skillValue, diceRoller.roll('1d100').value)

    if (mySuccess >= SuccessLevel.FAIL && opponentSuccess >= SuccessLevel.FAIL) {
      console.log('Both fail');
    } else if (mySuccess > opponentSuccess || mySuccess === opponentSuccess) {
      console.log('Attacker wins');
    } else if (opponentSuccess > mySuccess) {
      console.log('Defender wins');
    }

    const roll =  diceRoller.roll(opponentAttack.formula.replace('D', 'd'));
    console.log(roll);
  }

  dodge() {


  }

  roll() {
    const diceRoller = new DiceRoller();
    console.log(this.attack.formula);
    const roll =  diceRoller.roll(this.attack.formula.replace('D', 'd'));
    console.log(roll);
  }
}
