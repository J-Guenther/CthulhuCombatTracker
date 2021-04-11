import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Actor} from "../model/Actor";
import {Attack} from "../model/Attack";

@Component({
  selector: 'app-attack-dialog',
  templateUrl: './attack-dialog.component.html',
  styleUrls: ['./attack-dialog.component.scss'],
})
export class AttackDialogComponent implements OnInit {

  @Input() initiator: Actor;
  @Input() target: Actor;
  @Input() attack: Attack;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  resolveCombat() {
    this.modalController.dismiss({

    })
  }

  fightBack($event: any) {
    // https://www.npmjs.com/package/dice-roller-parser

  }

  dodge() {


  }
}
