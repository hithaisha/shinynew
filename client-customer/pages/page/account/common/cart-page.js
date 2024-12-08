import React, { useState, useContext } from 'react';
import Link from 'next/link';
import CartContext from '../../../../helpers/cart';
import { Container, Row, Col, Media, Input, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { CurrencyContext } from '../../../../helpers/Currency/CurrencyContext';
import { createOrder } from '../../../../api/order.api';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/router';

const CartPage = () => {
  const context = useContext(CartContext);
  const cartItems = context.state;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const total = context.cartTotal;
  const removeFromCart = context.removeFromCart;
  const updateQty = context.updateQty;
  const [quantityError, setQuantityError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '' });
  const [showCardForm, setShowCardForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [auth, setAuth] = useState(Boolean(localStorage.getItem('authToken')));
  const router = useRouter();

  const handleQtyUpdate = (item, quantity) => {
    if (quantity >= 1) {
      setQuantityError(false);
      updateQty(item, quantity);
    } else {
      setQuantityError(true);
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const sendEmailWithOrderDetails = () => {
    if (!userEmail) {
      toast.error('Please provide a valid email address.');
      return;
    }

    const message = cartItems
      .map((item) => `${item.itemName} - ${symbol}${item.price.toFixed(2)} x${item.qty} = ${symbol}${item.total.toFixed(2)}`)
      .join('\n');

    const emailData = {
      from_name: 'Heritage',
      email: userEmail,
      to_name: 'Customer',
      message: `Your purchased items:\n\n${message}\n\nTotal Price: ${symbol}${total.toFixed(2)}`,
    };

    emailjs
      .send('service_5t0bt18', 'template_zyb6x02', emailData, 'L1ntqiB-hFY3DGBb8')
      .then((response) => {
        toast.success('Order details sent successfully!');
        setModalIsOpen(false);
        router.push('/');
        window.location.reload();
      })
      .catch((error) => {
        toast.error('Failed to send order details.');
      });
  };

  const saveOrder = async () => {
    if (!auth) {
      toast.info('You must login first');
    } else if (paymentMethod === '') {
      toast.info('Please select a payment method');
    } else if (paymentMethod === 'card' && (!cardDetails.cardNumber || !cardDetails.nameOnCard)) {
      toast.info('Please enter your card details and name on card');
    } else if (!userEmail) {
      toast.info('Please provide your email to send the order details');
    } else {
      try {
        const payload = {
          invoiceNumber: '',
          orderId: 0,
          totalPrice: cartItems?.reduce((total, item) => total + item.total, 0),
          orderItems: cartItems.map((item) => ({
            productId: item.id,
            quantity: Number(item.qty),
            totalPrice: item.total,
            itemName: item.itemName,
            itemImageUrl: item.itemImageUrl,
          })),
          paymentMethod,
          cardDetails: paymentMethod === 'card' ? cardDetails : null,
        };

        const response = await createOrder(payload);
        sendEmailWithOrderDetails();

        toast.success('Order placed successfully!');
        localStorage.removeItem('cartList');
        setTimeout(() => {
          setModalIsOpen(false);
        }, 2000);
      } catch (e) {
        toast.error('Error, try again');
      }
    }
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handlePaymentMethodSelection = (method) => {
    setPaymentMethod(method);
    setShowCardForm(method === 'card');
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal} style={{ backgroundColor: '#f8f9fa', color: '#343a40' }}>
          Select Payment Method
        </ModalHeader>
        <ModalBody style={{ padding: '20px' }}>
          <div>
            <h4 style={{ marginBottom: '15px' }}>Choose a Payment Method</h4>
            <Button
              color={paymentMethod === 'card' ? 'success' : 'primary'}
              onClick={() => handlePaymentMethodSelection('card')}
              style={{
                marginBottom: '10px',
                padding: '10px 20px',
                backgroundColor: paymentMethod === 'card' ? '#28a745' : '#007bff',
                borderColor: paymentMethod === 'card' ? '#28a745' : '#007bff',
              }}
            >
              Card Payment
            </Button>
            <Button
              color={paymentMethod === 'cashOnDelivery' ? 'success' : 'secondary'}
              onClick={() => handlePaymentMethodSelection('cashOnDelivery')}
              style={{
                marginLeft: '10px',
                marginBottom: '10px',
                padding: '10px 20px',
                backgroundColor: paymentMethod === 'cashOnDelivery' ? '#28a745' : '#6c757d',
                borderColor: paymentMethod === 'cashOnDelivery' ? '#28a745' : '#6c757d',
              }}
            >
              Cash on Delivery
            </Button>
          </div>

          {showCardForm && (
            <div className="mt-4">
              <h5>Enter Card Details</h5>
              <Input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                style={{ marginBottom: '10px' }}
              />
              <Input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                style={{ marginBottom: '10px' }}
              />
              <Input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
                style={{ marginBottom: '10px' }}
              />
              <Input
                type="text"
                name="nameOnCard"
                placeholder="Name on Card"
                value={cardDetails.nameOnCard}
                onChange={handleCardDetailsChange}
                style={{ marginBottom: '20px' }}
              />
            </div>
          )}

          <div className="mt-4">
            <h5>Enter Your Email to Receive the Order Details</h5>
            <Input
              type="email"
              name="userEmail"
              placeholder="Email Address"
              value={userEmail}
              onChange={handleEmailChange}
              style={{ marginBottom: '20px' }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={saveOrder}
            style={{ padding: '10px 20px', backgroundColor: '#28a745', borderColor: '#28a745' }}
          >
            Confirm Order
          </Button>
          <Button
            color="secondary"
            onClick={toggleModal}
            style={{ padding: '10px 20px', backgroundColor: '#dc3545', borderColor: '#dc3545' }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {cartItems && cartItems.length > 0 ? (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <table className="table cart-table table-responsive-xs" style={{ marginTop: '20px' }}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Media src={item.itemImageUrl} alt="product" className="img-fluid" style={{ width: '50px', height: '50px' }} />
                          {item.itemName}
                        </td>
                        <td>{symbol + item.price}</td>
                        <td>
                          <div className="qty-box">
                            <Input
                              type="number"
                              value={item.qty}
                              onChange={(e) => handleQtyUpdate(item, e.target.value)}
                              min="1"
                              style={{ width: '80px' }}
                            />
                          </div>
                        </td>
                        <td>{symbol + item.total}</td>
                        <td>
                          <Button color="danger" onClick={() => removeFromCart(item)}>
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3">
                        <h4>Total</h4>
                      </td>
                      <td>
                        <h4>{symbol + total}</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="proceed-btn">
                  <Button
                    color="primary"
                    onClick={toggleModal}
                    style={{ backgroundColor: '#007bff', padding: '10px 20px' }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <h4>Your cart is empty</h4>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </div>
  );
};

export default CartPage;
  