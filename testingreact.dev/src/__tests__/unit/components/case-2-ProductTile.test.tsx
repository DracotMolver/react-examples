import React from 'react'
import { axe } from 'jest-axe'
import { render } from '@testing-library/react'
import ProductTile from '../../../components/ProductTile'

describe('The <ProductTile /> component', () => {
  const defaultProps = {
    id: 12,
    name: 'Example product name',
    image: '/image.png',
    price: 'from $12.99',
    brand: 'Adidas',
    createdAt: '2020-02-11 00:00:00',
    isActive: true,
    isNew: true,
    isSoldOut: false,
    priceUnformatted: 1299,
  }

  it('renders a product tile with name, image and price', () => {
    const { getByText, getByAltText } = render(
      <ProductTile {...defaultProps} />,
    )

    expect(getByText(defaultProps.name)).toBeInTheDocument()
    expect(getByText(defaultProps.price)).toBeInTheDocument()
    expect(getByAltText(defaultProps.name)).toBeInTheDocument()
  })

  it('renders a product tile with name and price only', () => {
    const { queryByAltText, queryByTestId } = render(
      <ProductTile {...({ ...defaultProps, image: null } as any)} />,
    )

    expect(queryByAltText(defaultProps.name)).toBeNull()
    expect(queryByTestId('ProductTileImage')).toBeNull()
  })

  it('has no accessibility violations', async () => {


  })


  
})
