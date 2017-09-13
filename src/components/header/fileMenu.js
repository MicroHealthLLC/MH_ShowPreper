'use strict'
import React from 'react'
import lang from 'i18n/lang'
import Downloader from 'components/file/download'
import Uploader from 'components/file/upload'
import FileOpener from 'components/file/open'
import FileSaveAs from 'components/file/saveAs'
//  import About from 'components/file/about'
//  import Logo from './logo.svg'
import OpenMenuBtn from './glyphicons-115-list.png'
import FileSaveAsBtn from './glyphicons-415-disk-save.png'
import FileDeleteBtn from './glyphicons-418-disk-remove.png'
import DownloadBtn from './glyphicons-201-download.png'
import UndoBtn from './glyphicons-436-undo.png'
import RedoBtn from './glyphicons-435-redo.png'
import NewFileBtn from './glyphicons-703-file-plus.png'
import UploadBtn from './glyphicons-202-upload.png'
import './fileMenu.less'

module.exports = class extends React.Component {
  onUpload = () => {
    this.refs.uploader.click()
  }
  onDelete = () => {
    this.props.onDeleteDeck()
  }
  onResetBoard = () => {
    this.props.onNewDeck("default.spj")
    var savebtn = document.getElementById("filesavebtn")
    savebtn.click()
  }
  onShowFiles = () => {
    document.getElementById("searchinput").value = ''
    var searchbtn = document.getElementById("searchbtn")
    searchbtn.click()
  }

  render() {
    let undoTitle =
      lang.undo +
      ' ' +
      this.props.deck.undoStack.stack[this.props.deck.undoStack.current].desc
    let redoTitle =
      lang.redo +
      ' ' +
      (this.props.deck.undoStack.current + 1 <
      this.props.deck.undoStack.stack.length
        ? this.props.deck.undoStack.stack[this.props.deck.undoStack.current + 1]
            .desc
        : '')
    return (
      <div className="filecontrol">
        <a href="#sp-file-open" className="iconbtn" onClick={this.onShowFiles} data-toggle="modal" title={lang.open}>
          <img src={OpenMenuBtn} />
        </a>
        <input type="text" id="thisfilename" className="showname" placeholder="default.spj" value={this.props.deck._fn} readonly />
        <a href="#sp-file-save-as" className="iconbtn" data-toggle="modal" title={lang.saveAs}>
          <img src={FileSaveAsBtn} id="filesavebtn" />
        </a>
        <a href="#" className="iconbtn" onClick={this.onDelete} title={lang.delete}>
          <img src={FileDeleteBtn} id="filedeletebtn" />
        </a>
        <a href="#sp-open-download" className="iconbtn" data-toggle="modal" title={lang.download}>
          <img src={DownloadBtn} id="downloadbtn" />
        </a>
        <a href="#" className="iconbtn" onClick={this.props.onUndo} title={undoTitle}>
          <img src={UndoBtn} id="undobtn" />
        </a>
        <a href="#" className="iconbtn" onClick={this.props.onRedo} title={redoTitle}>
          <img src={RedoBtn}  id="redobtn"/>
        </a>
        <a href="#" className="iconbtn" onClick={this.onResetBoard} title="New File">
          <img src={NewFileBtn} id="newfilebtn" />
        </a>
        <a href="#" className="iconbtn" onClick={this.onUpload} title={lang.upload}>
          <img src={UploadBtn} id="uploadbtn" />
        </a>

        <FileOpener onNewDeck={this.props.onNewDeck} />
        <FileSaveAs onNewDeck={this.props.onNewDeck} deck={this.props.deck} />
        <Downloader {...this.props} />
        <Uploader onNewDeck={this.props.onNewDeck} ref="uploader" />
      </div>
    )
  }
}
