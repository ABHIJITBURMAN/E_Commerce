import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckouSteps'
import { savePaymentMethod } from '../actions/cartAction'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Submit')
    dispatch(savePaymentMethod(paymentMethod))

    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'> Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='Paypel or Credit Card'
              id='Paypel'
              name='paymentMethod'
              value='Paypel'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' varient='parimary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
