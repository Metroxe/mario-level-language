const hardNames = ["HARD_ONE", "HARD_TWO"];

const hard1 =
`VAR ${hardNames[0]} [
(0,0)->(4,2) GROUND;
(0,0)->(4,2) GROUND;
(5,0) PIPE 4;
(7,0) PIPE 6;
(13,0) PIPE 8;
(15,0) PIPE 10;
(21,0) PIPE 12;
(23,0) PIPE 14;
(25,0) PIPE 14;
(27,0) PIPE 14;
(20,8) QUESTION_MARK;
(45, 7) QUESTION_MARK;
(19,4)->(20,4) BRICK;
(36,10) CLOUD 2;
(25,16) CLOUD 1;
(3,12) CLOUD 2;
(45,0)->(49,2) GROUND;
];`;

const hard2 =
`VAR ${hardNames[1]} [
(0,0)->(49,0) GROUND;
(0,1)->(4,2) GROUND;
(5,1) GROUND;
(45,1)->(49,2) GROUND;
(44,1) GROUND;
];`;

export {hard1, hard2, hardNames}