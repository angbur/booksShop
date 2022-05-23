export async function fetchData () {
    let response = await fetch('../assets/data/books.json');
    let data = await response.json();
    return data;
  }