function resetBooks(){
    let name
    let img
    for(let i=0; i<5; i++){
        name = document.getElementById('title' + (i+1))
        img = document.getElementById('image' + (i+1))

        name.textContent = ' '
        img.src = ' '
    }
    searchBook()
}


function searchBook(){
    let input = document.getElementById('titleInput').value
    let titleArray = input.split(' ')
    let title = ''
    let name 
    let img
    let num = document.getElementById('number').value

    for(let i=0; i<titleArray.length; i++){
        if(i < titleArray.length - 1)
            title += titleArray[i] + '+'
        else
            title += titleArray[i] 
    }

    let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=AIzaSyD5E0mgdrtXfXApmcocdISbG_2ErWHZIM4&fields=items/volumeInfo(title,imageLinks/thumbnail)&maxResults=5&filter=partial`
    console.log(url)
    let titleText;
    let imgSrc;
    axios.get(url).then((result) => {
        console.log(result)
        for(let i=0; i<num; i++){
            titleText = result.data.items[i].volumeInfo.title
            name = document.getElementById('title' + (i+1))
            name.textContent = titleText;
            img = document.getElementById('image' + (i+1))
            if(result.data.items[i].volumeInfo.imageLinks != undefined){
                imgSrc = result.data.items[i].volumeInfo.imageLinks.thumbnail
                img.src = imgSrc;
            }
            else{
                img.src = "https://books.google.com.br/googlebooks/images/no_cover_thumb.gif"
            }
        }

    })
}