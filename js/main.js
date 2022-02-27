/**
 * Selectors
 */
const menu = document.querySelector('#menu')
const selectButton = document.querySelector('#select')
const closeButton = document.querySelector('#close-button')
const gameDisplay = document.querySelector('#game-display p')
const colorsContainer = document.querySelectorAll('.color-container')
const difficultySelections = document.querySelectorAll('.difficulty-selection')

/* --- */

let currentPoints = 0
let currentSelection = null

/**
 * Events
 */

/** loaded when page loads */
//generate random color when page loads

window.onload = () => {
  checkHover()
  difficultySelections.forEach((selection) => {
    if (selection.classList.contains('active')) {
      generateColor(selection.id)
    }
  })
}

/**Enable or Ignore hover on touch devices */
function checkHover() {
  let touchTime = 0

  function enableHover() {
    if (new Date() - touchTime < 500) return
    document.body.classList.add('hasHover')
  }

  function disableHover() {
    document.body.classList.remove('hasHover')
  }

  function updateTouchTime() {
    touchTime = new Date()
  }

  document.addEventListener('touchstart', updateTouchTime, true)
  document.addEventListener('touchstart', disableHover, true)
  document.addEventListener('mousemove', enableHover, true)

  enableHover()
}

/**Click events */

colorsContainer.forEach((colorContainer) => {
  colorContainer.addEventListener('click', (e) => {
    checkContainer(e.target.style.backgroundColor)
  })
})

difficultySelections.forEach((selection) => {
  selection.addEventListener('click', () => {
    if (selection.id != 1 && selection.id != 2) return alert('Working on it...')
    if (selection.classList.contains('active')) return
    for (let i = 0; i < difficultySelections.length; i++) {
      difficultySelections[i].classList.remove('active')
    }

    currentSelection = selection.id
    selection.classList.add('active')
    generateColor(currentSelection)
  })
})

//open/close menu
selectButton.addEventListener('click', () => {
  menu.classList.add('toggle')
})

closeButton.addEventListener('click', () => {
  menu.classList.remove('toggle')
})

/** FUNCTIONS */

//updates
const updateColorsContainer = (colors) => {
  for (let i = 0; i < 4; i++) {
    let randomColor = colors[Math.floor(Math.random() * colors.length)]
    document.querySelector(`#idColor${i + 1}`).style.backgroundColor =
      randomColor
    colors.splice(colors.indexOf(randomColor), 1)
  }
}
const updateDisplay = (color) => {
  gameDisplay.innerText = color
}

//----

const generateColor = (difficulty) => {
  switch (difficulty) {
    case '0':
      //easy - color name
      break
    case '1':
      // medium - rgb color
      let listRGB = generateRGBColors()
      let randomRGB = listRGB[Math.floor(Math.random() * listRGB.length)]
      updateDisplay(randomRGB)
      updateColorsContainer(listRGB)
      break
    case '2':
      console.log('hard difficulty selected')
      let listHexColors = generateHexColors()
      let randomHex =
        listHexColors[Math.floor(Math.random() * listHexColors.length)]
      updateDisplay(randomHex)
      updateColorsContainer(listHexColors)
      break
    default:
      alert('Invalid difficulty...')
  }
}

//name, rgb and hex

const generateRGBColors = () => {
  let rgbColors = []

  //generate 4 rgb colors
  for (let i = 0; i < 4; i++) {
    let red = Math.floor(Math.random() * 256)
    let green = Math.floor(Math.random() * 256)
    let blue = Math.floor(Math.random() * 256)
    rgbColors.push(`rgb(${red}, ${green}, ${blue})`)
  }

  return rgbColors
}

const generateHexColors = () => {
  let hexColors = []
  let hexChars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ]

  let hex = '#'

  for (let i = 0; i < 4; i++) {
    for (let i = 0; i < 6; i++) {
      hex += hexChars[Math.floor(Math.random() * hexChars.length)]
    }
    hexColors.push(hex)
    hex = '#'
  }

  return hexColors
}

//-----

const addPoints = () => {
  return ++currentPoints
}

const removePoints = () => {
  return --currentPoints
}
//---
const checkContainer = (containerColor) => {
  if (containerColor === gameDisplay.innerText.toLowerCase()) {
    let points = addPoints()
    checkPoints(points)
    //generate new color
    difficultySelections.forEach((selection) => {
      if (selection.classList.contains('active')) {
        generateColor(selection.id)
      }
    })
  } else {
    let points = removePoints()
    checkPoints(points)
  }
}

const checkPoints = (points) => {
  let maxPoints = 10

  if (points >= maxPoints) {
    document.querySelector('#points').innerText = points
    alert('Congratulations!')
    window.location.reload()
  } else if (points <= 0) {
    document.querySelector('#points').innerText = 0
    alert('You lose!')
    resetScreen()
  } else {
    document.querySelector('#points').innerText = points
  }
}

const resetScreen = () => {
  document.querySelector('#points').innerText = 0
  currentPoints = 0
  generateColor(currentSelection)
}
