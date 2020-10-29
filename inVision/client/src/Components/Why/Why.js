import React, { useContext, useState } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { WhyContext } from '../../Providers/WhyProvider';

export default function Why({ why }) {
    const { deleteWhy, getDreamWhys } = useContext(WhyContext);
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const Edit = () => {
        history.push(`/why/edit/${why.id}`)
    }

    const Delete = () => {
        deleteWhy(why.id)
            .then(toggle)
            .then(getDreamWhys(why.dreamId));
    }

    return (
        <>
            <div>
                {why.description}
            </div>
            <div>
                <Button color="link" onClick={Edit}>Edit</Button>
                <Button color="link" onClick={toggle}>Delete</Button>{" "}
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Are you sure you want to delete?</ModalHeader>
                    <ModalFooter>
                        <Button color="danger" onClick={Delete}>Delete</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>

        </>
    )
}