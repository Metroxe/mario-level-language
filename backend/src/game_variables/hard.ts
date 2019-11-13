const hardNames = ["HARD_ONE", "HARD_TWO"];

const hard1 =
`VAR ${hardNames[0]} [
(0,0)->(49,2) GROUND;
(4,3)->(44,3) DIAMOND_BRICK;
(5,4)->(43,4) DIAMOND_BRICK;
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