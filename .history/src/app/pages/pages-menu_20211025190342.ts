import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Mon profile',
    icon: { icon: 'user-circle', pack: 'fa' },
    link: '/pages/profile',
    home: true,
  },
  {
    title: 'Mes demandes d avance sur salaire',
    icon: { icon: 'money-check', pack: 'fa', },
    link: '/pages/list-avance-salaire',
  },
  {
    title: 'List Demande Frais',
    icon: { icon: 'money-bill-wave', pack: 'fa' },
    link: '/pages/list-demande-frais',
  },
  {
    title: 'List Demande Congé',
    icon: { icon: 'calendar-times', pack: 'fa' },
    link: '/pages/list-demande-conge',
  },
  {
    title: 'List Demande Infos',
    icon: { icon: 'info-circle', pack: 'fa' },
    link: '/pages/list-demande-info',
  },
];
