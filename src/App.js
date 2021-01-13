import React, { useState } from 'react'

export default function App() {
  const initialState = {
    firstName: '',
    lastName: '',
  }
  const [name, setName] = useState(initialState)
  return (
    <>
      <input
        type="text"
        onChange={(e) => setName({ ...name, firstName: e.target.value })}
      />
      <br/>
      <input
        type="text"
        onChange={(event) => setName({ ...name, lastName: event.target.value })}
      />
     
      <div>{name.firstName}</div>
      <div>{name.lastName}</div>
    </>
  )
}
