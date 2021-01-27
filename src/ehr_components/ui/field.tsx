export interface Prop {
  label: string
  name: string,
  children: JSX.Element
}

const Field = (props: Prop) => {

  let { label, name, children } = props;

  return (
    <div className="mb-4 row">
      <label htmlFor={name} className="col-sm-4 col-form-label text-left">{label}</label>
      <div className="col-sm-8 text-left">
        {children}
      </div>
    </div>
  )
}

export default Field;