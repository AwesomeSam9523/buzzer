const socket = io()
const active = document.querySelector('.js-active')
const buzzList = document.querySelector('.js-buzzes')
const clear = document.querySelector('.js-clear')
const lock = document.querySelector('.js-lock')
let locked = true;
socket.on('active', (numberActive) => {
  active.innerText = `${numberActive} joined`
})

socket.on('buzzes', (buzzes) => {
  buzzList.innerHTML = buzzes
    .map(buzz => {
      const p = buzz.split('-')
      return { name: p[0], team: p[1] }
    })
    .map(user => `<li>${user.name} on Team ${user.team}</li>`)
    .join('')
})

clear.addEventListener('click', () => {
  socket.emit('clear')
})

lock.addEventListener('click', () => {
  locked = !locked;
  socket.emit('lock', locked);
  lock.innerText = locked ? 'Unlock Buzzers 🔓' : 'Lock Buzzers 🔒';
});

