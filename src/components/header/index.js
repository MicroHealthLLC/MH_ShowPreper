'use strict'
import React from 'react'
import lang from 'i18n/lang'
import FileMenu from './fileMenu'
import StyleMenu from './styleMenu'
import './index.less'
import _ from 'lodash'
import BespokeThemeMenu from './bespokeThemeMenu'

module.exports = class Header extends React.Component {
  createWidget = type => {
    let deck = this.props.deck
    let activeSlide = deck.getActiveSlide()
    activeSlide.components.forEach(e => {
      delete e.selected
    })
    this.props.onNewWidget(
      activeSlide,
      null,
      {
        type: type,
        x: 0,
        y: 0,
        text:
          '<p><span style="font-size: 26px"><span style="font-family:arial,helvetica,sans-serif">(' +
          lang['triClickEdt'] + 
          ')</span></span></p>',
        selected: true
      },
      lang['new'] + ' ' + lang[type]
    )
  }

  render() {
    let bespokeThemeMenu, styleMenu
    if (
      this.props.currentView === 'overview' &&
      this.props.presentationFormat === 'bespoke'
    ) {
      bespokeThemeMenu = <BespokeThemeMenu {...this.props} />
    }
    if (
      this.props.currentView === 'slides' ||
      this.props.presentationFormat !== 'handouts'
    ) {
      styleMenu = <StyleMenu {...this.props} />
    }
    return (
      <nav className="navbar navbar-default sp-header">
        <div className="container-fluid">
          <div className="navbar-header">

            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#sp-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <FileMenu {...this.props} />

            <button
              type="button"
              className="insert-object btn btn-default"
              style={{
                display:
                  this.props.currentView !== 'slides' ? 'none' : undefined
              }}
              onClick={() => {
                if (this.props.deck._fn !== 'default.spj') {
                  this.createWidget('TextBox')
                } else {
                  alert('Click the "Save as" button and enter a file name first!')
                }
              }}
            >
              <span className={'glyphicon glyphicon-text-width'} />&nbsp;
              <span className={'glyphicon glyphicon-picture'} />&nbsp;
              <span className={'glyphicon glyphicon-globe'} />
              <div className="btn-label">{lang.insertObject}</div>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="sp-navbar-collapse-1">
            <div
              className="nav navbar-btn navbar-left"
              style={{
                display:
                  this.props.deck.components.length === 0 ? 'none' : undefined
              }}
            >
              {bespokeThemeMenu}
              {styleMenu}
            </div>
           
            <div className="navbar-right">
              <div className="nav navbar-btn btn-group">
                <a
                  type="button"
                  className="btn btn-success"
                  href={'./' + this.props.presentationFormat + '.html'}
                  target="_blank"
                >
                  <span className="glyphicon glyphicon-play" />
                  <div>
                    {_.capitalize(this.props.presentationFormat)}
                  </div>
                </a>
                <button
                  type="button"
                  className="btn btn-success dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="caret" />
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={this.props.changePresentationFormat.bind(
                        null,
                        'impress'
                      )}
                    >
                      Impress
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={this.props.changePresentationFormat.bind(
                        null,
                        'handouts'
                      )}
                    >
                      {lang.handouts}
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={this.props.changePresentationFormat.bind(
                        null,
                        'bespoke'
                      )}
                    >
                      Bespoke
                    </a>
                  </li>
                </ul>
              </div>

              <ul className="nav navbar-btn sp-view-btns">
                <li
                  style={
                    this.props.currentView !== 'slides'
                      ? {}
                      : { display: 'none' }
                  }
                >
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={() => {
                      this.props.changeView('slides')
                      this.setState({ selectedStyleTarget: 'defaultSlide' })
                    }}
                  >
                    <span className={'glyphicon glyphicon-th-list'} />
                    <div className="btn-label">
                      {lang.slides}
                    </div>
                  </button>
                </li>
                <li
                  style={
                    this.props.currentView !== 'overview'
                      ? {}
                      : { display: 'none' }
                  }
                >
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={() => {
                      this.props.changeView('overview')
                      this.setState({ selectedStyleTarget: 'defaultSlide' })
                    }}
                  >
                    <span className={'glyphicon glyphicon-th'} />
                    <div className="btn-label">
                      {lang.overview}
                    </div>
                  </button>
                </li>
              </ul>

            </div>
          </div>
          {/*<!-- /.navbar-collapse -->*/}
        </div>
        {/*<!-- /.container-fluid -->*/}
      </nav>
    )
  }
}
