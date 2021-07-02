console.log('client side javascript is loaded');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            if (data.err){
                messageOne.textContent = `${data.err}`
            }
            else{
            messageOne.textContent = `${data.location}`
            messageTwo.textContent = `${data.forecast}`
            console.log(data.forecast);
            console.log(data.address);
        }
    })
    })
})