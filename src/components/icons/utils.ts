export enum IconSize {
  XS = 'XS',
  S = 'S',
  XM = 'XM',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export const iconSideSizes = {
  [IconSize.XXL]: 40,
  [IconSize.XL]: 32,
  [IconSize.L]: 24,
  [IconSize.XM]: 20,
  [IconSize.M]: 18,
  [IconSize.S]: 16,
  [IconSize.XS]: 12,
};

export enum IconDirection {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}
