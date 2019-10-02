import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Alert,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardImg,
	Container,
	Input,
	Jumbotron,
	Modal, ModalBody, ModalHeader,
	Spinner
} from 'reactstrap';
import "./App.css";
import axios from "axios";
import {levels} from "shared";
import Instructions from "./instructions";

import TextEditor from "./TextEditor";
import {on} from "cluster";

const App: React.FC = () => {

	const [image, updateImage] = useState();
	const [input, updateInput] = useState(levels.examples.trim());
	const [errors, updateErrors] = useState([]);
	const [loading, updateLoading] = useState(false);
	const [instructionsOpen, updateInstructionsOpen] = useState(false);


	async function getImage() {
		updateLoading(true);
		try {
			const {data} = await axios.post(`${'production' === process.env.NODE_ENV ? "" : "http://localhost:8080"}/compile`, {input});
			updateImage(data.base64);
			updateErrors(data.err)
		} catch (err) {
			alert("There was an error, check the console");
			console.log(err);
		}
		updateLoading(false);
	}

	function useMock(input: string) {
		return () => {updateInput(input)}
	}

	function onChange(e: React.FormEvent<HTMLInputElement>) {
		updateInput(e.currentTarget.innerText.toUpperCase());
	}

	function toggle() {
		updateInstructionsOpen(!instructionsOpen);
	}

	return (
		<React.Fragment>
			<Modal isOpen={instructionsOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>Instructions</ModalHeader>
				<ModalBody>
					<Instructions/>
				</ModalBody>
			</Modal>
		<Container>
			<Jumbotron className="mt-4">
				<h1 className="display-4">Mario Level Generator!</h1>
				<p className="lead">This is a language for designing basic Mario Bros. levels.</p>
				<hr className="my-2" />
				<p>
					This project was built by&nbsp;
					<a target="_blank" href="https://github.com/Metroxe">Christopher Powroznik</a>,&nbsp;
					<a target="_blank" href="https://github.com/ksyeo1010">Kwangsoo Yeo</a>,&nbsp;
					<a target="_blank" href="https://github.com/zhaitongtong">Tongtong Zhai</a>,&nbsp;
					<a target="_blank" href="https://github.com/huanxinzzzz">Huanxin Zhang</a>, and&nbsp;
					<a target="_blank" href="https://github.com/kevin-jugg">Kevin Zhu</a>&nbsp;
					for <a target="_blank" href="https://www.students.cs.ubc.ca/~cs-410/2019w1/index.html">CPSC 410: Advanced Software Engineering</a>&nbsp;
				</p>
				<p className="lead">
					<Button color="primary" target="_blank" href="https://github.com/Metroxe/mario-level-language">Github</Button>
					<Button className="ml-1" color="primary" onClick={toggle}>Instructions</Button>
				</p>
			</Jumbotron>
			<Card className="mt-4">
				<CardBody>
					<ButtonGroup className="mb-3">
						<Button onClick={useMock(levels.examples.trim())}>Example</Button>
						<Button onClick={useMock(levels.level1_1.trim())}>Level 1-1</Button>
					</ButtonGroup>
					{/*<Input className="mb-3" type="textarea" name="text" id="codeEntry" value={input} onChange={onChange}/>*/}
					<TextEditor onChange={onChange} value={input}/>
					{
						errors.length > 0 && <Alert color="danger">
							{errors.map(createError)}
						</Alert>
					}
					<Button className="mr-1" onClick={getImage} disabled={loading} color="primary">
						{loading && <span className="mr-4"><Spinner size="sm" color="secondary"/></span>}
						Make Image
					</Button>
					{/*<Button color="primary" disabled={loading}>*/}
					{/*	{loading && <span className="mr-4"><Spinner size="sm" color="secondary"/></span>}*/}
					{/*	Make Video*/}
					{/*</Button>*/}
				</CardBody>
			</Card>
			{
				image &&
				<Card className="mt-4 mb-4">
					<CardImg src={image}/>
				</Card>
			}
		</Container>
		</React.Fragment>
	);
};

function createError({message, statement}: {message: string, statement: string}, i: number): JSX.Element {
	return <React.Fragment key={i + "_err"}><b>{statement}:</b> <p>{message}</p><hr/></React.Fragment>
}

export default App;
