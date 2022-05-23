export async function fetchData () {
    let response = await fetch('https://angbur.github.io/booksShop/assets/data/books.json');
    let data = await response.json();
    return data;
  }