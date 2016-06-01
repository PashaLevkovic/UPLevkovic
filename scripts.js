function Mess(message, user, date, id){
	this.message = message;
	this.user = user;
	this.date = date;
	this.changed = false;
	this.deleted = false;
 	this.id = id;
}
var messages = [];
var user = '';
function run(){
    var appContainer = document.getElementsByClassName('myClass')[0];
    appContainer.addEventListener('click', delegateClickEvent);
    appContainer.addEventListener('keydown', delegateKeyDownEvent);
    load();
}

function load(){
    if (localStorage.getItem('messages')) {
    user = localStorage.getItem('user');
    document.getElementsByClassName('userName')[0].value = user;
    messages = JSON.parse(localStorage.getItem('messages'));
    printArrMess();
  }
}

function printArrMess(){
    var items = document.getElementsByClassName('items')[0];
    for (var i = 0; i < messages.length; i++) {
    items.appendChild(createItem(messages[i]));
}
}

function yourID(){
    var date=Date.now();
    var random=Math.random()*Math.random();
    return Math.floor(date*random);
}
function delegateClickEvent(evtObj) {
    if(evtObj.type === 'click' && evtObj.target.classList.contains('send')){
        onAddButtonClick(evtObj);
    }
     if(evtObj.type === 'click' && evtObj.target.classList.contains('closeButton')){
        deleteMessage(evtObj);
    }
    if(evtObj.type === 'click' && evtObj.target.classList.contains('changeButton')){
        changeMessage(evtObj);
    }
}

function changeMessage(evtObj)
{
    var doText = document.getElementsByClassName('inputMessage')[0];
 if (doText.value.trim()) {
     var messID = evtObj.target.parentNode.parentNode.id;
     messages.forEach(function (item) {
    if (item.id == messID) {
      item.changed = true;
      item.message = doText.value;
    }
  });
     evtObj.target.parentNode.parentNode.childNodes[1].innerHTML = doText.value;
    doText.value = '';
    evtObj.target.parentNode.parentNode.childNodes[2].childNodes[2].innerHTML = 'Message was changed';
     setLocalStorage();
}
}


function deleteMessage(evtObj)
{
    var messID = evtObj.target.parentNode.parentNode.id;
     messages.forEach(function (item) {
    if (item.id == messID) {
      item.deleted = true;
      item.message = '';
    }
  });
    evtObj.target.parentNode.parentNode.childNodes[1].innerHTML = '';
    evtObj.target.parentNode.parentNode.childNodes[2].innerHTML = 'Message was deleted';
    setLocalStorage();
}
function delegateKeyDownEvent(evtObj){
    if(evtObj.type === 'keydown' && evtObj.target.classList.contains('inputMessage')){
        if (evtObj.keyCode == 13) {
            onAddButtonClick(evtObj);
        }
    }
    if(evtObj.type === 'keydown' && evtObj.target.classList.contains('inputName')){
        if (evtObj.keyCode == 13) {
            changeName(evtObj);
        }
    }
}

function changeName(){
    user = document.getElementsByClassName('inputName')[0].value;
    newName(user);
    document.getElementsByClassName('inputName')[0].value = '';
}

function newName(value){
    document.getElementsByClassName('userName')[0].value = value;
    localStorage.setItem('user', value);
}

function onAddButtonClick(){
    var text = document.getElementsByClassName('inputMessage')[0].value;
    addTo(text);
}

function addTo(value) {
    if(!value || value == '\n' )
    {
        return;
    }
    if(!document.getElementsByClassName('userName')[0].value){
        alert("Input name");
        return;
    }
    createDiv();
    var item = createItem(messages[messages.length - 1]);
    var items = document.getElementsByClassName('items')[0];
    items.appendChild(item);
    items.scrollTop += items.scrollHeight;
}
 
function createDiv()
{
	 var mesText = document.getElementsByClassName('inputMessage')[0].value;
	user = document.getElementsByClassName('userName')[0].value;
	document.getElementsByClassName('inputMessage')[0].value = '';
	var date = new Date();
	var d = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  	document.getElementsByClassName('inputMessage')[0].value = '';
  	messages.push(new Mess(mesText, user, d, yourID()));
  	setLocalStorage();
	
}

function setLocalStorage() {
  localStorage.setItem('messages', JSON.stringify(messages));
}

function createItem(message){
    var divItem = document.createElement('div');
    var name = document.createElement('div');
    var checkbox = document.createElement('div');
    var flag = document.createElement('div');
    var time = document.createElement('div');
    var closeButt = document.createElement('button');
    var changeButt = document.createElement('button');
    var deleted = document.createElement('div');
    var changed = document.createElement('div');
    var del = "X";
    var delFlag = "Message was deleted";
    var changeFlag = "Message was changed";
    var change = "Change";
    closeButt.classList.add('closeButton');
    changeButt.classList.add('changeButton');
    checkbox.classList.add('message');
    name.classList.add('yourNick');
    flag.classList.add('flags');
    time.classList.add('time');
    time.appendChild(document.createTextNode(message.date));
    divItem.classList.add('chat');
    divItem.setAttribute('id', message.id.toString());
    name.appendChild(document.createTextNode(message.user));
    name.appendChild(time);
    checkbox.appendChild(document.createTextNode(message.message));
    closeButt.appendChild(document.createTextNode(del));
    changeButt.appendChild(document.createTextNode(change));
    if(message.deleted == true)
    {
    deleted.classList.add('deletedFlag');
    deleted.appendChild(document.createTextNode(delFlag));
    flag.appendChild(deleted);
    divItem.appendChild(name);
    divItem.appendChild(checkbox);
    divItem.appendChild(flag);
    var line = document.createElement('hr');
    line.classList.add('line');
    divItem.appendChild(line);
    }
    else if(message.changed == true)
    {
    flag.appendChild(changeButt);
    flag.appendChild(closeButt);
    changed.classList.add('changedFlag');
    changed.appendChild(document.createTextNode(changeFlag));
    flag.appendChild(changed);
    divItem.appendChild(name);
    divItem.appendChild(checkbox);
    divItem.appendChild(flag);
    var line = document.createElement('hr');
    line.classList.add('line');
    divItem.appendChild(line);
    }
    else{
    flag.appendChild(changeButt);
    flag.appendChild(closeButt);
    flag.appendChild(deleted);
    divItem.appendChild(name);
    divItem.appendChild(checkbox);
    divItem.appendChild(flag);
    var line = document.createElement('hr');
    line.classList.add('line');
    divItem.appendChild(line);
    }
    return divItem;
}

