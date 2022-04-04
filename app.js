const githubForm = document.getElementById('github-form')
const nameInput = document.getElementById('githubname')
const clearLastUsers = document.getElementById('clear-last-users')
const lastUsers = document.getElementById('last-users')
const github = new Github()
const ui = new UI()
eventListener()

function eventListener() {
    githubForm.addEventListener('submit', getData)
    clearLastUsers.addEventListener('click', clearAllSearched)
    document.addEventListener('DOMContentLoaded', getAllSearched)
}

function getData(e) {
    e.preventDefault()
    let username = nameInput.value.trim()
    if (username === '') alert('Geçerli bir kullanıcı adı girin!')
    else {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === 'Not Found') {
                    // hata mesajı
                    ui.showError('Kullanıcı Bulunamadı!')
                } else {
                    ui.addSearchedUserToUi(username)
                    Storage.addSearchedUsertoStorage(username)
                    ui.showUserInfo(response.user)
                    ui.showRepoInfo(response.repo)
                }
            })
            .catch(err => ui.showError(err))
    }
    ui.clearInput()

}

function clearAllSearched() {
    // tüm aramaları temizleme
    if (confirm('Emin misiniz?')) {
        // silme işlemleri
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUi();
    }
}

function getAllSearched() {
    // arananları storage'dan alıp ui ekleme
    let users = Storage.getSearchedUsersFromStorage()

    let result = ''
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`
    });
    lastUsers.innerHTML = result
}