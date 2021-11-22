import { NbMenuItem } from '@nebular/theme';


export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Gérer les utilisateurs',
    icon: { icon: 'users', pack: 'fa' },
    link: '/admin/list-user',
    home: true,
  },
  {
    title: 'Gérer les avances sur salaires',
    icon: { icon: 'money-check', pack: 'fa', },
    link: '/admin/list-avance-salaire',
  },
  {
    title: 'Gérer les frais professionnels',
    icon: { icon: 'money-bill-wave', pack: 'fa' },
    link: '/admin/list-demande-frais',
  },
  {
    title: 'Gérer les demandes des congé',
    icon: { icon: 'calendar-times', pack: 'fa' },
    link: '/admin/list-demande-conge',
  },
  {
    title: 'Gérer les informations personnelles',
    icon: { icon: 'info-circle', pack: 'fa' },
    link: '/admin/list-demande-info',
  },
  {
    title: 'Activé/Désactivé Type Congé',
    icon: { icon: 'lock', pack: 'fa' },
    link: '/admin/conge-type',
  },
  {
    title: 'Upload',
    icon: { icon: 'file-upload', pack: 'fa' },
    link: '/admin/upload',
  },
 
];
