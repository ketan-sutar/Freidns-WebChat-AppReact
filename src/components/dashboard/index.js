import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';

// import { getDatabase } from 'firebase/database';
import ProviderBloack from './ProviderBloack';
import { AvatarUploadBtn } from './AvatarUploadBtn';
import { getUserUpdates } from '../../misc/helper';
import { database, ref, update } from '../../misc/Firebase';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  const onSave = async newData => {
    console.log(newData);
    
    try {
     
      const updates = await getUserUpdates(
        profile.uid,
        'name',
        newData,
        database
      );
      await update(ref(database), updates);

      

      Alert.success('NickName has been updates', 4000);
    } catch (err) {
      console.log(err);
      Alert.error(err.message, 4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBloack />
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;

// import '../dashboard/index'import { Drawer } from 'rsuite';
