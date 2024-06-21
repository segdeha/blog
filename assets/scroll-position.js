// yes, this is a bunch of global variables and functions :grimacing:
// but it's ok because i'm using it as a module :sweat_smile:

let scrollHeight = 0
let progress = null
let maxProgress = null
let values = {
	scrollPercentage: 0,
	maxProgress: 0
}

function registerNewScrollPosition() {
	values.scrollPercentage = window.scrollY / scrollHeight * 100

	// check bounds
	if (values.scrollPercentage > 100) {
		values.scrollPercentage = 100
	}
	else if (values.scrollPercentage < 0) {
		values.scrollPercentage = 0
	}

	values.maxProgress = values.scrollPercentage > values.maxProgress ?
		values.scrollPercentage :
		values.maxProgress

	progress.value = values.scrollPercentage
	maxProgress.style.width = `${values.maxProgress}%`
}

function handleScroll() {
// 	window.requestAnimationFrame(registerNewScrollPosition)
	registerNewScrollPosition()
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
	registerNewScrollPosition()
	document.addEventListener('scroll', handleScroll)
	maxProgress.addEventListener('click', handleClick)
}

export default initProgress;
