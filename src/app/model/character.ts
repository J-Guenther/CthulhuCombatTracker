import {Attack} from "./Attack";

export interface Character {
  id: string;
  name: string;
  dexterity: number;
  strength: number;
  constitution: number
  size: number;
  power: number;
  healthPoints: number;
  majorWound: boolean;
  dodge: number;
  numberOfAttacks: number;
  damageBonus: string;
  build: number;
  move: number;
  sanity: number;
  magicPoints: number;
  luck: number;
  armor: number;
  attacks: Attack[];
}
