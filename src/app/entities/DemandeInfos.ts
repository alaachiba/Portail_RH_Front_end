import { InfoType } from './InfoType';
import { User } from './User';
export class DemandeInfos {

    id:number;
    description: String;
    statusDem: String;
    dateDem: Date;
    user: User;
    motif: String;
    demModificationType: InfoType
   }