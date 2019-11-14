import React, {RefObject, useRef, useState} from 'react';
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
	InputGroup,
	InputGroupAddon,
	Jumbotron,
	Modal, ModalBody, ModalHeader,
	Spinner, UncontrolledTooltip
} from 'reactstrap';
import "./App.css";
import axios from "axios";
import {levels} from "shared";
import Instructions from "./instructions";
import FileDownload from 'js-file-download';
import TextEditor from "./TextEditor";
import {on} from "cluster";
import Grid from "./Grid";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { tsConstructorType } from '@babel/types';

const App: React.FC = () => {

	const [image, updateImage] = useState();
	const [input, updateInput] = useState('');
	const [errors, updateErrors] = useState([]);
	const [loading, updateLoading] = useState(false);
	const [grid, updateGrid] = useState(false);
	const [cord, updateCord] = useState({x: 0, y: 0});
	const [instructionsOpen, updateInstructionsOpen] = useState(false);
	// file managing part
	const [fileName, updateFileName] = useState('');
	const [fileOpen, updateFileOpen] = useState(false);
	const upload: RefObject<HTMLInputElement> = useRef(null);
	const [repoURL, updateRepoURL] = useState('');


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

	async function getZip() {
		updateLoading(true);
		try {
			const {data} = await axios.post(`${'production' === process.env.NODE_ENV ? "" : "http://localhost:8080"}/compile-zip`, {input}, {responseType: 'arraybuffer'});
			FileDownload(data, 'mario_level_language.zip');
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

	function createNew() {
		// empty string is not updated?
		updateInput(" ");
	}

	function toggle() {
		updateInstructionsOpen(!instructionsOpen);
	}

	function toggleFile() {
		updateFileOpen(!fileOpen)
	}

	function saveFile() {
		downloadFile(input, fileName);
		toggleFile();
	}

	function uploadFile(e: React.FormEvent<HTMLInputElement>) {
		if (!upload.current) {
			return;
		}
		upload.current.click();
	}

	function handleUploaded(e: React.FormEvent<HTMLInputElement>) {
		if (e.currentTarget.files === null) {
			return;
		}
		let file = e.currentTarget.files[0];
		let reader = new FileReader();
		reader.readAsText(file, 'UTF-8');
		reader.onload = (e) => {
			if (!e.target) {
				return;
			}
			if (!e.target.result) {
				return;
			}
			let text = e.target.result.toString();
			updateInput(text);

			updateFileName(file.name.slice(0, file.name.length - 3));
		}
	}

	function getRepoURL(e: React.FormEvent<HTMLInputElement>) {
		updateRepoURL(e.currentTarget.value);
	}

	return (
		<React.Fragment>
		<Container>
			<Modal isOpen={instructionsOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>Instructions</ModalHeader>
				<ModalBody>
					<Instructions/>
				</ModalBody>
			</Modal>
			<Jumbotron className="mt-4">
				<h1 className="display-4">Mario Level Generator!</h1>
				<p className="lead">This is a language for designing basic Mario Bros. levels.</p>
				<hr className="my-2" />
				<p>
					This project was built by&nbsp;
					<a target="_blank" href="https://github.com/Metroxe">Christopher Powroznik</a>,&nbsp;
					<a target="_blank" href="https://github.com/ksyeo1010">Kwangsoo Yeo</a>,&nbsp;
					<a target="_blank" href="https://github.com/zhaitongtong">Tongtong Zhai</a>&nbsp;
					<a target="_blank" href="https://github.com/huanxinzzzz">Huanxin Zhang</a>, and&nbsp;
					<a target="_blank" href="https://github.com/kevin-jugg">Kevin Zhu</a>&nbsp;
					for <a target="_blank" href="https://www.students.cs.ubc.ca/~cs-410/2019w1/index.html">CPSC 410: Advanced Software Engineering</a>&nbsp;
				</p>
				<p className="lead">
					<Button color="primary" target="_blank" href="https://github.com/Metroxe/mario-level-language">Github</Button>
					<Button className="ml-1" color="primary" onClick={toggle}>Instructions</Button>
				</p>
			</Jumbotron>
			<Tabs>
  				<TabList>
     				<Tab>DSL</Tab>
     				<Tab>VPL</Tab>
   				</TabList>
				<TabPanel>
					<Card className="mt-4">
						<CardBody>
							<div>
								<ButtonGroup className="mb-3">
									<Button onClick={useMock(levels.examples.trim())}>Example</Button>
									<Button onClick={useMock(levels.level1_1.trim())}>Level 1-1</Button>
								</ButtonGroup>
							</div>
							<div>
								<ButtonGroup className="mb-3">
									<Button onClick={createNew}>Clear</Button>
									<Button onClick={toggleFile}>Save</Button>
									<Button onClick={uploadFile}>Upload</Button>
								</ButtonGroup>
								<input ref={upload} onChange={handleUploaded} type='file' name='file' accept='.mm' hidden/>
							</div>
							<Modal isOpen={fileOpen} toggle={toggleFile}>
								<ModalHeader toggle={toggleFile}>Save file</ModalHeader>
								<ModalBody>
									<InputGroup>
										<Input name='text' placeholder='File Name' value={fileName} onChange={(e) => updateFileName(e.currentTarget.value)}/>
										<InputGroupAddon addonType='append'>
											<Button color='info' onClick={saveFile}>Save</Button>
										</InputGroupAddon>
									</InputGroup>
								</ModalBody>
							</Modal>
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
								<Button className="mr-1" onClick={getZip} disabled={loading} color="primary">
									{loading && <span className="mr-4"><Spinner size="sm" color="secondary"/></span>}
									Make Zip (This takes a really long time!)
								</Button>
							{
								image &&
								<Button className="mr-1" onClick={() => updateGrid(!grid)} color="primary">
									Toggle Grid
								</Button>

							}
							{grid && <p>x: {cord.x}, y: {cord.y}</p>}

							{/*<Button color="primary" disabled={loading}>*/}
							{/*	{loading && <span className="mr-4"><Spinner size="sm" color="secondary"/></span>}*/}
							{/*	Make Video*/}
							{/*</Button>*/}
						</CardBody>
					</Card>
					{
						image &&
						<Card className="mt-4 mb-4" style={{overflowX: 'scroll'}}>
							<Grid image={image} toggle={grid} updateCoordinates={updateCord}/>
							{/*<CardImg src={image} style={{width: 'fit-content'}}/>*/}
						</Card>
					}
				</TabPanel>
				<TabPanel>
					<form>
      				   <label htmlFor="repoURL">repoURL</label>
         				<input
         					type="text"
         					name="repoURL"
          					value={repoURL}
         					onChange={getRepoURL}
     				    />
     				</form>
				</TabPanel>
			</Tabs>
			
		</Container>
		</React.Fragment>
	);
};

function createError({message, statement}: {message: string, statement: string}, i: number): JSX.Element {
	return <React.Fragment key={i + "_err"}><b>{statement}:</b> <p>{message}</p><hr/></React.Fragment>
}

function downloadFile(input: string, fileName: string) {
	const element = document.createElement('a');
	const file = new Blob([input], {type: 'text/plain'});
	element.href = URL.createObjectURL(file);
	element.download = `${fileName}.mm`;
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

export default App;
