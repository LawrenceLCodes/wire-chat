import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Earth Alliance Messaging</span>
      <div className="user">
        <img src="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <span>Lawrence</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar