import React from 'react'

const ProjectVisibility = ({visible, handleChange}) => {
  return (
    <section className="section visible">
      <div className="control">
        <strong>Visible?</strong>
        <label className="switch">
          <input
            type="checkbox"
            name="visible"
            checked={JSON.parse(visible)=== true}
            onChange={handleChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </section>
  )
}

export default ProjectVisibility
