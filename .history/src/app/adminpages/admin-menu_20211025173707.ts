import { NbMenuItem } from '@nebular/theme';


export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Liste des utilisateurs',
    icon: { icon: 'users', pack: 'fa' },
    link: '/admin/list-user',
    home: true,
  },
  {
    title: 'List Avance Sailaire',
    icon: { icon: 'money-check', pack: 'fa', },
    link: '/admin/list-avance-salaire',
  },
  {
    title: 'List Demande Frais',
    icon: { icon: 'money-bill-wave', pack: 'fa' },
    link: '/admin/list-demande-frais',
  },
  {
    title: 'List Demande Congé',
    icon: { icon: 'calendar-times', pack: 'fa' },
    link: '/admin/list-demande-conge',
  },
  {
    title: 'List Demande Infos',
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
