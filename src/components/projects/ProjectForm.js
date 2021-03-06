import React from 'react'

const ProjectForm = ({ data, handleChange, handleSubmit, error }) => {
  return (
    <div>
      <form className="projectForm" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name || ''}
            />
          </div>
          {error && error.name && <small className="help is-danger">{error.name}</small>}
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={data.description || ''}
            />
          </div>
        </div>
        <button className="button is-primary is-skew">Submit</button>
      </form>
      <hr />
    </div>
  )
}

export default ProjectForm
