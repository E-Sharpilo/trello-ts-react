import { SVGProps, memo } from 'react'

const PencilSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    height={20}
    width={19}
    viewBox="0 0 29 30"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#231F20">
      <path d="m8.774 28.36-7.67-7.67 16.04-16.037 7.67 7.67zM27.638 3.996l-2.46-2.459a3.476 3.476 0 0 0-4.917 0l-1.725 1.724 7.67 7.669 1.725-1.724c1.357-1.358 1.066-3.852-.293-5.21zM0 30h7.088L0 22.28z" />
    </g>
  </svg>
)

const Memo = memo(PencilSvg)
export default Memo
