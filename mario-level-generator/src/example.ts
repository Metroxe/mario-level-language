import {IElement, Sprite} from "shared";


export let testElements = [

];

export function createGround() {
    for (let i = 0; i < 200; i++) {
        let element: IElement = {
            x: i,
            y: 10,
            sprite: Sprite.GROUND
        };
        testElements.push(element);
    }
}
