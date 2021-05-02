import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../model/Actor";
import {Attack} from "../model/Attack";
import { DiceRoller } from "dice-roller-parser";
import {ModalController} from "@ionic/angular";
import {ActorAddDialogComponent} from "../actor-add-dialog/actor-add-dialog.component";
import {AttackDialogComponent} from "../attack-dialog/attack-dialog.component";

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.scss'],
})
export class ActorCardComponent implements OnInit {

  @Input() actor: Actor;
  @Input() targets: Actor[];


  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.actor);
  }

  attackTarget(attack: Attack) {
    const diceRoller = new DiceRoller();
    console.log(diceRoller);
  }

  setNewTarget(target) {
    this.actor.target = target.detail.value;
  }

  async openAttackDialog(attack: Attack) {
    if (this.actor.target) {
      const modal = await this.modalController.create({
        component: AttackDialogComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          'initiator': this.actor,
          'target': this.actor.target,
          'attack': attack
        }
      });
      modal.onWillDismiss().then(() => {
      });
      modal.onWillDismiss().then(data => {
        console.log(data);
      });
      return await modal.present();
    }
  }
}
