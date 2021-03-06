'use strict'
import React from 'react'
import lang from 'i18n/lang'

module.exports = class FileSaveAs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fn: this.props.deck._fn,
      errMsg: ''
    }
  }

  onChange = e => {
    let newName = e.target.value.trim() + '.spj'
    if (
      newName !== this.props.deck._fn &&
      Object.keys(localStorage).indexOf(newName) >= 0
    ) {
      this.setState({ errMsg: lang.duplicatedFileNameErr })
    } else if (newName.length === 4) {
      this.setState({ errMsg: lang.emptyFileNameErr })
    } else {
      this.setState({ errMsg: '' })
    }
    this.setState({ fn: newName })
  }
  onOk = () => {
    if (this.state.fn !== '.spj') {
      this.props.onNewDeck(this.state.fn, this.props.deck)  
    } else {
      this.setState({ fn: 'default.spj' })
      this.setState({ errMsg: '' })
    }
  }
  onCancel = () => {
    this.setState({ fn: 'default.spj' })
    this.setState({ errMsg: '' })
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.deck._fn !== this.props.deck._fn) {
      this.setState({
        fn: nextProps.deck._fn,
        errMsg: ''
      })
    }
  }

  render() {
    return (
      <div
        id="sp-file-save-as"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.onCancel}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">
                {lang.saveAs}
              </h4>
            </div>
            <div className="modal-body">
              <input
                type="text"
                onChange={this.onChange}
                value={this.state.fn.replace(/\.spj$/, '')}
              />.spj
              <div style={{ color: 'red' }}>{this.state.errMsg}</div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={this.onCancel}
                data-dismiss="modal"
              >
                {lang.btnCancel}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onOk}
                data-dismiss="modal"
              >
                {lang.btnOk}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
