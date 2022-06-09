import { createElement } from "../../helpers/domHelper"
import { showModal } from "./modal"


export function showWinnerModal(fighter) {
    // call showModal function 
    const reset = createElement({
        tagName: 'button',
        attributes: { id: 'reset'}
    })
    reset.addEventListener('click',()=>{
      document.location.reload()
    })
    reset.innerText = 'reset'
    showModal({ title: `${fighter.name} is Winner!`, bodyElement: reset })
}