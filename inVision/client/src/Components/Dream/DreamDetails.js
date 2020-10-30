import React, { useEffect, useContext, useState } from "react";
import { DreamContext } from '../../Providers/DreamProvider';
import { HowContext } from '../../Providers/HowProvider';
import { CompletedHowContext } from '../../Providers/CompletedHowProvider';
import { WhyContext } from '../../Providers/WhyProvider';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import How from '.././How/How';
import CompletedHow from '.././CompletedHow/CompletedHow';

export default function DreamDetails() {
    const [dream, setDream] = useState();
    const [why, setWhy] = useState();
    const [randomHow, setRandomHow] = useState();
    const [timeAvailable, setTimeAvailable] = useState();
    const { getDream } = useContext(DreamContext);
    const { hows, getActiveHows, getRandomHow } = useContext(HowContext);
    const { completedHows, getCompletedHows } = useContext(CompletedHowContext);
    const { getRandomWhy } = useContext(WhyContext);

    const { id } = useParams();
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

    const handleIntFieldChange = evt => {
        const stateToChange = { ...timeAvailable };
        stateToChange[evt.target.id] = parseInt(evt.target.value);
        setTimeAvailable(stateToChange);
    };

    const loadDream = (id) => {
        getDream(id)
            .then(setDream);
        getActiveHows(id);
        getCompletedHows(id);
        getRandomWhy(id)
            .then(setWhy);
    }

    const randomHowSubmit = () => {
        getRandomHow(id, timeAvailable.timeAvailable)
            .then(setRandomHow)
            .then(toggleNested);
    }

    useEffect(() => {
        loadDream(id);
    }, [])

    const Add = () => {
        history.push(`${id}/how/add`)
    }

    const Whys = () => {
        history.push(`${id}/whys`)
    }

    const allDreams = () => {
        history.push(`/`)
    }

    if (!dream || !why) {
        return null;
    }

    return (
        <>
            <h1>{dream.name}</h1>
            <Button color="secondary" onClick={allDreams}>all dreams</Button> <br />
            <Button color="primary" onClick={Add}>CREATE NEW HOW</Button>{" "}
            <br />
            <Button color="link" onClick={toggle}>gimme a random how</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>How much time ya got?</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input id="timeAvailable" type="number" onChange={handleIntFieldChange} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={randomHowSubmit}>Submit</Button>
                    <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                        <ModalHeader>Why don'tcha</ModalHeader>
                        <ModalBody>{randomHow && randomHow.description}</ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={toggleAll}>It shall be done!</Button>{' '}
                        </ModalFooter>
                    </Modal>
                    <Button color="primary" onClick={toggle}>Cancel</Button>{' '}
                </ModalFooter>
            </Modal>
            <h3>Active Hows</h3>
            <div>
                {hows.map((how) => (
                    <How key={how.id} how={how} />
                ))}
            </div>
            <h3>Completed Hows</h3>
            <div>
                {completedHows.map((completedHow) => (
                    <CompletedHow key={completedHow.id} completedHow={completedHow} />
                ))}
            </div>
            <h4>{why.description}</h4>
            <Button color="link" onClick={Whys}>remind me why</Button>
        </>
    )
}