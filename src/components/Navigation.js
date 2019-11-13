class Navigation {
    constructor() {
        this.container = document.querySelector('.nav')
        this.button = document.querySelector('.nav__button')
        this.buttonIcon = document.querySelector('.nav__button-icon')
        this.listWrapper = document.querySelector('.nav__list-wrapper')
        this.list = document.querySelector('.nav__list')
        this.listElements = document.querySelectorAll('.nav__list-element')
        
        // Hamburger
        this.button.addEventListener('click', this.toggleActive)
        window.addEventListener('scroll', this.scrolling);
    }
    toggleActive = () => {
        // toggle list
        this.listWrapper.classList.toggle('nav__list-wrapper--active')
        this.list.classList.toggle('nav__list--active')
        // toggle button color
        this.button.classList.toggle('nav__button--white')
        // toggle button-icon
        this.buttonIcon.classList.toggle('fa-bars')
        this.buttonIcon.classList.toggle('fa-times')
    }
    scrolling = (e) => {
        console.log(e)
    }
}

export default Navigation;