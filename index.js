const { Plugin } = require('powercord/entities')
const { React } = require('powercord/webpack')
const { getOwnerInstance, waitFor } = require('powercord/util')
const { inject, uninject } = require('powercord/injector')
const Settings = require('./Settings')
const { shell: { openItem } } = require('electron')
const { resolve } = require('path')

module.exports = class AdvancedTitleBar extends Plugin {
  constructor () {
    super()
    this.titleBarGames = powercord.pluginManager.isEnabled('pc-titleBarGames')
  }

  async startPlugin () {
    if (process.platform !== 'win32') {
      return this.warn('Exiting due to unsupported platform.')
    }
    // Register Settings Menu
    this.registerSettings(
      'advancedTitle',
      'AdvancedTitleBar',
     Settings
    )
    this.loadCSS(resolve(__dirname, 'style.scss'))
    this.patchTitlebar()
  }

  getApplications () {
    const cmds = this.settings.get('cmds').filter(c => c.value)
    const images = this.settings.get('images').filter(c => c.value)
    const classes = 'powercord-apps-img'
    return cmds.map(({ key, value }, i) => {
      if (!images[i]) {
        return null
      }
      return React.createElement('div', {
        className: classes,
        onClick: () => openItem(value.replace(/\\/g, '/')),
        style: {
          backgroundImage: `url(${images[i].value})`
        }
      })
    })
  }

  pluginWillUnload () {
    uninject('powercord-titleBarApps')
  }

  async patchTitlebar () {
    const titleBar = await waitFor('.pc-titleBar')
    const instance = getOwnerInstance(titleBar)
    if (this.titleBarGames) {
      inject('powercord-titleBarApps', powercord.pluginManager.get('pc-titleBarGames'), 'getApplications', (_, res) => {
        const libIcon = res.pop()
        const limit = Math.abs(Math.trunc(this.settings.get('limit')))
        const apps = isNaN(limit) ? res : res.slice(0, limit || 40)
        apps.push(libIcon)
        apps.unshift(...this.getApplications(), React.createElement('div', {
          className: 'powercord-apps-divider'
        }))
        return apps
      })
    } else {
      const _this = this
      const TitleBarComponent = instance._reactInternalFiber.child.child.type
      const TitleBarAppsComponent = class TitleBarAppsComponent extends React.Component {
        render () {
          const directTitleBar = new TitleBarComponent({})

          directTitleBar.props.children.splice(1, 0,
            React.createElement('div', {
              className: 'powercord-apps-bar'
            }, ..._this.getApplications())
          )

          return directTitleBar
        }
      }
      inject('powercord-titleBarApps', instance, 'render', () =>
        React.createElement(TitleBarAppsComponent)
      )
    }
  }
}
