import PhoneInputStore from '../PhoneInputStore';
import { PhoneMaskServer, PhoneMaskClient } from 'shared/entities/phone';

describe('Стор с масками', () => {
  const masks: PhoneMaskServer[] = [
    {
      key: 'ru',
      name: 'Россия',
      emoji: '🇷🇺',
      prefix: '+7',
      mask: '(12)-12',
    },
    {
      key: 'kek',
      name: 'Lol',
      emoji: '🇳🇺',
      prefix: '+9',
      mask: '(1) * - *',
    },
    {
      key: 'test',
      name: 'testtest',
      emoji: '🤒',
      prefix: '8',
      mask: '(*)(*)',
    },
  ];
  const store = new PhoneInputStore({ masks: masks });

  it('извлечение ключей из маски', () => {
    const sortedMasksKeys = ['ru', 'kek', 'test'];
    expect(store.sortedMasks.keys).toEqual(sortedMasksKeys);
  });

  it('извлечение значений из маски', () => {
    const masksEntities = {
      ru: {
        emoji: '🇷🇺',
        id: 'ru',
        key: 'ru',
        mask: ['(', '1', '2', ')', '-', '1', '2'],
        name: 'Россия',
        prefix: '+7',
      },
      kek: {
        key: 'kek',
        id: 'kek',
        name: 'Lol',
        emoji: '🇳🇺',
        prefix: '+9',
        mask: ['(', '1', ')', ' ', '*', ' ', '-', ' ', '*'],
      },
      test: {
        key: 'test',
        id: 'test',
        name: 'testtest',
        emoji: '🤒',
        prefix: '8',
        mask: ['(', '*', ')', '(', '*', ')'],
      },
    };
    expect(store.sortedMasks.entities).toEqual(masksEntities);
  });

  it('выбор региона', () => {
    const countryKey = 'ru';
    store.selectCountyKey(countryKey);
    expect(store.selectedCountryKey).toEqual(countryKey);
  });

  it("поверка корректного извлечения значния 'ru' из маски", () => {
    const selectedValue: PhoneMaskClient = {
      emoji: '🇷🇺',
      id: 'ru',
      key: 'ru',
      mask: ['(', '1', '2', ')', '-', '1', '2'],
      name: 'Россия',
      prefix: '+7',
    };
    expect(store.sortedMasks.entities['ru']).toEqual(selectedValue);
  });
});
