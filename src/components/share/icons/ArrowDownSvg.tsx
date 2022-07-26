import { SVGProps, memo } from 'react'

const ArrowSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} width={24} height={24} xmlns="http://www.w3.org/2000/svg">
    <path
      d="m11.293 16.707-7.071-7.07a1 1 0 1 1 1.414-1.415L12 14.586l6.364-6.364a1 1 0 1 1 1.414 1.414l-7.07 7.071a1 1 0 0 1-1.415 0Z"
      fill="#fff"
    />
  </svg>
)

const Memo = memo(ArrowSvg)
export default Memo