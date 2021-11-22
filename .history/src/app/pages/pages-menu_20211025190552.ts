import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Mon profile',
    icon: { icon: 'user-circle', pack: 'fa' },
    link: '/pages/profile',
    home: true,
  },
  {
    title: 'Mes demandes davance sur salaire',
    icon: { icon: 'money-check', pack: 'fa', },
    link: '/pages/list-avance-salaire',
  },
  {
    title: 'Mes demandes des frais',
    icon: { icon: 'money-bill-wave', pack: 'fa' },
    link: '/pages/list-demande-frais',
  },
  {
    title: 'Mes demandes de congé',
    icon: { icon: 'calendar-times', pack: 'fa' },
    link: '/pages/list-demande-conge',
  },
  {
    title: 'Mes informations personnelles',
    icon: { icon: 'info-circle', pack: 'fa' },
    link: '/pages/list-demande-info',
  },
];
