import React, { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  useToast,
} from '@chakra-ui/react';
import { UserData } from '../../services/types';
import { getCurrentUser } from '../../services/api';

const StatisticsDrawer = () => {
  const [userData, setUserData] = useState<UserData>();
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const isOpen = userData !== undefined;
  const toast = useToast();

  const onOpen = async () => {
    setUserData(await getCurrentUser());
  };

  const onClose = () => {
    setUserData(undefined);
  };

  return (
    <>
      <Button ref={openButtonRef} colorScheme='teal' onClick={onOpen}>
        Open Stats
      </Button>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={openButtonRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Your statistics</DrawerHeader>

          <DrawerBody>
            <StatGroup flexDirection='column' rowGap={8}>
              <Stat>
                <StatLabel>Created Particles</StatLabel>
                <StatNumber>{userData?.createdParticlesCount ?? 0}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Created Gravity points</StatLabel>
                <StatNumber>
                  {userData?.createdGravityPointsCount ?? 0}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Gravity point collisions count</StatLabel>
                <StatNumber>
                  {userData?.gravityPointCollisionsCount ?? 0}
                </StatNumber>
              </Stat>
            </StatGroup>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant='outline'
              mr={3}
              onClick={() => {
                toast({
                  position: 'bottom-left',
                  title: 'We warned you! A new error occurred.',
                  status: 'error',
                });
                throw new Error('We warned you!');
              }}
            >
              Do not dare click
            </Button>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default StatisticsDrawer;
