const easyNames = ["EASY_ONE", "EASY_TWO"];

const easy1 =
`VAR ${easyNames[0]} [
(0,0)->(49,2) GROUND;
(4,3)->(44,3) DIAMOND_BRICK;
(5,4)->(43,4) DIAMOND_BRICK;
];`;

const easy2 =
`VAR ${easyNames[1]} [
(0,0)->(49,0) GROUND;
(0,1)->(4,2) GROUND;
(5,1) GROUND;
(45,1)->(49,2) GROUND;
(44,1) GROUND;
];`;

export {easy1, easy2, easyNames}