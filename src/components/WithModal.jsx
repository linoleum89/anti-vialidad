import React from "react";
import { Button, Modal } from "react-bootstrap";

function WithModal(WrappedComponent) {
  function ModalComponent(props) {
    const { isOpen, handleClose, handleSubmit, isFormValid, title, save, close, ...remainingprops } = props;
    return (
      <Modal show={isOpen} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton onHide={handleClose}>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <WrappedComponent {...remainingprops} />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary" disabled={isFormValid ? '' : 'disabled'}>
              {save}
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              {close}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  };

  ModalComponent.defaultProps = {
    title: "Modal title",
    close: "Close",
    save: "Save"
  };

  return ModalComponent;
}

export default WithModal;
