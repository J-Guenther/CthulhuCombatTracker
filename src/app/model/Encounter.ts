import {Actor} from "./Actor";

export interface Encounter {
  id: string,
  actors: Actor[];
  currentTurn?: Actor;
  currentRound: number;
  name: string;
}
