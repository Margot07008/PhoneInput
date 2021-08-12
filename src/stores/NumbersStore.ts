import { action, computed, makeObservable, observable } from 'mobx';
import {
  NumberFieldsClient,
  PhoneMaskClient,
} from 'shared/entities/phone/client';

export default class NumbersStore {
  fields: NumberFieldsClient[];
  activeField: number | null = null;
  value: string[];
  phoneNumber: PhoneMaskClient;
  actualNumberPosition: number = -1;

  constructor({
    phoneNumber,
    value,
  }: {
    phoneNumber: PhoneMaskClient;
    value: string;
  }) {
    makeObservable(this, {
      fields: observable,
      activeField: observable,
      value: observable,
      phoneNumber: observable,
      actualNumberPosition: observable,

      setActiveField: action,
      setField: action,
      refactorFields: action,
      refactorValue: action,

      inputResult: computed,
    });

    this.phoneNumber = phoneNumber;
    this.value = this.refactorValue(value);
    this.fields = this.refactorFields(phoneNumber);
  }

  get inputResult(): string {
    return `${this.phoneNumber.prefix} ${this.fields
      .map(item => {
        return item.value;
      })
      .join('')}`;
  }

  refactorValue = (value: string): string[] => {
    return value
      .trim()
      .replace(/[^0-9+]/g, '')
      .split('')
      .slice(this.phoneNumber.prefix.length);
  };

  refactorFields = (
    phoneNumber: PhoneMaskClient | null,
  ): NumberFieldsClient[] => {
    if (!phoneNumber) {
      return [];
    }
    return phoneNumber.mask.map(item => {
      const isStar = item === '*';
      const isNumber = !!item.match(/[0-9]/);
      if (isNumber || isStar) {
        this.actualNumberPosition++;
      }
      return {
        value: isStar ? this.value[this.actualNumberPosition] : item,
        canEdit: isStar,
        isNumber: isNumber,
      };
    });
  };

  setActiveField = (idx: number): void => {
    this.activeField = idx;
  };

  setField = (actualPosition: number, value: string): void => {
    if (!value) {
      this.fields[actualPosition].value = '';
    } else if (value.match(/[0-9]/)) {
      this.fields[actualPosition].value = value;
    }
  };
}
