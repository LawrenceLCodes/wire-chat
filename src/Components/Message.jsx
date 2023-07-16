import React from 'react'

// Single message element, chat window will contain a list of these iimported into Messages.jsx

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>Hello Lyndsay</p>
        {/* <img src="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" /> */}
      </div>
    </div>
  )
}

export default Message