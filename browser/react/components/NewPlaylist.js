import React, {Component} from 'react';
import axios from 'axios';


export default class NewPlaylist extends Component {

  constructor() {
    super();
    this.state = {
      inputValue: '',
      hasChanged: false

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputIsInvalid = this.inputIsInvalid.bind(this);

  }


  handleChange(evt) {
    this.setState({
      inputValue: evt.target.value,
      hasChanged: true
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addPlaylist(this.state.inputValue);
    this.setState({
      inputValue: '',
      hasChanged: false
    })

  }

  inputIsInvalid() {
    return (!this.state.inputValue.match(/^[a-zA-Z ]*$/) || this.state.inputValue.length>17 || (!this.state.inputValue && this.state.hasChanged))
  }

  render() {

    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Playlist</legend>
            {(this.state.hasChanged && !this.state.inputValue) ? <div className="alert alert-warning">Please enter a name</div> : ''}
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" onChange={this.handleChange} value={this.state.inputValue}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={this.inputIsInvalid()}>Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>


    )
  }

}
