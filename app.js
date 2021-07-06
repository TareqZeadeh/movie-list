'use strict';


let parent1 = document.getElementById('renderdiv');
let table = document.createElement('table');
parent1.appendChild(table);
table.setAttribute('id','table');
console.log(table.id);
let rows = document.getElementById('table').rows.length;
console.log(rows);

let inforow = document.createElement('tr');
table.appendChild(inforow);

let imagename = document.createElement('th');
inforow.appendChild(imagename);
imagename.textContent = '# Image';

let moviename = document.createElement('th');
inforow.appendChild(moviename);
moviename.textContent = 'Name';

let movierelease = document.createElement('th');
inforow.appendChild(movierelease);
movierelease.textContent = 'Release';






function Movieslist(name, img, release) {
  this.name = name;
  this.img = img;
  this.releasetime = release;
  Movieslist.list.push(this);
  updatestorage();
}

Movieslist.list = [];

function updatestorage() {
  let liststring = JSON.stringify(Movieslist.list);
  localStorage.setItem('movielist', liststring);

}

function getlist() {
  let data = JSON.parse(localStorage.getItem('movielist')) || [];
  for (let i = 0; i < data.length; i++) {
    new Movieslist(data[i].name, data[i].img, data[i].releasetime);

  }
}

let container = document.getElementById('getting-movie-info');
container.addEventListener('submit', submitter);

function submitter(event) {
  event.preventDefault();
  let moviename = event.target.name.value;
  let imagename = event.target.imagename.value;
  //   imagename=imagename.toLowerCase();
  console.log(event.target.imagename.value);
  let time = event.target.Release.value;
  let newmovie = new Movieslist(moviename, imagename, time);
  updatestorage();
  newmovie.render();

}

let bottun= document.getElementById('clearls');
bottun.addEventListener('click', clearls);
function clearls() {
  if (rows !== 0) {
    for (let i = 1; i < rows.length; i++) {
      table.deleteRow(i);

    }
    localStorage.clear;

  }

}




Movieslist.prototype.render = function () {
  let movierow = document.createElement('tr');
  table.appendChild(movierow);

  let imagename = document.createElement('img');
  movierow.appendChild(imagename);
  //   imagename.src= ('img/'+this.img);
  imagename.setAttribute('src','img/'+this.img);
  let moviename = document.createElement('th');
  movierow.appendChild(moviename);
  moviename.textContent = this.name;

  let movierelease = document.createElement('th');
  movierow.appendChild(movierelease);
  movierelease.textContent = this.releasetime;


};



function cleartable() {
  if (rows !== 0)
  {
    for (let i = 1; i < rows.length; i++)
    {
      table.deleteRow(i);

    }


  }

}

function loadlist()
{
  getlist();
  cleartable();
  for (let i = 0; i < Movieslist.list.length; i++) {

    Movieslist.list[i].render();
  }

}
loadlist();
