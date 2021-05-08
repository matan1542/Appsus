'use strict'

export const addBookService = {
    // getResults
    query
}

const RESULTS_KEY = 'resultsDB'

function query(searchTxt) {
    const urlStr = searchTxt.split(" ").join('%20')
    const pmr = axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${urlStr}`)
        .then(res => res.data)
    return pmr
}
