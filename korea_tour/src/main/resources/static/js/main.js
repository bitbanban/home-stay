'use strict';

const btnSearch = document.getElementById('btnSearch');

btnSearch.addEventListener('click', e => {
  let keyword = document.querySelector('#searchBar').value;
  location.href = '/search?keyword=' + keyword;
});

const menuIcon = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.navbar');
menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('change');
  menuIcon.classList.toggle('change');
});
