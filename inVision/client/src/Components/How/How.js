import React, { useContext, useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ButtonGroup } from 'reactstrap';
import { useHistory } from "react-router-dom";
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

    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    };

    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    };

    const Edit = () => {
        history.push(`/how/edit/${how.id}`)
    };

    const Delete = () => {
        deleteHow(how.id)
            .then(toggleAll)
            .then(getActiveHows(how.dreamId));
    };

    const Complete = () => {
        const completedHow = {
            dateCompleted: new Date(),
            howId: how.id
        };
        addCompletedHow(completedHow)
            .then(toggle)
            .then(getActiveHows(how.dreamId))
            .then(getCompletedHows(how.dreamId));
    }

    return (
        <>
            <div>
                <Button outline color="info" onClick={toggle} block>{how.description} <br />{how.timeToComplete} Minutes</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{how.description}</ModalHeader>
                    <ModalFooter>
                        <ButtonGroup size="lg">
                            <Button color="success" onClick={Complete}>Complete!</Button>{' '}
                            <Button color="warning" onClick={Edit}>Edit</Button>{' '}
                            <Button color="danger" onClick={toggleNested}>Delete</Button>
                        </ButtonGroup>
                        <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                            <ModalHeader>Are you sure you want to delete?</ModalHeader>
                            <ModalFooter>
                                <Button color="danger" onClick={Delete}>Delete</Button>{' '}
                                <Button color="secondary" onClick={toggleNested}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </ModalFooter>
                </Modal>

            </div>
            <br />
        </>
    )
}