let KEY = 'bd9b05bcbcf8802aa3c7a87ab30a46d7';
let URL = 'https://narainfo.com/api';

export class Common {
    async getApiData(URL) {
        try {
            let response = await fetch(URL);
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

    getLogin(USER_ID, PASSWORD) {
        let URLS = URL + '/login.php?key=' + KEY + '&userId=' + USER_ID + '&userPw=' + PASSWORD;
        return this.getApiData(URLS);
    }
}