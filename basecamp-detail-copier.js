class BasecampDetailCopier {
  static selectors = {
    button: '#basecamp-detail-copier',
    toolbar: '.perma-toolbar',
    title: '.todo__title'
  }

  constructor() {
    this.setupListeners()
    this.initialise()
  }

  setupListeners() {
    this.initialise = this.initialise.bind(this)
    document.addEventListener('turbo:load', this.initialise)
  }

  initialise() {
    if (!this.canInitialise) return
    this.toolbarEl.prepend(this.buttonEl)
  }

  handleClick(event) {
    if (!event.isTrusted) return
    this.copyToClipboard(`${this.titleContent} \n${location.href}`)
  }

  copyToClipboard(value) {
    navigator.clipboard.writeText(value).then(() => {
      console.info('Copied:', value)
    }, () => {
      console.error('Failed to copy:', value)
    })
  }

  get buttonText() {
    return 'Copy Title and URL'
  }

  get buttonEl() {
    const buttonEl = document.createElement('button')

    buttonEl.id = this.constructor.selectors.button.replace('#', '')
    buttonEl.classList.add('btn')
    buttonEl.classList.add('btn--small')
    buttonEl.textContent = this.buttonText
    buttonEl.addEventListener('click', this.handleClick.bind(this))

    return buttonEl
  }

  get hasButtonEl() {
    return !!document.querySelector(this.constructor.selectors.button)
  }

  get toolbarEl() {
    return document.querySelector(this.constructor.selectors.toolbar)
  }

  get titleEl() {
    return document.querySelector(this.constructor.selectors.title)
  }

  get titleContent() {
    return this.titleEl?.textContent?.trim()
  }

  get isValidUrl() {
    return location.href.includes('/card_tables/') && location.href.includes('/cards/')
  }

  get canInitialise() {
    return this.isValidUrl && this.toolbarEl && !this.hasButtonEl
  }
}

window.MikeMooreDev = window.MikeMooreDev || {}
window.MikeMooreDev.BasecampDetailCopier = new BasecampDetailCopier()
