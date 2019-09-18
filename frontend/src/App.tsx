import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, CardBody, CardImg, Container, Input, Jumbotron} from 'reactstrap';
import "./App.css";
import axios from "axios";

const App: React.FC = () => {

	const [image, updateImage] = useState();
	const [input, updateInput] = useState("");


	async function getImage() {
		try {
			const {data} = await axios.post("/compile", {input});
			updateImage(data);
		} catch (err) {
			alert("There was an error, check the console");
			console.log(err);
		}
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
					<Button color="primary" onClick={getImage}>Github</Button>
				</p>
			</Jumbotron>
			<Card className="mt-4">
				<CardBody>
					<Input className="mb-3" type="textarea" name="text" id="codeEntry" value={input} onChange={onChange}/>
					<Button className="mr-1" onClick={getImage}>Make Image</Button>
					<Button>Make Video</Button>
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

export default App;
