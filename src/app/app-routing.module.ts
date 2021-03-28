import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CharactersListComponent} from "./characters-list/characters-list.component";
import {EncounterListComponent} from "./encounter-list/encounter-list.component";
import {SettingsComponent} from "./settings/settings.component";
import {CharacterAddComponent} from "./character-add/character-add.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'characters', component: CharactersListComponent
  },
  {
    path: 'characters/edit', component: CharacterAddComponent
  },
  {
    path: 'encounters', component: EncounterListComponent
  },
  {
    path: 'settings', component: SettingsComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
