import React, { useContext, useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { WhyContext } from '../../Providers/WhyProvider';

export default function Why({ why }) {
  const { deleteWhy, getDreamWhys } = useContext(WhyContext);
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const toggle = () => setModal(!modal);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const Edit = () => {
    history.push(`/why/edit/${why.id}`);
  };

  async function Delete() {
    deleteWhy(why.id);
    await sleep(300);
    toggleAll();
    getDreamWhys(why.dreamId);
  }

  return (
    <>
      <Button outline color="warning" onClick={toggle} block>
        {why.description}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{why.description}</ModalHeader>
        <ModalFooter>
          <Container>
            <Button color="primary" onClick={Edit} size="lg">
              Edit
            </Button>{' '}
            <Button color="danger" onClick={toggleNested} size="lg">
              Delete
            </Button>
          </Container>
          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
          >
            <ModalHeader>Are you sure you want to delete?</ModalHeader>
            <ModalFooter>
              <Button color="danger" onClick={Delete}>
                Delete
              </Button>{' '}
              <Button color="secondary" onClick={toggleNested}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </ModalFooter>
      </Modal>
      <br />
    </>
  );
}
