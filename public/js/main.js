// const home = document.getElementById('home');

// const login = document.getElementById('login');
// const logout = document.getElementById('logout');
const search = document.querySelector('.form-class');

search.addEventListener('submit', async (e) => {
    e.preventDefault();
    const slug = (term) => {
        return term.replaceAll(/[^a-zA-Z0-9 ]/g, '').replaceAll(' ', '-').toLowerCase();
    };

    const search = slug(document.querySelector('.searchInput').value)
    const response = await fetch(`/gamesearch/${search}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace(`/gamesearch/${search}`)
    }
})

// home.addEventListener('click', async (e) => {
//     e.preventDefault();
//     // console.log("HOME");
//     const res = await fetch('/', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//     });
//     if (res.ok) {
//         document.location.replace('/');
//     }
// });

// login.addEventListener('click', async (e) => {
//     // console.log('LOGIN');
//     e.preventDefault();
//     const login = await fetch('/login', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//     });
//     if (login.ok) {
//         document.location.replace('/login');
//     }
// });

// const logOut = async () => {
//     const response = await fetch('/api/users/logout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         alert('logout successful!');
//     } else {
//         alert(response.statusText);
//     }
// };

// logout.addEventListener('click', logOut);