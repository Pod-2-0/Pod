import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const ListingTable = ({ listings }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: '400px', maxWidth: '1000%', overflow: 'auto' }}
    >
      <Table style={{ minWidth: 1000 }}>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Product Description</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Seller ID</TableCell>
            <TableCell>Discount ID</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listings.map((listing) => (
            <TableRow key={listing._id}>
              <TableCell>{listing._id}</TableCell>
              <TableCell>{listing.product_name}</TableCell>
              <TableCell>{listing.price}</TableCell>
              <TableCell>{listing.quantity}</TableCell>
              <TableCell>{listing.category}</TableCell>
              <TableCell>{listing.product_description}</TableCell>
              <TableCell>{listing.image}</TableCell>
              <TableCell>{listing.seller_id}</TableCell>
              <TableCell>{listing.discount_id}</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary'>
                  Edit
                </Button>
                <Button variant='outlined' color='secondary'>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListingTable;
