import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CharactersListComponent} from "./characters-list/characters-list.component";
import {CharacterAddComponent} from "./character-add/character-add.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EncounterListComponent} from "./encounter-list/encounter-list.component";
import {EncounterAddDialogComponent} from "./encounter-add-dialog/encounter-add-dialog.component";
import {EncounterCombatComponent} from "./encounter-combat/encounter-combat.component";
import {ActorAddDialogComponent} from "./actor-add-dialog/actor-add-dialog.component";
import {ActorCardComponent} from "./actor-card/actor-card.component";

@NgModule({
  declarations: [
    AppComponent,
    CharactersListComponent,
    CharacterAddComponent,
    EncounterListComponent,
    EncounterAddDialogComponent,
    EncounterCombatComponent,
    ActorAddDialogComponent,
    ActorCardComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
