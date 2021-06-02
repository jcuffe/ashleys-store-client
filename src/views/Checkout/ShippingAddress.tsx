import React from 'react'
import VerticalField from 'src/components/formik/VerticalField'

import { Formik, Form, FormikHelpers } from 'formik'
import {
  useCheckoutService,
  ShippingAddressValues,
  shippingAddressSchema,
} from 'src/machines/checkout'

import { labels } from './constants'

const ShippingAddress: React.FC<{}> = () => {
  const [state, send] = useCheckoutService()

  if (!state.matches('shippingAddress')) {
    return <div>oops</div>
  }

  const handleSubmit = (
    values: ShippingAddressValues,
    { setSubmitting }: FormikHelpers<ShippingAddressValues>,
  ) => {
    send({ type: 'submitForm', values })
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={state.context.shippingAddress}
      validationSchema={shippingAddressSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="ShippingAddress__Form">
          <div className="Form__Row">
            <VerticalField name="address1" label={labels.address1} />
          </div>
          <div className="Form__Row">
            <VerticalField name="address2" label={labels.address2} />
          </div>
          <div className="Form__Row">
            <VerticalField name="city" label={labels.city} />
          </div>
          <div className="Form__Row">
            <VerticalField name="state" label={labels.state} />
          </div>
          <div className="Form__Row">
            <VerticalField name="zip" label={labels.zip} />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Next
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default ShippingAddress
