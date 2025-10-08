import clsx from 'clsx';
import numeral from 'numeral';
import React, { useState } from 'react';

type PricingCardProps = {
  title: string;
  description: string;
  price: string;
  onClick?: () => void;
  active?: boolean;
};

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price = 0,
  onClick,
  active,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        'rounded-sm shadow hover:shadow-lg transition',
        active || hovered ? 'bg-violet-600' : 'bg-white text-foreground'
      )}
    >
      <div className="text-left border-b border-violet-300 p-6 pb-1 h-45 flex flex-col justify-between">
        <div className="">
          <span
            className={clsx(
              'rounded-sm px-5 py-2',
              active ? 'bg-white text-violet-600' : 'bg-violet-500 text-white',
              'group-hover:bg-white group-hover:text-violet-600'
            )}
          >
            {title}
          </span>
          <p className="leading-none my-4">{description}</p>
        </div>

        <p className="text-3xl font-semibold transition">
          ₱{numeral(price).divide(100).format('0,0.00')}{' '}
          <span className={clsx('text-sm font-normal font-roboto text-white')}>
            /month
          </span>
        </p>
      </div>

      <div className="px-6 py-4 flex items-end justify-end">
        <button
          onClick={onClick}
          className={clsx(
            'py-1 px-5 rounded-sm cursor-pointer',
            active || hovered
              ? 'bg-white text-violet-600'
              : 'border border-violet-600'
          )}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
