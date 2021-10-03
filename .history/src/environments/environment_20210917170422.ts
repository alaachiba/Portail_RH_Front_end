/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const baseUrl ='http://localhost:8080';
export const environment = {
  production: false,
  base : 'http://localhost:8080',
  login : '/api/auth/signin',
  me : baseUrl + '/rest/api/user/searchByEmail/',
  upload: baseUrl+'/rest/api/file/upload',
  getFiles: baseUrl+'/rest/api/file/files',

  // Users
  signup : baseUrl + '/api/auth/signup',
  editUser : baseUrl + '/rest/api/user/updateUser',
  getAllUsers : baseUrl + '/rest/api/user/allUser',
  getAllRoles : baseUrl + '/rest/api/role/allRole',
  deleteUser : baseUrl + '/rest/api/user/deleteUser/',

  // Congé Type
  getAllCongeType : baseUrl + '/rest/api/congeType/allType',
  getmyAllCongeType : baseUrl + '/rest/api/congeType/myDemandes/',
  addCongeType : baseUrl + '/rest/api/congeType/addType',
  updateCongeType : baseUrl + '/rest/api/congeType/updateTypeConge',
  deleteCongeType : baseUrl + '/rest/api/congeType/deleteType/',

  // CongeDemande
  getAllCongeDemande : baseUrl + '/rest/api/congeDem/allDemandeConge',
  getmyAllCongeDemande : baseUrl + '/rest/api/congeDem/myDemandes/',
  addCongeDemande : baseUrl + '/rest/api/congeDem/addDemandeConge',
  updateCongeDemande : baseUrl + '/rest/api/congeDem/updateDem',
  deleteCongeDemande : baseUrl + '/rest/api/congeDem/deleteDemConge/',

  // Avance Salaire
  getAllAvance : baseUrl + '/rest/api/avanceSalaire/ListDemAvance',
  getmyAllAvance : baseUrl + '/rest/api/avanceSalaire/myDemandes/',
  addAvance : baseUrl + '/rest/api/avanceSalaire/addDemAvance',
  updateAvance : baseUrl + '/rest/api/avanceSalaire/updateDem',
  deleteAvance : baseUrl + '/rest/api/avanceSalaire/deleteDemAvance/',

 // Frais
  getDemandeFrais : baseUrl + '/rest/api/fraisDem/allDemFrais',
  getmyDemandeFrais : baseUrl + '/rest/api/fraisDem/myDemandes/',
  addDemandeFrais : baseUrl + '/rest/api/fraisDem/addDemFrais',
  deleteDemandeFrais : baseUrl + '/rest/api/fraisDem/deleteDemFrais/',
  updateDemandeFrais : baseUrl + '/rest/api/fraisDem/updateDem',

  
   // Infos
   getDemandeInfos : baseUrl + '/rest/api/modifInfo/ListDemModification',
   getmyDemandeInfos : baseUrl + '/rest/api/modifInfo/myDemandes/',
   getDemandeInfosTypes : baseUrl + '/rest/api/modifInfoType/ListDemModificationType',
   addDemandeInfos : baseUrl + '/rest/api/modifInfo/addDemModification',
   deleteDemandeInfos : baseUrl + '/rest/api/modifInfo/deleteDemande/',
   updateDemandeInfos : baseUrl + '/rest/api/modifInfo/updateDem',

};
