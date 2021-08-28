import { action, computed, makeObservable, observable } from 'mobx';

import { IPhoneInputStore } from 'shared/entities/store/phoneInputStore';
import { PhoneMaskServer } from 'shared/entities/phone';
import { PhoneMaskClient } from 'shared/entities/phone/client';

export default class PhoneInputStore implements IPhoneInputStore {
  masks: PhoneMaskServer[];
  selectedCountryKey: string | null = null;

  constructor({ masks }: { masks: PhoneMaskServer[] }) {
    makeObservable(this, {
      selectedCountryKey: observable,

      selectCountyKey: action,

      sortedMasks: computed,
      selectedCountryData: computed,
    });
    this.masks = masks;
  }

  selectCountyKey = (value: string): void => {
    this.selectedCountryKey = value;
  };

  get selectedCountryData(): PhoneMaskClient | null {
    if (this.selectedCountryKey) {
      return this.sortedMasks.entities[this.selectedCountryKey];
    }
    return null;
  }

  get sortedMasks(): { entities: {}; keys: string[] } {
    return this.masks.reduce(
      (acc, item) => ({
        ...acc,
        entities: {
          ...acc.entities,
          [item.key]: {
            ...item,
            mask: item.mask.split(''),
            id: item.key,
          },
        },
        keys: [...acc.keys, item.key],
      }),
      { entities: {}, keys: [] },
    );
  }
}
