import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

import { IPhoneInputStore } from 'shared/entities/store/phoneInputStore';
import { PhoneMask } from 'shared/entities/phone';

export default class PhoneInputStore implements IPhoneInputStore {
  masks: PhoneMask[];
  selectedCountryKey: string | null = null;

  constructor({ masks }: { masks: PhoneMask[] }) {
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

  get selectedCountryData(): PhoneMask | null {
    if (this.selectedCountryKey) {
      // @ts-ignore
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
            id: item.key,
          },
        },
        keys: [...acc.keys, item.key],
      }),
      { entities: {}, keys: [] },
    );
  }
}
