import translateArr from '../lang.json'
const langHolder = document.querySelector('.lang-holder')
const langsArr = ['en', 'ru', 'ua']
let selectLang = 'en'

selectLang = localStorage.getItem('lang')
if (!langsArr.includes(selectLang)) {
  selectLang = 'en'
  localStorage.setItem('lang', 'en')
}

document.querySelector(`[data-lang=${selectLang}]`).className += ' select'

langHolder.addEventListener('click', e => {
  const selectElement = e.target as HTMLDivElement
  const selectLang = selectElement.dataset.lang
  if (selectElement.tagName === 'DIV' && langsArr.includes(selectLang)) {
    localStorage.setItem('lang', selectLang)
    document.querySelectorAll('.lang').forEach(e => e.className = 'lang red')
    selectElement.className += ' select'
    translate()
  }
})

const translate = () => {
  selectLang = localStorage.getItem('lang')
  if (!langsArr.includes(selectLang)) {
    selectLang = 'en'
    localStorage.setItem('lang', 'en')
  }
  document.querySelector('title').innerHTML = translateArr.title[selectLang]
  for (let key in translateArr) {
    let elem = document.querySelector(`.lng-${key}`)
    if (elem) {
      elem.innerHTML = translateArr[key][selectLang]
    }
  }
}
translate()

export { selectLang }