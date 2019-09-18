import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, CardBody, CardImg, Container, Input, Jumbotron} from 'reactstrap';
import "./App.css";

const App: React.FC = () => {

	const [image, updateImage] = useState(null);

	return (
		<Container>
			<Jumbotron className="mt-4">
				<h1 className="display-4">Mario Level Generator!</h1>
				<p className="lead">Describe the project here</p>
				<hr className="my-2" />
				<p>Specify class and ubc stuff here</p>
				<p className="lead">
					<Button color="primary">Github</Button>
				</p>
			</Jumbotron>
			<Card className="mt-4">
				<CardBody>
					<Input className="mb-3" type="textarea" name="text" id="codeEntry" />
					<Button className="mr-1">Make Image</Button>
					<Button>Make Video</Button>
				</CardBody>
			</Card>
			{
				image &&
				<Card className="mt-4">
					<CardImg/>
				</Card>
			}

		</Container>
	);
};

export default App;
