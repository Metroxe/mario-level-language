const easyNames = ["THE_TRAP", "THE_GROTTO"];

const easy1 =
`VAR ${easyNames[0]} [
(0,0)->(29,2) GROUND;
(4,3)->(29,3) DIAMOND_BRICK;
(5,4)->(29,4) DIAMOND_BRICK;
(10,8)->(29,8) BRICK;
(30,8) QUESTION_MARK;
(31,0) PIPE 8;
(33,0)->(49,2) GROUND;
(40,7)->(41,7) BRICK;
(42,7) QUESTION_MARK;
(43,7) BRICK;
(40,3) BUSH 2;
(25,14) CLOUD 2;
];`;

const easy2 =
`VAR ${easyNames[1]} [
(0,0)->(49,0) GROUND;
(0,1)->(4,2) GROUND;
(5,1) GROUND;
(45,1)->(49,2) GROUND;
(44,1) GROUND;
(29,1) PIPE 4;
(31,4) QUESTION_MARK;
(31,4) QUESTION_MARK;
(6,6) QUESTION_MARK;
(16,4)->(17,4) BRICK;
(18,4) QUESTION_MARK;
(7,6)->(14,6) DIAMOND_BRICK;
(36,10) CLOUD 1;
(16,1) BUSH 2;
];`;

export {easy1, easy2, easyNames}