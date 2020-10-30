import './index.css'
import React from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Container} from 'react-bootstrap'

function ResultsList(props) {

  const dispatch = useDispatch();

  return <Container fluid className="container-list">
    {props.list.length > 0 ? props.list.map((item) => <Row className="item-list" key={item.id} onClick={(e) => {
      e.preventDefault();
      dispatch({type: "SET_NAV_STATE", navState: "SHOW_DETAILS"})
      props.handleSelecter(item)
    }}>
        <Col xs={6} md={3} className="item-picture">E{item.id}</Col>
        <Col xs={6} md={9} className="item-header">
          <h2>{item.name}</h2>
          <h3>{item.type_name}</h3>
          <h4>{item.country}</h4>
        </Col>
      </Row>) 
      :
      <p className="text-not-found">Nenhuma empresa foi encontrada para a busca realizada.</p>
      }
  </Container>;
}

export default ResultsList;