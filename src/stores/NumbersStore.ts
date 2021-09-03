import { action, computed, makeObservable, observable } from 'mobx';
import {
  NumberFieldsClient,
  PhoneMaskClient,
} from 'shared/entities/phone/client';
import { keyCodes } from 'shared/utils/keyCodes';

export default class NumbersStore {
  fields: NumberFieldsClient[];
  activeField: number | null = null;
  value: string[];
  phoneNumber: PhoneMaskClient;
  actualNumberPosition: number = -1;
  isUserInputValid: boolean = true;
  indexesOfStars: number[] = [];

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
      isUserInputValid: observable,
      indexesOfStars: observable,

      setActiveField: action,
      setField: action,
      refactorFields: action,
      refactorValue: action,
      validateUserInput: action,
      setNextActiveField: action,
      setPrevActiveField: action,
      handleKeydown: action,

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

    return phoneNumber.mask.map((item, idx) => {
      const isStar = item === '*';
      if (isStar) {
        this.indexesOfStars.push(idx);
      }
      const isNumber = !!item.match(/[0-9]/) || isStar;
      if (isNumber || isStar) {
        this.actualNumberPosition++;
      }
      return {
        value: isStar ? this.value[this.actualNumberPosition] || '' : item,
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
      this.setNextActiveField();
    }
  };

  validateUserInput = (): void => {
    this.isUserInputValid = this.fields.every(item => {
      if (item.canEdit) {
        return item.value.match(/[0-9]/);
      }
      return true;
    });
  };

  setNextActiveField = (): void => {
    if (!this.activeField) {
      return;
    }
    const nextPosition = this.indexesOfStars.indexOf(this.activeField) + 1;
    if (nextPosition >= 0 && nextPosition < this.indexesOfStars.length) {
      this.activeField = this.indexesOfStars[nextPosition];
    }
  };

  setPrevActiveField = (): void => {
    if (!this.activeField) {
      return;
    }
    const prevPosition = this.indexesOfStars.indexOf(this.activeField) - 1;
    if (prevPosition >= 0 && prevPosition <= this.indexesOfStars.length) {
      this.activeField = this.indexesOfStars[prevPosition];
    }
  };

  handleKeydown = ({ key }): void => {
    if (keyCodes.ENTER_KEYS.includes(String(key))) {
      this.validateUserInput();
    }
    if (keyCodes.ARROW_RIGHT_KEYS.includes(String(key))) {
      this.setNextActiveField();
    }
    if (
      keyCodes.ARROW_LEFT_KEYS.includes(String(key)) ||
      (keyCodes.BACKSPACE_KEYS.includes(String(key)) &&
        this.activeField &&
        this.fields[this.activeField].value === '')
    ) {
      this.setPrevActiveField();
    }
  };
}
