import { SVGProps, memo } from 'react';

const CheckMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 64 64'
    width={18}
    height={18}
  >
    <path
      fill='#fff'
      d='M27 55 6 33l3-4 17 12 29-29 4 4z'
    />
  </svg>
);

const Memo = memo(CheckMark);
export default Memo;
