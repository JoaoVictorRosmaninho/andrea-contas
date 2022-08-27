import React from 'react';
import Form from 'react-bootstrap/Form';

function Checkbox(props) {
  const { type, setType } = props;


  const onChangeValue = (e) => {
   const { id } = e.target;
   setType(id);
  }

  return (
    <Form>
        <div key={`inline-checkbox`} className="mb-3">
          <Form.Check
            inline
            label="Por cliente"
            name="tipo"
            type="radio"
            id="cliente"
            onChange={onChangeValue}

          />
          <Form.Check
            inline
            label="Por Periodo"
            name="tipo"
            type="radio"
            id="periodo"
            onChange={onChangeValue}
          />
          <Form.Check
            inline
            label="Por Logista"
            type="radio"
            name="tipo"
            id="logista"
            onChange={onChangeValue}

          />
        <Form.Check
            inline
            label="Por Contas Ativas"
            type="radio"
            name="tipo"
            id="contas_ativas"
            onChange={onChangeValue}

          />
        <Form.Check
            inline
            label="Por Contas Inativas"
            type="radio"
            name="tipo"
            id="contas_inativas"
            onChange={onChangeValue}

          />
        <Form.Check
            inline
            label="Por Contas Inadimplentes"
            type="radio"
            name="tipo"
            id="contas_inadimplentes"
            onChange={onChangeValue}
          />
        </div>
    </Form>
  );
}

export default Checkbox;