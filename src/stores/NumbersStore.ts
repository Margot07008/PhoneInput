import { action, computed, makeObservable, observable } from 'mobx';
import {
  NumberFieldsClient,
  PhoneMaskClient,
} from 'shared/entities/phone/client';
import {
  ARROW_LEFT_KEYS,
  ARROW_RIGHT_KEYS,
  BACKSPACE_KEYS,
  ENTER_KEYS,
} from 'shared/utils/keyCodes';

export default class NumbersStore {
  fields: NumberFieldsClient[];
  activeField: number | null = null;
  value: string[];
  phoneNumber: PhoneMaskClient;
  actualNumberPosition: number = -1;
  isUserInputValid: boolean = true;

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

      setActiveField: action,
      setField: action,
      refactorFields: action,
      refactorValue: action,
      validateUserInput: action,
      setNextActiveField: action,
      setPrevActiveField: action,
      handleKeydown: action,

      inputResult: computed
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
    const array = this.fields.slice(this.activeField + 1);
    array.some((item, idx) => {
      if (item.canEdit && this.activeField) {
        this.activeField += idx + 1;
        return true;
      }
      return false;
    });
  };

  setPrevActiveField = (): void => {
    if (!this.activeField) {
      return;
    }
    const array = this.fields.slice(0, this.activeField);
    array.forEach((item, idx) => {
      if (item.canEdit && this.activeField) {
        this.activeField = idx;
      }
    });
  };

  handleKeydown = ({ key }): void => {
    if (ENTER_KEYS.includes(String(key))) {
      this.validateUserInput();
    }
    if (ARROW_RIGHT_KEYS.includes(String(key))) {
      this.setNextActiveField();
    }
    if ((ARROW_LEFT_KEYS.includes(String(key))) || (
      BACKSPACE_KEYS.includes(String(key)) &&
      this.activeField &&
      this.fields[this.activeField].value === ''
    )) {
      this.setPrevActiveField();
    }
  };
}
