const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const icon = document.querySelector('.right')
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    icon.innerHTML = ``
    const location = search.value;

    fetch(`weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            if (data.err){
                messageOne.textContent = `${data.err}`
            }
            else{
            messageOne.textContent = `${data.location}`
            messageTwo.textContent = `${data.forecast}`
            icon.innerHTML = `<img src="./icons/${data.icon}.png" alt="hey" width="100px" height="100px">`
            console.log(data.forecast);
            console.log(data.address);
        }
    })
    })
})