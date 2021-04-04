import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Encounter} from "../model/Encounter";
import {EncounterService} from "../services/encounter.service";
import {EncounterAddDialogComponent} from "../encounter-add-dialog/encounter-add-dialog.component";
import {IonSlides, ModalController} from "@ionic/angular";
import {ActorAddDialogComponent} from "../actor-add-dialog/actor-add-dialog.component";
import {Actor} from "../model/Actor";
import {CharacterService} from "../services/character.service";
import {Character} from "../model/Character";

@Component({
  selector: 'app-encounter-combat',
  templateUrl: './encounter-combat.component.html',
  styleUrls: ['./encounter-combat.component.scss'],
})
export class EncounterCombatComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('slides') slides: IonSlides;

  encounter: Encounter;
  isEnd = false;
  isBeginning = true;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private encounterService: EncounterService,
              private characterService: CharacterService,
              private modalController: ModalController) {
    this.encounter = this.encounterService.editEncounter;
  }

  async ngOnInit() {
    const deletedCharacterIds: string[] = [];
    for (let i = 0; i < this.encounter.actors.length; i++) {
      const character: Character = this.characterService.characters.find(
        character => character.id === this.encounter.actors[i].characterId
      );
      if (character) {
        this.encounter.actors[i].character = character;
      } else {
        deletedCharacterIds.push(this.encounter.actors[i].characterId);
      }
    }
    this.encounter.actors = this.encounter.actors.filter(actor => {
      return !deletedCharacterIds.includes(actor.characterId);
    });
    await this.updateCombatOrder();
  }

  async presentModal() {
    this.encounterService.editEncounter = null;
    const modal = await this.modalController.create({
      component: ActorAddDialogComponent,
      cssClass: 'my-custom-class'
    });
    modal.onWillDismiss().then(data => {
    });
    modal.onWillDismiss().then(data => {
      if (data.data && data.data.actors) {
        this.addActors(data.data.actors);
        this.updateCombatOrder();
      }
    });
    return await modal.present();
  }

  private addActors(actors: Actor[]) {
    this.encounter.actors.push(...actors);
  }

  public async updateCombatOrder() {
    this.encounter.actors.sort((a, b) => {
      const dexA = a.firearmsReadied ? a.character.dexterity + 50 : a.character.dexterity;
      const dexB = b.firearmsReadied ? b.character.dexterity + 50 : b.character.dexterity;
      return dexB - dexA;
    });

    if (this.encounter.currentTurn) {
      const index = this.encounter.actors.indexOf(this.encounter.currentTurn);
      if (index >= 0) {
        await this.slides.update();
        await this.slides.slideTo(index);
        this.encounter.currentTurn = this.encounter.actors[index];
      }
    }
    this.encounter.currentTurn = this.encounter.actors[0];
  }

  ngOnDestroy(): void {
    this.encounterService.save(this.encounter);
  }

  async change($event: any) {
    const index = await this.slides.getActiveIndex();
    this.encounter.currentTurn = this.encounter.actors[index];
    this.isEnd = await this.slides.isEnd();
    this.isBeginning = await this.slides.isBeginning();
  }

  async nextTurn() {
    if (this.isEnd) {
      await this.slides.slideTo(0);
      this.encounter.currentRound += 1;
    } else {
      await this.slides.slideNext();
    }
  }

  async prevTurn() {
    await this.slides.slidePrev();
  }

  async ngAfterViewInit() {
    await this.updateCombatOrder();
  }
}
