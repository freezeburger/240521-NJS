

window.document.querySelector('#btn').onclick = async () => {
    const serverReponse = await fetch('/api/messages').then(res => res.text())
    feedback.innerText = serverReponse;
}


window.document.querySelector('#send').onclick = async () => {
    if (!text.value) return feedback.innerText = 'Value missing in field';

    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({text:text.value})
    }

    const serverReponse = await fetch('/api/messages', options ).then(res => res.text())
    feedback.innerText = serverReponse;
}