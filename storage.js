class Storage {

    static getSearchedUsersFromStorage() {
        // tüm kullanıcıları alma
        let users;
        if (localStorage.getItem('searched') === null) {
            users = []
        } else {
            users = JSON.parse(localStorage.getItem('searched'))
        }
        return users
    }

    static addSearchedUsertoStorage(username) {
        // kullanıcı ekle
        let users = this.getSearchedUsersFromStorage()

        // IndexOf
        if (users.indexOf(username) === -1) {
            users.push(username)
        }
        localStorage.setItem('searched', JSON.stringify(users))
    }

    static clearAllSearchedUsersFromStorage() {
        // tüm kullanıcıları sil
        localStorage.removeItem('searched')
    }
}