import { PhoneMaskServer } from 'shared/entities/phone/server';

export const masks: PhoneMaskServer[] = [
  {
    key: 'ru',
    name: 'Россия',
    emoji: '🇷🇺',
    prefix: '+7',
    mask: '(***) - *** - ** - **',
  },
  {
    key: 'kek',
    name: 'Lol',
    emoji: '🇳🇺',
    prefix: '+9',
    mask: '(123) - *** - ** - **',
  },
  {
    key: 'test',
    name: 'testtest',
    emoji: '🤒',
    prefix: '8',
    mask: '(9876) ** 2* **',
  },
];
