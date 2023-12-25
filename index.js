//! @osmaav script for v5.x.x
///#35 Вынес все созданные мной переменные и функции в отдельный файл scripts.js

///#5 #42 изменил глобальную переменную для сохранения текущей позиции списка зон
var dev_lst_cur_z_idx = 0

/*
#46 создал глобальные переменные для:
 сохранения выбранного устройства в списке на странице Приборы
*/
var cur_dev = null
/*
сохранения выбранного АУ в списке на странице Приборы
*/
var span_click = null

///#50 текущее положение прокрутки списка приборов
var dev_lst_scroll_Top = 0

//#39 Подключаю файл стилей styles-mac.css если обнаружена MacOS
function loadstyle() {
  if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgentData.platform)) {
    document.head.innerHTML += '<link rel="stylesheet" href="styles-mac.css">'
  }
}

///#4 add addEventListener beforeunload
window.addEventListener('beforeunload', function (e) {
  ;(e || window.event).returnValue = {}
  return {}
})

///#9 обновляю список приборов
function updateDeviceList(o) {
  o.Vars.configPage.configMenu.listItemsRefresh(
    o.Vars.configPage.configMenu.configMenuActiveItem.name,
  )
}

/*
#10 #23
#42 Создал функцию scrollZoneListAndClickCurrentZone для выбора Зоны/ Группы зон/Контроллера после создания/сохранения/удаления и клика по ней/нему для выделения и последующего редактирования.
*/
function scrollZoneListAndClickCurrentZone() {
  try {
    // прокручиваю список на зону чтобы текущая зона была на экране
    let el = document.querySelector('ul.device-list')
    let list = document.querySelectorAll('ul.device-list li')
    el.scrollTop = Math.floor((el.scrollHeight / list.length) * (dev_lst_cur_z_idx - 4))
    // генерирую событие клика мыши в списке зон для ее выделения и отображения свойств
    list[dev_lst_cur_z_idx].children[0].click()
  } catch (e) {}
}

///#10.1 прокручиваю окно до верха
function scrollWindowTop() {
  document.querySelector('#content').scroll(0, 0)
}

///#11 вывожу сообщение в шапку
function printMessageInHead(message = '') {
  document.getElementById('savetodevice').innerHTML =
    '<span id="myblinkmessage">' + message + '</span>'
}

///#14 создаю функцию для замены местами узлов заданных селекторами
function nodeChange(firstNodeName = null, secondNodeName = '.actions') {
  try {
    let firstNode = document.querySelector(firstNodeName)
    let secondNode = document.querySelector(secondNodeName)
    let container = firstNode.parentNode
    container.insertBefore(secondNode, firstNode)
  } catch (e) {}
}

/*
///#43 @osmaav окрашиваю АУ на вкладке Приборы:
выходы - зеленый,
BTM - красный
*/
function colorize_au_list() {
  try {
    if (document.querySelector('li.device.active') != null) {
      document.querySelectorAll('span.tname_type').forEach((e) => {
        if (e.parentNode.textContent.includes('[Выход]'))
          e.parentNode.setAttribute('style', 'color:green !important;')
        if (e.parentNode.textContent.includes('BTM'))
          e.parentNode.setAttribute('style', 'color:red !important;')
      })
    }
  } catch {}
}

/*
///#41 @osmaav на странице Приборы окрашиваю устройства:
КДЛ - красный
КПБ - зеленый
БКИ - зеленый
РИП, МИП - пурпурный
ПП - фиолетовый
РУПОР - синий
*/
function colorize_dev_list() {
  try {
    if (document.querySelector('li.device.active') != null) {
      document.querySelectorAll('span.device_type').forEach((e) => {
        if (e.textContent.includes('КДЛ')) e.setAttribute('style', 'color:red !important;')
        if (e.textContent.includes('КПБ')) e.setAttribute('style', 'color:green !important;')
        if (e.textContent.includes('БКИ')) e.setAttribute('style', 'color:orange !important;')
        if (e.textContent.includes('РИП') || e.textContent.includes('МИП'))
          e.setAttribute('style', 'color:purple !important;')
        if (e.textContent.includes('ПП')) e.setAttribute('style', 'color:blueviolet !important;')
      })
    }
  } catch {}
}
