import {Actor} from "./Actor";

export interface Encounter {
  actors: Actor[];
  currentTurn: Actor;
  currentRound: number;
  name: string;
}
