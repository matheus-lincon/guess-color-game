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

let currentPoints = 1

/**
 * Events
 */

//

difficultySelections.forEach((selection) => {
  selection.addEventListener('click', () => {
    if (selection.id != 1) return alert('Working on it...')
    if (selection.classList.contains('active')) return
    for (let i = 0; i < difficultySelections.length; i++) {
      difficultySelections[i].classList.remove('active')
    }

    selection.classList.add('active')
    generateColor(selection.id)
  })
})

colorsContainer.forEach((colorContainer) => {
  colorContainer.addEventListener('click', (e) => {
    checkContainer(e.target.style.backgroundColor)
  })
})

//generate random color when page loads
window.onload = () => {
  difficultySelections.forEach((selection) => {
    if (selection.classList.contains('active')) {
      generateColor(selection.id)
    }
  })
}

//open/close menu
selectButton.addEventListener('click', () => {
  menu.classList.toggle('toggle')
})

closeButton.addEventListener('click', () => {
  menu.classList.toggle('toggle')
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

const addPoints = () => {
  //check if reached max points
  currentPoints++
  document.querySelector('#points').innerText = currentPoints

  return currentPoints
}

const removePoints = () => {
  currentPoints--
  document.querySelector('#points').innerText = currentPoints

  return currentPoints
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
    //generate new color
    difficultySelections.forEach((selection) => {
      if (selection.classList.contains('active')) {
        generateColor(selection.id)
      }
    })
  }
}

const checkPoints = (points) => {
  let maxPoints = 10

  if (points >= maxPoints) {
    alert('Congratulations!')
    window.location.reload()
  }
  if (points <= 0) {
    alert('You lose!')
    window.location.reload()
  }
}
/**
 * 1. Generate a random color based on difficulty
 *  - 0: easy (color name)
 *  - 1: medium (rgb color)
 *  - 2: hard (hex color)
 * 2. Difficulty starts with medium
 */
