# DateInput

- Date input field, with default date validation included

## Props

- `label: string`
- `error?: string` - default date validation is done by component, but you can use this property to indicate that e.g. it's not in your allowed range
- `value?: Date` - pass `Date` to set initial date
- `onChange: (?Date) => void` - when user filled all fields and Date is valid, you get back `Date`, otherwise `null`
