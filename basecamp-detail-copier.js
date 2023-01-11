class BasecampDetailCopier {
  static selectors = {
    toolbar: 'perma-toolbar',
    title: 'todo__title'
  }

  constructor () {
     if(!this.toolbarEl) return
    this.toolbarEl.prepend(this.buttonEl)
  }

  get buttonEl () {
    const buttonEl = document.createElement('button')
    buttonEl.id = 'basecamp-detail-copier'
    buttonEl.classList.add('btn')
    buttonEl.classList.add('btn--small')
    buttonEl.textContent = this.buttonText

    buttonEl.addEventListener('click', this.handleClick.bind(this))
    return buttonEl
  }

  handleClick(event) {
    if (!event.isTrusted) return
    this.copyToClipboard(`${this.titleContent} \n${location.href}`)
  }

  copyToClipboard(value) {
    navigator.clipboard.writeText(value).then(() => {
      console.info('Copied:', value)
    },() => {
      console.error('Failed to copy:', value)
    })
  }

  get titleEl () {
    return document.querySelector(`.${this.constructor.selectors.title}`)
  }

  get titleContent () {
    return this.titleEl?.textContent?.trim()
  }

  get buttonText () {
    return 'Copy Title and URL'
  }

  get toolbarEl () {
    return document.querySelector(`.${this.constructor.selectors.toolbar}`)
  }
}

(function(){
  window.BasecampDetailCopier = new BasecampDetailCopier()
})()