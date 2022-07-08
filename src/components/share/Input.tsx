type Props = {
  onChange?: () => void
  value: string
  type: string
  id: string
  name: string
}

export const Input: React.FC<Props> = ({ onChange, value, type, id, name }) => {
  return <input onChange={onChange} type={type} value={value} id={id} name={name} />
}
