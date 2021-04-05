import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../model/Actor";

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.scss'],
})
export class ActorCardComponent implements OnInit {

  @Input() actor: Actor;
  @Input() targets: Actor[];


  constructor() { }

  ngOnInit() {}

}
