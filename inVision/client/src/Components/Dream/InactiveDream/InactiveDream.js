import React, { useContext, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { DreamContext } from '../../../Providers/DreamProvider';
import { useHistory, useParams } from 'react-router-dom';
import { FaCloudMoon } from 'react-icons/fa';
import { Container } from 'react-bootstrap';

export default function InactiveDream({ inactiveDream }) {
  const { reactivateDream } = useContext(DreamContext);
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const history = useHistory();

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async function reactivate() {
    reactivateDream(inactiveDream.id);
    await sleep(300);
    history.push(`/`);
  }

  return (
    <>
      <Button color="danger" size="lg" block onClick={toggle}>
        {inactiveDream.name} <br /> <FaCloudMoon />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Reactivate?</ModalHeader>
        <ModalFooter>
          <Container>
            <Button color="success" onClick={reactivate} size="lg">
              Confirm
            </Button>{' '}
            <Button color="secondary" onClick={toggle} size="lg">
              Cancel
            </Button>
          </Container>
        </ModalFooter>
      </Modal>
    </>
  );
}
