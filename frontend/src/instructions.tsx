import React from "react";
import {SpriteCommand} from "shared";

const Instructions: React.FC = () => {
	return (
		<React.Fragment>
			<h4>Commands</h4>
			<h5>Placement</h5>
			<p>
				You can place an object at any valid coordinate. You may place any sprite, but some have special properties (described later) as shown below...
				<ul>
					<li><code>{SpriteCommand.GROUND}</code></li>
					<li><code>{SpriteCommand.QUESTION_MARK}</code></li>
					<li><code>{SpriteCommand.BRICK}</code></li>
					<li><code>{SpriteCommand.DIAMOND_BRICK}</code></li>
					<li><code>{SpriteCommand.PIPE}</code></li>
					<li><code>{SpriteCommand.CLOUD}</code></li>
					<li><code>{SpriteCommand.BUSH}</code></li>
					<li><code>{SpriteCommand.FLAG}</code></li>
				</ul>
			</p>
			<h6>Example</h6>
			<code>
				# PLACE AN OBJECT<br/>
				(16,10) QUESTION_MARK;
			</code>
			<p><b>Note:</b> After you create an image, you can click on the toggle grid button. After you click on it, it will show a grid system. If you click on a square given the grid, it will print the x and y coordinates below the toggle button. This will help you get the coordinates without counting squares.</p>
			<hr/>

			<h5>Drawing</h5>
			<p>
				You can draw a sprite from one coordinate to another. This can be specified by writing an arrow between 2 coordinates.
				You may only draw the following sprites...
				<ul>
					<li><code>{SpriteCommand.GROUND}</code></li>
					<li><code>{SpriteCommand.QUESTION_MARK}</code></li>
					<li><code>{SpriteCommand.BRICK}</code></li>
					<li><code>{SpriteCommand.DIAMOND_BRICK}</code></li>
				</ul>
			</p>
			<h6>Example</h6>
			<code>
				# BOX DRAW EXAMPLE<br/>
				(0,20)->(100,22) GROUND;
			</code>
			<hr/>

			<h5>Pipes</h5>
			<p>
				You drawing a pipe is similar to a placement, instead you specify the coordinate of the bottom left. The number at the end specifies the height you want the pipe.
			</p>
			<h6>Example</h6>
			<code>
				# PIPE EXAMPLE<br/>
				# COORD OF BOTTOM LEFT AND HEIGHT<br/>
				(3,19) PIPE 4;
			</code>
			<hr/>

			<h5>Flag Pole</h5>
			<p>
				You simply specify the bottom of where you want the flag. Otherwise exactly the same as a placement command.
			</p>
			<h6>Example</h6>
			<code>
				# FLAG POLE EXAMPLE<br/>
				# COORD OF BOTTOM<br/>
				(50,3) FLAG;
			</code>
			<hr/>

			<h5>Scenery</h5>
			<p>
				Places a repeatable element in the background. The number added on to the end specifies how many times you want the element to repeat.
			</p>
			<h6>Example</h6>
			<code>
				# SCENERY<br/>
				# COORD OF BOTTOM LEFT<br/>
				(6,5) CLOUD 3;<br/>
				(6,20) BUSH 2;<br/>
			</code>
			<hr/>

			<h4>Variables</h4>
			<p>variables allow you to combine together placement commands and move them around the map. This works by declaring a variable as so...</p>
			<code>
				VAR INITIAL_PLATFORM [<br/>
				(0,4) BRICK;<br/>
				(1,4) QUESTION_MARK;<br/>
				(2,4) BRICK;<br/>
				(3,4) QUESTION_MARK;<br/>
				(4,4) BRICK;<br/>
				(5,0) QUESTION_MARK;<br/>
				];<br/>
			</code>
			<p>All of of these coordinates are relative to itself. To move this variable around the map, you may now indicate a coordinate like a simple placement command.</p>
			<code>
				(20,6) INITIAL_PLATFORM;
			</code>

		</React.Fragment>
	)
};

export default Instructions;