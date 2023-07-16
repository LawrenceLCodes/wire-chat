import React from 'react'

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find A User" />
      </div>
      <div className="userChat">
        <img src="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div className="userChatInfo">
          <span>Lydia</span>
        </div>
      </div>
    </div>
  )
}

export default Search