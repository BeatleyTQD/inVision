import React, { useContext, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { WhyContext } from '../../Providers/WhyProvider';

export default function Why({ why }) {
    const { deleteWhy, getDreamWhys } = useContext(WhyContext);
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const toggle = () => setModal(!modal);

    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    }
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    }

    const Edit = () => {
        history.push(`/why/edit/${why.id}`)
    }

    const Delete = () => {
        deleteWhy(why.id)
            .then(getDreamWhys(why.dreamId))
            .then(toggleAll);
    };

    return (
        <>
            <Button color="warning" onClick={toggle} block>{why.description}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{why.description}</ModalHeader>
                <ModalFooter>
                    <Button color="primary" onClick={Edit}>Edit</Button>{' '}
                    <Button color="danger" onClick={toggleNested}>Delete</Button>
                    <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                        <ModalHeader>Are you sure you want to delete?</ModalHeader>
                        <ModalFooter>
                            <Button color="danger" onClick={Delete}>Delete</Button>{' '}
                            <Button color="secondary" onClick={toggleNested}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </ModalFooter>
            </Modal>
            <br />
        </>
    )
}