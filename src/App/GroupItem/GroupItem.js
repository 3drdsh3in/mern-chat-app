// import { useState } from 'react';

import './GroupItem.scss';

function GroupItem({ g_title, g_type, g_size, selected }) {

  return (
    <div className="groupitem">
      <h6>{g_title}</h6>
      <p>{g_type.charAt(0).toUpperCase() + g_type.slice(1).toLowerCase()} | {g_size} Members</p>
    </div>
  )
}

export default GroupItem;