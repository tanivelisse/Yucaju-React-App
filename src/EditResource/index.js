import React from 'react';

const EditResource = (props) =>  {

  return (
    <div>
      <h4> Edit Resource</h4>
      <form onSubmit={props.editResource}>
        <label>
          Edit Type:
          <select type="text" name="type" onChange={props.handleFormChange} value={props.resourceToEdit.type}>
          	<option value="water">water</option>
			<option value = "gas/power">gas/power</option>
			<option value="food">food</option>
			<option value="transportation">transportation</option>
          </select>
        </label>
        <label>
          Edit Description:
          <textarea type="text" name="description" onChange={props.handleFormChange} value={props.resourceToEdit.description}/>
        </label>
        <input type='Submit'/>
      </form>
    </div>

    )
  }

export default EditResource;