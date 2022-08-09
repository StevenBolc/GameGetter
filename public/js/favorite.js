document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('favorite')) {
        console.log(e.target);
        const response = await fetch(`/api/users/mylist/${e.target.getAttribute('data-id')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Post failed!')
        }
    }
})


// document.querySelector('.favorite').addEventListener('click', async (e) => {
//     e.preventDefault();
//     const response = await fetch(`/api/users/mylist/${e.target.getAttribute('data-id')}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     });
//     if (response.ok) {
//         document.location.replace('/dashboard');
//     } else {
//         alert('Post failed!')
//     }
// })
