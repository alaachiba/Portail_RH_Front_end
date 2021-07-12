import { User } from './User';
export class DemandeFrais {

    id:number;
    montant: number;
    dateMission: Date;
    dateDem: Date;
    statut: String;
    motif: String;
    user: User;
   }