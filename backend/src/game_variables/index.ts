import {easy1, easy2} from "./easy";
import {hard1, hard2} from "./hard";
import start from "./start";
import end from "./end";

const gameVariables =
`
# variables for use in compiling the game worlds
# easy
${easy1}

${easy2}

# hard parts
${hard1}

${hard2}

# start
${start}

# end
${end}
`;

export default gameVariables;