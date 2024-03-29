import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './login.css'



const RecoverPw = ({ show, handleClose, handleShow }) => {
  return (
    <Modal show={show} onHide={handleClose} className="my-custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Formulario de Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="recover-pwd">
          <form>
            <div className="input-container">
              <label htmlFor="nombre">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu email"
                required
              />
            </div>

            <div className="input-container">
              <label htmlFor="secretpw">¿Lugar favorito en el mundo?</label>
              <input
                type="text"
                id="secretpw"
                name="secretpw"
                placeholder="Respuesta secreta"
                required
              />
            </div>

            <br></br>
            <Button type="submit" variant="primary">
                Confirmar
            </Button>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
      
    </Modal>
  );
}

export default RecoverPw;
