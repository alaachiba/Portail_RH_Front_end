import { CongeType } from './CongeType';
import { InfoType } from './InfoType';
import { User } from './User';
export class DemandeConge {

    id:number;
    dateDeb: Date;
    dateFin: Date;
    nbrJrs: number;
    motif: String;
    idRemplacant: number;
    tacheDele: String;
    statut: String;
    dateDem: Date;
    
    user: User;
    demandeCongeType: CongeType
   }