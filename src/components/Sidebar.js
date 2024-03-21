import React, { useEffect, useRef, useState } from 'react';
import DashboardToggle from './dashboard/DashboardToggle';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import { Divider } from 'rsuite';
import ChatRoomList from './rooms/ChatRoomList';

const Sidebar = () => {
  const topsidebarRef = useRef();
  const [height, setheight] = useState(0);

  useEffect(() => {
    if (topsidebarRef.current) {
      setheight(topsidebarRef.current.scrollHeight);
    }
  },[topsidebarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topsidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />

        <Divider> Join Converstaion</Divider>
      </div>
      <ChatRoomList  aboveHeight={height}  />
    </div>
  );
};

export default Sidebar;
