import React, {RefObject, useEffect, useRef, useState} from 'react';

type Props = {
    onChange(e: React.FormEvent<HTMLElement>): void,
    ref?: React.RefObject<HTMLDivElement>,
    disabled?: boolean,
    initialText?: string
};

const regex = new RegExp(/(#.*)|\b(PIPE|BUSH|GROUND|CLOUD|BRICK|QUESTION_MARK|FLAG|VAR)\b/g);

const TextEditor: React.FC<Props> = (props: Props) => {
    const root: RefObject<HTMLDivElement> = useRef(null);
    const [html, updateHtml] = useState('');
    const [text, updateText] = useState(props.initialText);
    const [caretPos, updateCaretPos] = useState(0);
    const [keyCode, updateKeyCode] = useState(0);

    useEffect(() => {
        if (!root.current) {
            return;
        }

        // sets offset after re rendering
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setOffset();
    }, [html]);

    useEffect(() => {
        if (!text) {
            return;
        }
        if (!text.length) {
            return;
        }
        
        // gets the offset before re rendering
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getOffset();

        // replace text to html
        let innerHTML = text.replace(regex, replaceToHTML);
        updateHtml(innerHTML);
    }, [text]);

    // update text here if changed by parent
    useEffect(() => {
        updateText(props.initialText);
    }, [props.initialText]);

    /**
     * Gets the offset given current caret position
     */
    function getOffset() {
        if (!root.current) {
            return;
        }
        let sel = window.getSelection();
        if (!sel) {
            return;
        }
        if (!sel.rangeCount) {
            return;
        }
        let range = sel.getRangeAt(0);
        let preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(root.current);
        preCaretRange.setEnd(range.startContainer, range.startOffset);
        let offset = preCaretRange.toString().length;
        // add one more length if enter key is pressed
        if (keyCode === 13) {
            offset++;
        }
        updateCaretPos(offset);
    }

    /**
     * Sets the offset given current values
     */
    function setOffset() {
        if (!root.current) {
            return;
        }
        let nodes = root.current.childNodes;
        if (!nodes.length) {
            return;
        }
        let values = selectNode(nodes[0], caretPos);
        const pos = values.pos;
        const offset = values.offset;

        let node = nodes[pos];
        try {
            let sel = window.getSelection();
            let range = document.createRange();
            if (node.nodeName === '#text') {
                range.setStart(node, offset);
                range.collapse(true);
                sel!.removeAllRanges();
                sel!.addRange(range);
            } else {
                range.setStart(node.childNodes[0], offset);
                range.collapse(true);
                sel!.removeAllRanges();
                sel!.addRange(range);
            }

        } catch (e) {
        }
    }

    /**
     * returns offset and pos given current caret position
     * @param node the first to handle offset and child pos
     * @param offset initial offset given by caret
     * @param pos the current child pos
     */
    function selectNode(node: Node, offset: number, pos: number = 0): {offset: number, pos: number} {
        if (node === null) {
            return {offset, pos};
        }
        if (node.textContent!.length >= offset) {
            return {offset, pos};
        }
        return selectNode(node.nextSibling!, offset - node.textContent!.length,pos + 1);
    }


    const onInput = (e: React.FormEvent<HTMLDivElement>) => {
        e.stopPropagation();
        updateText(e.currentTarget.innerText);
        // update parent
        props.onChange(e);
    };

    return (
        <div
            id='contentEditable'
            ref={root}
            contentEditable={props.disabled}
            dangerouslySetInnerHTML={{__html: html}}
            onInput={onInput}
            onKeyDown={(e) => updateKeyCode(e.keyCode)}
        >

        </div>
    )
};

const replaceToHTML = (string: string) => {
    if (string[0] === '#') {
        return `<span class="comment">${string}</span>`
    }
    let text = '';
    switch (string) {
        case 'PIPE':
            text = `<span class="pipe">PIPE</span>`;
            break;
        case 'BUSH':
            text = `<span class="bush">BUSH</span>`;
            break;
        case 'GROUND':
            text = `<span class="ground">GROUND</span>`;
            break;
        case 'CLOUD':
            text = `<span class="cloud">CLOUD</span>`;
            break;
        case 'BRICK':
            text = `<span class="brick">BRICK</span>`;
            break;
        case 'QUESTION_MARK':
            text = `<span class="question_mark">QUESTION_MARK</span>`;
            break;
        case 'FLAG':
            text = `<span class="flag">FLAG</span>`;
            break;
        case 'VAR':
            text = `<span class="var">VAR</span>`;
            break;
        default:
            text = string;
            break;
    }
    return text;
};

TextEditor.defaultProps = {
    disabled: true as boolean
};

export default TextEditor;