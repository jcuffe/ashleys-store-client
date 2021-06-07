import style from './index.module.scss'

import React from 'react'

import { Formik, Form, FormikHelpers } from 'formik'
import {
  useCheckoutService,
  ShippingAddressValues,
  shippingAddressSchema,
} from 'src/machines/checkout'

import { labels } from '../constants'
import FloatLabelField from 'src/components/formik/FloatLabelField'
import FixedActions from 'src/components/FixedActions'

const ShippingAddress: React.FC<{}> = () => {
  const [state, send] = useCheckoutService()

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
          <FloatLabelField
            name="name"
            label={labels.name}
            className={style.name}
          />
          <FloatLabelField name="address1" label={labels.address1} />
          <FloatLabelField name="address2" label={labels.address2} />
          <FloatLabelField name="city" label={labels.city} />
          <FloatLabelField name="state" label={labels.state} />
          <FloatLabelField name="zip" label={labels.zip} />
          <FixedActions>
            <button
              type="submit"
              disabled={isSubmitting}
              className={style.continue}
            >
              Next
            </button>
          </FixedActions>
        </Form>
      )}
    </Formik>
  )
}

export default ShippingAddress
