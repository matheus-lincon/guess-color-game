const menu = document.querySelector('#menu')
const selectButton = document.querySelector('#select')
const closeButton = document.querySelector('#close-button')
/**
 * Events
 */

/** Open/Close menu */
selectButton.addEventListener('click', () => {
  menu.classList.toggle('toggle')
})

closeButton.addEventListener('click', () => {
  menu.classList.toggle('toggle')
})
