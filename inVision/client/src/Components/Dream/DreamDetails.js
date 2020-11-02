import React, { useEffect, useContext, useState } from "react";
import { DreamContext } from '../../Providers/DreamProvider';
import { HowContext } from '../../Providers/HowProvider';
import { CompletedHowContext } from '../../Providers/CompletedHowProvider';
import { WhyContext } from '../../Providers/WhyProvider';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, FormGroup, Label, Input, InputGroupAddon, InputGroupText, Container, Col, Row, InputGroup } from "reactstrap";
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
        <Container>
            <h1>{dream.name}</h1>
            <Button color="success" onClick={toggle} size="lg" block>gimme a random how</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>How much time ya got?</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <InputGroup>
                            <Input id="timeAvailable" type="number" onChange={handleIntFieldChange} />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>minutes</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
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
            <Row>
                <Col sm="6">
                    {hows.map((how) => (
                        <How key={how.id} how={how} />
                    ))}
                </Col>
            </Row>
            <Button color="primary" onClick={Add} size="lg" block>Add How</Button>{" "}
            <h3>Completed Hows</h3>
            <Row>
                <Col>
                    {completedHows.map((completedHow) => (
                        <CompletedHow key={completedHow.id} completedHow={completedHow} />
                    ))}
                </Col>
            </Row>
            <h4>{why.description}</h4>
            <Button color="link" onClick={Whys} size="lg" block>Why Am I Doing This Again?</Button>
            <Button color="secondary" onClick={allDreams} size="lg" block>What else am I working on?</Button>
        </Container>
    )
}