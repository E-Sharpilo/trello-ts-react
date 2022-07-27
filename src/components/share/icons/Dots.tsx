import { SVGProps, memo } from 'react';

const Dots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 256 256'
  >
    <path
      d='M160 128a32 32 0 1 1-32-32 32.032 32.032 0 0 1 32 32ZM48 96a32 32 0 1 0 32 32 32.032 32.032 0 0 0-32-32Zm160 0a32 32 0 1 0 32 32 32.032 32.032 0 0 0-32-32Z'
      fill='#fff'
    />
  </svg>
);

const Memo = memo(Dots);
export default Memo;
