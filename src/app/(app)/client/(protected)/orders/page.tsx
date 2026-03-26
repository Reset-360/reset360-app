import OrderClient from '@/components/client/orders/OrderClient'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Order History',
};

const OrderPage = () => {
  return <OrderClient />
}

export default OrderPage