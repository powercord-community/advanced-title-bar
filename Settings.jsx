const { getModuleByDisplayName, React } = require('powercord/webpack')
const { TextInput, Category } = require('powercord/components/settings')
const { Button, AsyncComponent } = require('powercord/components')
const { getOwnerInstance, waitFor } = require('powercord/util')

module.exports = class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cmdsOpen: false,
      imagesOpen: false,
      cmds: props.getSetting('cmds', []),
      images: props.getSetting('images', []),
      limit: props.getSetting('limit', 40)
    }
  }

  render () {
    return (
      <div>
        <Category
          name='Programs to open'
          description='List of absolute paths for things to execute (Each program needs an image or it will be skipped)'
          opened={this.state.cmdsOpen}
          onChange={() => this.setState({ cmdsOpen: !this.state.cmdsOpen })}>
          <div>
            {this.generateInputs('cmds')}
          </div>
        </Category>
        <Category
          name='Images'
          description='Each image is associated with the respective program (i.E the first for the first program). Must be URLs.'
          opened={this.state.imagesOpen}
          onChange={() => this.setState({ imagesOpen: !this.state.imagesOpen })}>
          <div>
            {this.generateInputs('images')}
          </div>
        </Category>
        <TextInput
          note='Limit the amount of games displayed by pc-titleBarGames.'
          disabled={!powercord.pluginManager.isEnabled('pc-titleBarGames')}
          defaultValue={this.state.limit}
          onChange={val => this.setState({ limit: val })}>
          Limit Title Bar Games
        </TextInput>
        <Button
          onClick={() => { this.saving() }}>Save
        </Button>
      </div>
    )
  }

  async saving () {
    this.props.updateSetting('cmds', this.state.cmds)
    this.props.updateSetting('images', this.state.images)
    this.props.updateSetting('limit', this.state.limit)
    getOwnerInstance(document.querySelector('.pc-titleBar')).forceUpdate()
  }

  generateInputs (category) {
    const list = this.state[category]
    if (list.length === 0) {
      list.push({ key: 0, value: '' })
    }
    return list.map((n, i) => (
      <div key={n.key}>
        <TextInput
          defaultValue={n.value}
          onBlur={e => {
            if (e.target.value === '') {
              list.splice(i, 1)
              if (list.length === 0) {
                return
              }
            } else {
              list[i].value = e.target.value
            }

            if (list[list.length - 1].value !== '') {
              list.push({
                key: list[list.length - 1].key + 1,
                value: ''
              })
            }

            this.setState({ [category]: list })
          }}
        />
      </div>
    ))
  }
}
