import React, {RefObject, useRef, useState, useEffect} from 'react';
import {Popover, PopoverBody} from "reactstrap";

type Props = {
    image: string,
    toggle?: boolean,
    updateCoordinates?: Function
}

const Grid: React.FC<Props> = (props: Props) => {
    const root: RefObject<HTMLCanvasElement> = useRef(null);
    const [cord, updateCord] = useState({x: 0, y: 0});

    useEffect(() => {
        if (!root.current || !props.image) {
            return;
        }

        createImage(props.image, root.current);
    }, [props.image]);

    useEffect(() => {
        if (!root.current) {
            return;
        }
        let canvas = root.current;
        let context = canvas.getContext('2d')!;

        if (props.toggle) {
            drawBoard(context, canvas.width, canvas.height);
        } else {
            context.clearRect(0, 0, canvas.width, canvas.height);
            createImage(props.image, root.current);
        }
    }, [props.toggle]);

    function createImage(src: string, canvas: HTMLCanvasElement) {
        let image = new Image();
        image.src = src;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d');
            if (!context) {
                return;
            }
            context.drawImage(image, 0, 0);
            if (props.toggle) {
                drawBoard(context, canvas.width, canvas.height);
            }
        };
    }

    function drawBoard(context: CanvasRenderingContext2D, width: number, height: number) {
        for (let i = 0; i <= width; i += 16) {
            context.moveTo(i, 0);
            context.lineTo(i, height);
        }

        for (let i = 0; i <= height; i += 16) {
            context.moveTo(0, i);
            context.lineTo(width, i);
        }

        context.strokeStyle = "black";
        context.lineWidth = 0.5;
        context.stroke();
    }

    function getXandY(e: React.MouseEvent<HTMLCanvasElement>) {
        if (!root.current || !props.toggle || !props.updateCoordinates) {
            return;
        }
        e.persist();

        let parent = root.current.parentElement!;
        let canvasX = parent.offsetLeft;
        let canvasY = parent.offsetTop;
        let mouseX = e.pageX;
        let mouseY = e.pageY;
        let scrollX = parent.scrollLeft;

        let x = Math.floor((mouseX - canvasX + scrollX)/16);
        let y = Math.floor(Math.abs(mouseY - canvasY - root.current.height - 1)/16);
        props.updateCoordinates({x, y});
    }

    return (
        <canvas
            id="level"
            ref={root}
            style={{width: 'fit-content'}}
            onClick={getXandY}
        >
        </canvas>
    )
};

export default Grid;