import React from 'react';
import { Avatar } from 'rsuite';
import { getNameIntial } from '../misc/helper';

const Profilevatar = ({ name, ...avatarProps }) => {
  return (
    <div>
      <Avatar circle {...avatarProps}>
        {
            getNameIntial(name)
        }
      </Avatar>
    </div>
  );
};

export default Profilevatar;
