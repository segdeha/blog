// yes, this is a bunch of global variables and functions 😬

let scrollHeight = 0
let progress = null
let maxProgress = null
let values = {
    scrollPercentage: 0,
    maxProgress: 0
}

function draw() {
    progress.value = values.scrollPercentage
    maxProgress.style.width = `${values.maxProgress}%`
}

function registerScroll() {
    values.scrollPercentage = window.scrollY / scrollHeight * 100
    if (values.scrollPercentage > 100) {
        values.scrollPercentage = 100
    }
    else if (values.scrollPercentage < 0) {
        values.scrollPercentage = 0
    }
    values.maxProgress = values.scrollPercentage > values.maxProgress ?
                  values.scrollPercentage :
                  values.maxProgress
    window.requestAnimationFrame(draw)
}

function handleScroll() {
    window.requestAnimationFrame(registerScroll)
}

function handleClick() {
    let target = scrollHeight * values.maxProgress / 100
    window.scrollTo(0, target)
}

function initProgress() {
    // calculate height of article body
    let main = document.querySelector('main')
    let article = document.querySelector('.content')
    progress = document.querySelector('.content-progress')
    maxProgress = document.querySelector('.max-progress')
    let mainHeight = parseInt(window.getComputedStyle(main).getPropertyValue('height'), 10)
    let articleHeight = parseInt(window.getComputedStyle(article).getPropertyValue('height'), 10)
    scrollHeight = articleHeight - (mainHeight - articleHeight)
    registerScroll()
    document.addEventListener('scroll', handleScroll)
    maxProgress.addEventListener('click', handleClick)
}

// document.addEventListener('DOMContentLoaded', init)

export default initProgress;
