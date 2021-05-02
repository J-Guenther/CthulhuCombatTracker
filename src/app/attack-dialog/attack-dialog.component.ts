import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
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
              private successlevelService: SuccesslevelService,
              public toastController: ToastController) { }

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

  async fightBack($event: any) {
    // https://www.npmjs.com/package/dice-roller-parser
    const opponentAttack: Attack = $event.detail.value;
    const diceRoller = new DiceRoller();
    const opponentSuccess = this.successlevelService.calculateSuccessLevel(opponentAttack.skillValue, diceRoller.roll('1d100').value);
    const mySuccess = this.successlevelService.calculateSuccessLevel(this.attack.skillValue, diceRoller.roll('1d100').value)

    if (mySuccess >= SuccessLevel.FAIL && opponentSuccess >= SuccessLevel.FAIL) {
      await this.presentToast('Both fail');
      await this.modalController.dismiss();
    } else if (mySuccess > opponentSuccess || mySuccess === opponentSuccess) {
      const roll = diceRoller.roll(this.attack.formula);
      const db = this.initiator.character.damageBonus.includes('d') ? diceRoller.roll(this.initiator.character.damageBonus).value : +this.initiator.character.damageBonus;
      const damage = (roll.value + db - this.target.character.armor)
      this.target.currentHealthPoints -= damage;
      await this.presentToast(this.target.character.name + ' takes ' + damage + ' damage.');
      await this.modalController.dismiss();
    } else if (opponentSuccess > mySuccess) {
      const roll = diceRoller.roll(opponentAttack.formula);
      const db = this.target.character.damageBonus.includes('d') ? diceRoller.roll(this.target.character.damageBonus).value : +this.target.character.damageBonus;
      const damage = (+roll.value + db - this.initiator.character.armor);
      this.initiator.currentHealthPoints -= damage;
      await this.presentToast(this.initiator.character.name + ' takes ' + damage + ' damage.');
      await this.modalController.dismiss();
    }
  }

  dodge() {
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    await toast.present();
  }


}
