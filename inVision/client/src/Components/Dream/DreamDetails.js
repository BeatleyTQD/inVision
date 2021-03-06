import React, { useEffect, useContext, useState } from "react";
import { DreamContext } from '../../Providers/DreamProvider';
import { HowContext } from '../../Providers/HowProvider';
import { CompletedHowContext } from '../../Providers/CompletedHowProvider';
import { WhyContext } from '../../Providers/WhyProvider';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, FormGroup, Label, Input, InputGroupAddon, InputGroupText, Container, Col, Row, InputGroup, Card } from "reactstrap";
import { HiLightBulb, HiPlus, HiClipboardCheck, HiArrowLeft } from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";
import { GiAllSeeingEye } from "react-icons/gi"

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
            <h1>{dream.name} <br /><GiAllSeeingEye /></h1>
            <br />

            <div>
                <Button color="success" onClick={toggle} size="lg" block>What should I do? <br /> <HiLightBulb /></Button>
                <br />
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>How much time do you have available?</ModalHeader>
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
                        <Button color="success" onClick={randomHowSubmit} block>Submit!</Button>
                        <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                            <ModalHeader>Why don't you...</ModalHeader>
                            <ModalBody>{randomHow && randomHow.description}</ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={toggleAll} block>It shall be done!</Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </ModalFooter>
                </Modal>
            </div>

            <div>
                <Row>
                    <Col>
                        {hows.map((how) => (
                            <How key={how.id} how={how} />
                        ))}
                    </Col>
                </Row>
                <Button color="info" onClick={Add} size="lg" block>Add How <br /> <HiPlus /></Button>{" "}
            </div>
            <br />

            <Button color="warning" onClick={Whys} size="lg" block>Why? <br />{why.description} <br /> <FiMoreHorizontal /></Button>
            <br />
            <Card>
                <h3><HiClipboardCheck /></h3>
                <Row>
                    <Col>
                        {completedHows.map((completedHow) => (
                            <CompletedHow key={completedHow.id} completedHow={completedHow} />
                        ))}
                        <br />
                    </Col>
                </Row>
            </Card>
            <br />

            <Button color="secondary" onClick={allDreams} size="lg" block>Dream List <br /> <HiArrowLeft /> </Button>
            <br />
        </Container>
    )
}