import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  // todo: show fighter info (image, name, health, etc.)
  if(fighter){
    const character = createElement({
      tagName:"div",
      attributes:{style:"color:white;"}
    })
    for(const [key,value] of Object.entries(fighter)){
      const span = createElement({
        tagName:'span'
      })
      const arr = ['name', 'health','attack', 'defense' ]
      if(arr.includes(key)){
        span.innerText = `${key} : ${value} \n`
        character.append(span)
      }

    }
    const fighterImage = createFighterImage(fighter)
    fighterElement.append(fighterImage,character)
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
