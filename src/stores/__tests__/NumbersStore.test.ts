import NumbersStore from '../NumbersStore';
import {
  NumberFieldsClient,
  PhoneMaskClient,
} from 'shared/entities/phone/client';

describe('Стор c номером телефона', () => {
  let store: NumbersStore;
  let phoneNumber: PhoneMaskClient;

  const mask = ['(', '1', ')', ' ', '*', ' ', '-', ' ', '*'];
  const starsIdxs = mask.reduce(function (arr: number[], el, idx) {
    if (el === '*') arr.push(idx);
    return arr;
  }, []);

  const value = '+9 (1) --.dv  ())() 2 - 3';

  const resultValue = '+9 (1) 2 - 3';

  beforeEach(() => {
    phoneNumber = {
      id: 'kek',
      key: 'kek',
      name: 'Lol',
      emoji: '🇳🇺',
      prefix: '+9',
      mask: mask,
    };

    store = new NumbersStore({
      phoneNumber: phoneNumber,
      value: value,
    });
  });

  it('преобразование value в массив чисел без префикса и доп символов', () => {
    const resultArr = ['1', '2', '3'];
    expect(store.refactorValue(value)).toEqual(resultArr);
  });

  it('преобразование phoneNumber в массив объектов со свойствами, включая символы', () => {
    const resultArr: NumberFieldsClient[] = [
      {
        value: '(',
        canEdit: false,
        isNumber: false,
      },
      {
        value: '1',
        canEdit: false,
        isNumber: true,
      },
      {
        value: ')',
        canEdit: false,
        isNumber: false,
      },
      {
        value: ' ',
        canEdit: false,
        isNumber: false,
      },
      {
        value: '',
        canEdit: true,
        isNumber: true,
      },
      {
        value: ' ',
        canEdit: false,
        isNumber: false,
      },
      {
        value: '-',
        canEdit: false,
        isNumber: false,
      },
      {
        value: ' ',
        canEdit: false,
        isNumber: false,
      },
      {
        value: '',
        canEdit: true,
        isNumber: true,
      },
    ];
    expect(store.refactorFields(phoneNumber)).toEqual(resultArr);
  });

  it('преобразование пустого phoneNumber ', () => {
    const resultArr: NumberFieldsClient[] = [];
    expect(store.refactorFields(null)).toEqual(resultArr);
  });

  it('форматирование вывода', () => {
    expect(store.inputResult).toEqual(resultValue);
  });

  it('вставка и удаление валидного значения в ячейку', () => {
    const inputValue = '8';

    if (starsIdxs) {
      store.setField(starsIdxs[0], inputValue);
      expect(store.fields[starsIdxs[0]].value).toEqual(inputValue);

      store.setField(starsIdxs[0], '');
      expect(store.fields[starsIdxs[0]].value).toEqual('');
    }
  });

  it('поверка валидного телефонного номера', () => {
    store.validateUserInput();
    expect(store.isUserInputValid).toBeTruthy();
  });

  it('поверка невалидного телефонного номера', () => {
    if (starsIdxs) {
      store.setField(starsIdxs[0], 'a');
      store.validateUserInput();
      expect(store.validateUserInput()).toBeFalsy();
    }
  });

  it('переключение активного инпута вправо', () => {
    if (starsIdxs.length > 1) {
      store.setActiveField(starsIdxs[0]);
      store.setNextActiveField();
      expect(store.activeField).toEqual(starsIdxs[1]);
    }
  });

  it('переключение активного инпута влево', () => {
    if (starsIdxs.length > 1) {
      store.setActiveField(starsIdxs[1]);
      store.setPrevActiveField();
      expect(store.activeField).toEqual(starsIdxs[0]);
    }
  });

  it('обработка нажатия стрелки вправо', () => {
    if (starsIdxs.length > 1) {
      store.setActiveField(starsIdxs[0]);
      store.handleKeydown({ key: 'ArrowRight' });
      expect(store.activeField).toEqual(starsIdxs[1]);
    }
  });

  it('обработка нажатия стрелки влево', () => {
    if (starsIdxs.length > 1) {
      store.setActiveField(starsIdxs[1]);
      store.handleKeydown({ key: 'ArrowLeft' });
      expect(store.activeField).toEqual(starsIdxs[0]);
    }
  });

  it('обработка нажатия стрелки влево на первом инпуте ', () => {
    if (starsIdxs.length) {
      store.setActiveField(starsIdxs[0]);
      store.handleKeydown({ key: 'ArrowLeft' });
      expect(store.activeField).toEqual(starsIdxs[0]);
    }
  });

  it('обработка нажатия стрелки влево на последнем инпуте ', () => {
    if (starsIdxs.length) {
      store.setActiveField(starsIdxs[starsIdxs.length - 1]);
      store.handleKeydown({ key: 'ArrowRight' });
      expect(store.activeField).toEqual(starsIdxs[starsIdxs.length - 1]);
    }
  });
});
