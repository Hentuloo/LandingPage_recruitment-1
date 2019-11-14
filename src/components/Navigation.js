class Navigation {
   constructor() {
      this.container = document.querySelector('.nav');
      this.button = document.querySelector('.nav__button');
      this.buttonIcon = document.querySelector(
         '.nav__button-icon',
      );
      this.listWrapper = document.querySelector(
         '.nav__list-wrapper',
      );
      this.list = document.querySelector('.nav__list');
      this.listElements = [
         ...document.querySelectorAll('.nav__list-element'),
      ];
      this.links = [
         ...document.querySelectorAll('.nav__link'),
      ];
      this.throttleScroll = false;

      this.offsetsSections = [];
      this.getSectionsOffsetsFromLink();

      // Hamburger
      this.button.addEventListener(
         'click',
         this.toggleActive,
      );

      window.addEventListener('scroll', this.scrolling);
      // For check if nav is with--scrolled modifyier
      this.scrolling();

      this.links.forEach(link =>
         link.addEventListener(
            'click',
            this.handleLinkClck,
         ),
      );
   }

   handleLinkClck = e => {
      e.preventDefault
         ? e.preventDefault()
         : (e.returnValue = false);

      const { hash } = e.target;
      const section = document.querySelector(hash);
      if (section) {
         // Hide nav
         this.toggleActive();

         // Set new active element
         this.setActiveListElement(e.target.parentNode);

         // Add nav height
         const y =
            section.getBoundingClientRect().top +
            window.pageYOffset -
            52;

         window.scrollTo({
            top: y,
            left: 0,
            behavior: 'smooth',
         });
      }
   };

   getSectionsOffsetsFromLink = () => {
      return this.links.forEach(element => {
         const { hash } = element;
         const section = document.querySelector(hash);
         if (section) {
            this.offsetsSections.push({
               target: element.parentElement,
               offsetTop: section.offsetTop,
               height: section.offsetHeight,
            });
         }
         return null;
      });
   };

   toggleActive = () => {
      // toggle list
      this.listWrapper.classList.toggle(
         'nav__list-wrapper--active',
      );
      this.list.classList.toggle('nav__list--active');
      // toggle button color
      this.button.classList.toggle('nav__button--white');
      // toggle button-icon
      this.buttonIcon.classList.toggle('fa-bars');
      this.buttonIcon.classList.toggle('fa-times');
   };

   setActiveListElement = activeElement => {
      // remove active from all elements
      this.listElements.forEach(el => {
         el.classList.remove('nav__list-element--active');
      });
      // add active to one element
      activeElement.classList.add(
         'nav__list-element--active',
      );
   };

   findActiveSectionByScroll = () => {
      const { scrollY } = window;
      // Check if element is in view
      this.offsetsSections.every(
         ({ target, offsetTop, height }) => {
            if (target) {
               if (
                  scrollY >= offsetTop - 200 &&
                  scrollY <= offsetTop + height - 200
               ) {
                  return this.setActiveListElement(target);
               }
            }
            return true;
         },
      );
   };

   scrolling = () => {
      const { scrollY } = window;
      if (scrollY >= 27) {
         this.container.classList.add('nav--scrolled');
      } else {
         this.container.classList.remove('nav--scrolled');
      }

      // throttleScroll for active attribution
      if (this.throttleScroll) return;
      this.throttleScroll = true;
      setTimeout(() => {
         this.throttleScroll = false;
      }, 150);

      this.findActiveSectionByScroll();
   };
}

export default Navigation;
