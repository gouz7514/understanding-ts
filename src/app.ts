const button = document.querySelector('button')!

function clickHandler(message: string) {
  console.log('clicked! ')
}

// comment
button.addEventListener('click', clickHandler.bind(null, "You're welcome!"))