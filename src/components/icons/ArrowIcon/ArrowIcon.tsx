import * as React from 'react';
import cn from 'classnames';

import { IconDirection, iconSideSizes, IconSize } from '../utils';

import './ArrowIcon.modules.scss';

type Props = {
  direction?: IconDirection;
  iconSize?: IconSize;
  styleName?: string;
  onClick?: (event: React.MouseEvent) => void;
};

const ArrowIcon: React.FC<Props> = ({
  direction = IconDirection.right,
  iconSize = IconSize.M,
  styleName,
  onClick,
}: Props) => {
  const sideSize = iconSideSizes[iconSize];
  return (
    <svg
      styleName={cn('arrow-icon', `arrow-icon_${direction}`)}
      className={styleName}
      width={sideSize}
      height={sideSize}
      viewBox={`0 0 ${sideSize} ${sideSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M9.23582 17.765C9.54917 18.0783 10.0544 18.0783 10.3677 17.765L15.6819 12.4508C15.7411 12.3917 15.7882 12.3214 15.8203 12.244C15.8524 12.1667 15.8689 12.0838 15.8689 12C15.8689 11.9162 15.8524 11.8333 15.8203 11.756C15.7882 11.6786 15.7411 11.6083 15.6819 11.5492L10.3677 6.23501C10.0544 5.92166 9.54917 5.92166 9.23582 6.23501C8.92247 6.54836 8.92247 7.05356 9.23582 7.36691L13.8657 12.0032L9.22942 16.6395C8.92247 16.9464 8.92247 17.458 9.23582 17.765Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default React.memo(ArrowIcon);
