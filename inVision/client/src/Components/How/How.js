import React, { useContext, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { HowContext } from '../../Providers/HowProvider';
import { CompletedHowContext } from '../../Providers/CompletedHowProvider';

export default function How({ how }) {
  const { deleteHow, getActiveHows } = useContext(HowContext);
  const { addCompletedHow, getCompletedHows } = useContext(CompletedHowContext);
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
    history.push(`/how/edit/${how.id}`);
  };

  async function Delete() {
    deleteHow(how.id);
    await sleep(300);
    toggleAll();
    getActiveHows(how.dreamId);
  }

  async function Complete() {
    const completedHow = {
      dateCompleted: new Date(),
      howId: how.id,
    };
    addCompletedHow(completedHow);
    await sleep(300);
    toggle();
    getActiveHows(how.dreamId);
    getCompletedHows(how.dreamId);
  }

  return (
    <>
      <div>
        <Button outline color="info" onClick={toggle} block>
          {how.description} <br />
          {how.timeToComplete} Minutes
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Do you want to...</ModalHeader>
          <ModalBody>
            <h4>{how.description}</h4>
          </ModalBody>
          <ModalFooter>
            <Container>
              <Button color="success" onClick={Complete} size="lg">
                Complete!
              </Button>{' '}
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
      </div>
      <br />
    </>
  );
}
