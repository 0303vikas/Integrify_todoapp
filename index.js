var itemList = []  //saved data type object

const newToDO = document.getElementById('add-btn')
newToDO.addEventListener('click', createForm)

function createForm() { 
    if(document.getElementById('form') != undefined) return

    let displayArea = document.getElementById('display-area')
    if(displayArea) {
        displayArea.innerHTML = ''
    }   

    let form = document.createElement('form')
    form.setAttribute('id', 'form')    
    form.setAttribute('onsubmit', 'return false')
    document.body.insertBefore(form,document.getElementById('display-area'))

    let Input1 = document.createElement('input')
    Input1.setAttribute('type', 'text')
    Input1.setAttribute('name', 'title')
    Input1.setAttribute('id', 'title')
    Input1.setAttribute('placeholder', 'Input title here...')
    Input1.setAttribute('required', 'true')
    form.appendChild(Input1)    

    let Input2 = document.createElement('input')
    Input2.setAttribute('type', 'date')
    Input2.setAttribute('name', 'date')
    Input2.setAttribute('id', 'date')
    Input2.setAttribute('placeholder', 'dd.mm.yyyy')
    Input2.setAttribute('required', 'true')
    form.appendChild(Input2)

    let Input3 = document.createElement('select')
    Input3.setAttribute('name', 'list')
    Input3.setAttribute('id', 'list')
    Input3.setAttribute('required', 'true')
    form.appendChild(Input3)   

    let Input3Option1 = document.createElement('option')
    Input3Option1.setAttribute('value', 'Not Started')
    Input3Option1.appendChild(document.createTextNode('Not Started'))
    document.getElementById('list').appendChild(Input3Option1)

    let Input3Option2 = document.createElement('option')
    Input3Option2.setAttribute('value', 'In Progress')
    Input3Option2.appendChild(document.createTextNode('In Progress'))
    document.getElementById('list').appendChild(Input3Option2)

    let Input3Option3 = document.createElement('option')
    Input3Option3.setAttribute('value', 'Done')
    Input3Option3.appendChild(document.createTextNode('Done'))
    document.getElementById('list').appendChild(Input3Option3)

    let submitBtn = document.createElement('button')
    submitBtn.setAttribute('type','button')
    submitBtn.setAttribute('id','submit-btn')
    submitBtn.setAttribute('value', 'Confirm')
    submitBtn.innerHTML = 'Confirm'
    form.appendChild(submitBtn)

    submitBtn.addEventListener('click', saveNote)   

}

function saveNote() { 

    let title = document.getElementById('title').value
    let duplicateValue = checkDuplicateTitle(title)
    
    if(duplicateValue) return
    let date = document.getElementById('date').value
    let list = document.getElementById('list').value

    let item = {
        id: itemList.length + 1,
        title: title,
        date: date,
        list: list,
    }

    itemList.push(item)
    
    updateCounter(item.id)
    deleteForm()

    
    displayTask()
} 

function checkDuplicateTitle(title) { 
    return itemList.find(x => x.title === title)
}


function deleteForm() {
    console.log('delete form')
    if(document.getElementById('form') == undefined) return
    document.getElementById('form').remove()
}




// adding tasks 

function displayTask() {
    let area = document.getElementById('display-area')
    if(itemList.length === 0) return

    itemList.forEach(item => {
        let listItem = document.createElement('li')
        listItem.setAttribute('id', item.id)
        area.appendChild(listItem)

        let dispalyDiv = document.createElement('div')
        listItem.appendChild(dispalyDiv)

        let displayTitle = document.createElement('p')
        displayTitle.innerText = `${item.list} ${ item.title}`
        dispalyDiv.appendChild(displayTitle)

        let displayDate = document.createElement('p')
        displayDate.innerText = `Deadline: ${item.date}`
        dispalyDiv.appendChild(displayDate)
        
        let editBtn = document.createElement('button')
        editBtn.setAttribute('type','button')
        editBtn.setAttribute('id', 'edit-btn')
        editBtn.setAttribute('value', 'Edit')
        editBtn.innerHTML = 'Edit'
        dispalyDiv.appendChild(editBtn)

        editBtn.addEventListener('click', function (){
            editForm(item.id -1)
        })

        
    })    
}

function editForm(id) {

    let displayArea = document.getElementById('display-area')
    if(displayArea) {
        displayArea.innerHTML = ''
    }   

    let form = document.createElement('form')
    form.setAttribute('id', 'form')    
    form.setAttribute('onsubmit', 'return false')
    document.body.insertBefore(form,document.getElementById('display-area'))

    let Input1 = document.createElement('input')
    Input1.setAttribute('type', 'text')
    Input1.setAttribute('name', 'title')
    Input1.setAttribute('id', 'title')
    Input1.value = `${itemList[id].title}`
    Input1.setAttribute('required', 'true')
    form.appendChild(Input1)    

    let Input2 = document.createElement('input')
    Input2.setAttribute('type', 'date')
    Input2.setAttribute('name', 'date')
    Input2.value= `${itemList[id].date}`
    Input2.setAttribute('placeholder', 'dd.mm.yyyy')
    Input2.setAttribute('required', 'true')
    form.appendChild(Input2)

    let Input3 = document.createElement('select')
    Input3.setAttribute('name', 'list')
    Input3.setAttribute('id', 'list')
    Input3.innerText= `${itemList[id].list}`
    Input3.setAttribute('required', 'true')
    form.appendChild(Input3)   

    let Input3Option1 = document.createElement('option')
    Input3Option1.setAttribute('value', 'Not Started')
    Input3Option1.appendChild(document.createTextNode('Not Started'))
    document.getElementById('list').appendChild(Input3Option1)

    let Input3Option2 = document.createElement('option')
    Input3Option2.setAttribute('value', 'In Progress')
    Input3Option2.appendChild(document.createTextNode('In Progress'))
    document.getElementById('list').appendChild(Input3Option2)

    let Input3Option3 = document.createElement('option')
    Input3Option3.setAttribute('value', 'Done')
    Input3Option3.appendChild(document.createTextNode('Done'))
    document.getElementById('list').appendChild(Input3Option3)

    let editBtn = document.createElement('button')
    editBtn.setAttribute('type','button')
    editBtn.setAttribute('id','edit-btn')
    editBtn.setAttribute('value', 'Edit')
    editBtn.innerHTML = 'Edit'
    form.appendChild(editBtn)

    editBtn.addEventListener('click', function (){

        let title = document.getElementById('title').value
        let duplicateValue = checkDuplicateTitle(title)
        if(duplicateValue) return

        let date = document.getElementById('date').value
        let list = document.getElementById('list').value

        itemList[id].title = title
        itemList[id].date = date
        itemList[id].list = list 

        deleteForm()
        displayTask()
    })



}

function updateCounter(count) {

    document.getElementById('counter-para').innerHTML= '' 

 
    document.getElementById('counter-para').innerText = `You have ${count} tasks` 

}

const clearbtn = document.getElementById('clear-btn')
clearbtn.addEventListener('click', clearTasks)

function clearTasks() {

    let displayArea = document.getElementById('display-area')
    if(displayArea) {
        displayArea.innerHTML = ''
    }
    itemList = []
    updateCounter(0)

}








