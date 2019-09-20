import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button, ButtonGroup, Card, CardBody, CardImg, Container, Input, Jumbotron, Spinner} from 'reactstrap';
import "./App.css";
import axios from "axios";
import {levels} from "shared";

const App: React.FC = () => {

	const [image, updateImage] = useState();
	const [input, updateInput] = useState(levels.examples.trim());
	const [errors, updateErrors] = useState([]);
	const [loading, updateLoading] = useState(false);


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
		updateInput(e.currentTarget.value);
	}

	return (
		<Container>
			<Jumbotron className="mt-4">
				<h1 className="display-4">Mario Level Generator!</h1>
				<p className="lead">Describe the project here</p>
				<hr className="my-2" />
				<p>Specify class and ubc stuff here</p>
				<p className="lead">
					<Button color="primary" onClick={getImage} lo>Github</Button>
				</p>
			</Jumbotron>
			<Card className="mt-4">
				<CardBody>
					<ButtonGroup className="mb-3">
						<Button onClick={useMock(levels.examples.trim())}>Example</Button>
						<Button onClick={useMock(levels.level1_1.trim())}>Level 1-1</Button>
					</ButtonGroup>
					<Input className="mb-3" type="textarea" name="text" id="codeEntry" value={input} onChange={onChange}/>
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
	);
};

function createError({message, statement}: {message: string, statement: string}, i: number): JSX.Element {
	return <React.Fragment key={i + "_err"}><b>{statement}:</b> <p>{message}</p><hr/></React.Fragment>
}

export default App;
