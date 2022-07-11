
type Props = {
  onChange: () => void
  value: string
  type: string
  id: string
  name: string
}

export const Input: React.FC<Props> = ({ name, type, onChange, value }) => {
  return <input  id={name} name={name} type={type} onChange={onChange} value={value} />
}
