'use strict'
import React from 'react'
import OpenEntry from './openEntry'
import lang from 'i18n/lang'
import './open.less'
import SearchBtn from './glyphicons-28-search.png'

module.exports = class FileOpener extends React.Component {
  onSearch = () => {
    var searchinput = document.getElementById("searchinput").value.trim()
    var i, filelisting = document.querySelectorAll("#filelisting div")
    if (searchinput !== '') {
      for (i = 0; i < filelisting.length; i+=1) {
        if (filelisting[i].textContent.toLowerCase().indexOf(searchinput) > -1) {
          filelisting[i].style.display = 'block'
        } else {
          filelisting[i].style.display = 'none'
        }
      }
    } else {
      document.getElementById("searchinput").value = ''
      for (i = 0; i < filelisting.length; i+=1) {
        filelisting[i].style.display = 'block'
      }
    }
  }

  onNewSearch = () => {
    var searchinput = document.getElementById("searchinput").value.trim()
    if (searchinput === '') {
      var searchbtn = document.getElementById("searchbtn")
      searchbtn.click()
    }
  }

  render() {
    let keys = []
    for (var key in localStorage) {
      if ((key !== 'default.spj') && (key.endsWith('.spj'))) {
        keys.push(
          <OpenEntry name={key} key={key} onNewDeck={this.props.onNewDeck} />
        )
      }
    }
    return (
      <div id="sp-file-open" className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title appname">
                <span className="mh">MH</span> ShowPreper
              </h4>
            </div>
            <div className="modal-body">
              <div className="searchdiv">
                <input id="searchinput" onChange={this.onNewSearch} placeholder="search for ..." />
                <button className="iconbtn" onClick={this.onSearch} title="Search Button"><img src={SearchBtn} id="searchbtn" /></button>
              </div>
              <div id="filelisting">
              {keys}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                {lang.btnCancel}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
