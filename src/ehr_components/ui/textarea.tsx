export interface Prop {
  value: string
  name: string,
  placeholder: string,
  onChange: (name: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = (props: Prop) => {

  let { value, name, onChange, placeholder } = props;

  function _onChange(event: any) {
    onChange(name, event);
  }

  return (
    <textarea 
      className="form-control" 
      id={name}
      value={value}
      placeholder={placeholder}
      onChange={_onChange}
      onInput={_onChange}
    />
  )
}

export default TextArea;