import './index.css'
import React from 'react';
import { Container } from 'react-bootstrap'

function ItemsDetails(props) {

  return <Container fluid className="container-list">
    <div className="item-card">
      <div className="item-card-picture">E{props.item.id}</div>
      <div className="item-card-description">{props.item.description}</div>
    </div>
  </Container>;
}

export default ItemsDetails;