export type PhoneMaskClient = {
  id: string;
  key: string;
  name: string;
  emoji: string;
  prefix: string;
  mask: string[];
};

export type NumberFieldsClient = {
  value: string;
  canEdit: boolean;
  isNumber: boolean;
};
