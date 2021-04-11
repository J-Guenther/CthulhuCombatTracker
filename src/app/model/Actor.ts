import {Character} from "./Character";

export interface Actor {
  characterId: string;
  character?: Character;
  currentHealthPoints: number;
  majorWound: boolean;
  currentAttack: number;
  currentSanity: number;
  currentMagicPoints: number;
  currentLuck: number;
  firearmsReadied: boolean;
  target: Actor;
}
