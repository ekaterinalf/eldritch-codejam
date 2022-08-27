import ancientsData from './data/ancients.js'
import difficulties from './data/difficulties.js'
import {brownCards, blueCards, greenCards} from './data/mythicCards/index.js'

const ancientsContainer = document.querySelector('.ancients-container')
const difficultiesContainer = document.querySelector('.difficulties-container')
const deckContainer = document.querySelector('.deck-container')
let green = document.querySelectorAll('.green')
let brown = document.querySelectorAll('.brown')
let blue = document.querySelectorAll('.blue')
let lastCard = document.querySelector ('.last-card')


ancientsData.forEach(ancient => {
const img = document.createElement('img')
img.src = ancient.cardFace
img.classList.add(`ancient-card`, ancient.name)
ancientsContainer.appendChild(img)
})

difficulties.forEach(diff => {
  if(diff.id === 'normal') {
    const div = document.createElement('div')
    div.classList.add(`difficult`, diff.id)
    div.textContent = diff.name
    difficultiesContainer.appendChild(div)  
  }
})

const ancientsImg = document.querySelectorAll('.ancient-card')
const difficultDiv = document.querySelectorAll('.difficult')

const selectGame = {
  selectAncient : null,
  selectDifficult: null,
}

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('ancient-card')){
    ancientsImg.forEach(el => {
      if(el.classList.contains('active')) {
        el.classList.remove('active')
      }
    })
    e.target.classList.add('active')
    if(selectGame.selectAncient !== e.target.classList[1]){
      selectGame.selectAncient = e.target.classList[1]
      if(selectGame.selectAncient && selectGame.selectDifficult) {
        startGame()
        deckContainer.style.opacity = '1'
      }
    }
  }

  if(e.target.classList.contains('difficult')){
    difficultDiv.forEach(el => {
      if(el.classList.contains('active')) {
        el.classList.remove('active')
      }
    })
    e.target.classList.add('active')
    if(selectGame.selectDifficult !== e.target.classList[1]) {
      selectGame.selectDifficult = e.target.classList[1]
      if(selectGame.selectAncient && selectGame.selectDifficult) {
        startGame()
        deckContainer.style.opacity = '1'
      }
    }
  }
})

let koloda

function startGame () {
  lastCard.style.backgroundImage = 'none'
  let arrI
  ancientsData.forEach(ancient => {
    if(ancient.name === selectGame.selectAncient) {
      koloda = [[], [], []]
      for(let key in ancient.allCards){
        if(key === 'greenCards') {
          arrI = findRandomIndex(greenCards,ancient, key)
          arrI.forEach(a => koloda[0].push(greenCards[a]))
      } else if(key === 'brownCards') {
        arrI = findRandomIndex(brownCards,ancient, key)
        arrI.forEach(a => koloda[1].push(brownCards[a]))
      } else {
        arrI = findRandomIndex(blueCards,ancient, key)
        arrI.forEach(a => koloda[2].push(blueCards[a]))
      }
      }
    }
  })
  setDods(selectGame.selectAncient)
}

function findRandomIndex(colorCardData, ancient, key) {
  let random_start = 0
  let random_end = colorCardData.length - 1
  let arrayIndex = []
  let res = []
  for(let i=random_start;i<random_end;i++){
    arrayIndex.push(i)
  }
  for(let countCycles=0;countCycles<ancient.allCards[key];countCycles++){
    res.push(arrayIndex.splice(Math.random()*arrayIndex.length,1)[0])
  }
  return res
}

function setDods(selectAncient) {
  let mixKoloda = [[], [], []]
  
  
  ancientsData.forEach(ancient => {
    if(ancient.name === selectAncient) {
      let mixGreen1 = koloda[0].splice(0, ancient.firstStage.greenCards)
      let mixBrown1 = koloda[1].splice(0, ancient.firstStage.brownCards)
      let mixBlue1 = koloda[2].splice(0, ancient.firstStage.blueCards)

      mixKoloda[0].push(...mixGreen1, ...mixBrown1, ...mixBlue1)

      let mixGreen2 = koloda[0].splice(0, ancient.secondStage.greenCards)
      let mixBrown2 = koloda[1].splice(0, ancient.secondStage.brownCards)
      let mixBlue2 = koloda[2].splice(0, ancient.secondStage.blueCards)

      mixKoloda[1].push(...mixGreen2, ...mixBrown2, ...mixBlue2)

      let mixGreen3 = koloda[0].splice(0, ancient.thirdStage.greenCards)
      let mixBrown3 = koloda[1].splice(0, ancient.thirdStage.brownCards)
      let mixBlue3 = koloda[2].splice(0, ancient.thirdStage.blueCards)

      mixKoloda[2].push(...mixGreen3, ...mixBrown3, ...mixBlue3)

      for(let i = 0; i < mixKoloda.length; i++){
        let g = 0
        let br = 0
        let bl =0
        for(let j = 0; j < mixKoloda[i].length; j++) {
          mixKoloda[i][j].color === 'green'
          ? g++
          : mixKoloda[i][j].color === 'brown'
          ? br++
          : bl++
        }
        green[i].textContent = g
        brown[i].textContent = br
        blue[i].textContent = bl
      }
    }
  })

  let mix1 = [...mixKoloda[0]].sort(() => Math.random() - 0.5)
  let mix2 = [...mixKoloda[1]].sort(() => Math.random() - 0.5)
  let mix3 = [...mixKoloda[2]].sort(() => Math.random() - 0.5)

  document.querySelector('.deck').addEventListener('click', () => {
    if(mix1.length) {
      let pop = mix1.pop()
      lastCard.style.backgroundImage = `url(${pop.cardFace})`
      if(pop.color === 'green') green[0].textContent = +green[0].textContent - 1
      if(pop.color === 'brown') brown[0].textContent = +brown[0].textContent - 1
      if(pop.color === 'blue') blue[0].textContent = +blue[0].textContent - 1
    } else if(mix2.length) {
      let pop = mix2.pop()
      lastCard.style.backgroundImage = `url(${pop.cardFace})`
      if(pop.color === 'green') green[1].textContent = +green[1].textContent - 1
      if(pop.color === 'brown') brown[1].textContent = +brown[1].textContent - 1
      if(pop.color === 'blue') blue[1].textContent = +blue[1].textContent - 1
    } else {
      let pop = mix3.pop()
      lastCard.style.backgroundImage = `url(${pop.cardFace})`
      if(pop.color === 'green') green[2].textContent = +green[2].textContent - 1
      if(pop.color === 'brown') brown[2].textContent = +brown[2].textContent - 1
      if(pop.color === 'blue') blue[2].textContent = +blue[2].textContent - 1
    }
  })
  }

