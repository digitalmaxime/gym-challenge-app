import {
  VStack, Button, createStandaloneToast, Box, Text,
  TableContainer, Tbody, Th, Thead, Tr, Td, Table, HStack, Checkbox,
  PopoverContent, PopoverBody, Popover, PopoverArrow, PopoverCloseButton,
  PopoverHeader, PopoverTrigger, Portal, Tab, TabList, TabPanel, TabPanels, Tabs, Spinner,
} from '@chakra-ui/react';

import React, { ChangeEvent } from 'react';
import { httpsCallable } from 'firebase/functions';
import { auth, firebaseFunctionsEmulator } from '../pages/global';
import AuthLevel from '../utils/AuthLevel';

  interface CourseModificationState {
    displayedUsers : {email: string, authLevel:number}[],
    selectedUsers: {email: string, authLevel:number}[];
    isLoading: boolean,
    pendingUserModification: boolean,
    selectedIndex: number,
    popoverKey: number
  }

class CourseArchive extends React.Component<Record<string, never>,
  CourseModificationState> {
  getPendingUsers = httpsCallable(firebaseFunctionsEmulator, 'getPendingUsers');

  getAllUsers = httpsCallable(firebaseFunctionsEmulator, 'getAllUsers');

  updateUsersLevel = httpsCallable(firebaseFunctionsEmulator, 'updateUsersLevel');

  deleteUsers = httpsCallable(firebaseFunctionsEmulator, 'adminDeleteUser');

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      displayedUsers: [],
      selectedUsers: [],
      isLoading: true,
      selectedIndex: 0,
      pendingUserModification: false,
      popoverKey: 0,
    };
  }

  componentDidMount() {
    this.initUsers();
  }

  // eslint-disable-next-line class-methods-use-this
  getAccountString(authLevel:AuthLevel) {
    switch (authLevel) {
      case AuthLevel.ADMIN:
        return 'ADMINISTRATEUR';
      case AuthLevel.STUDENT:
        return 'ETUDIANT';
      case AuthLevel.TEACHER:
        return 'PROFESSEUR';
      default:
        return 'ERROR';
    }
  }

  initUsers = () => {
    this.doGetPendingUsers();
  };

  doGetPendingUsers = () => {
    this.getPendingUsers({ email: auth.currentUser?.email }).then((result) => {
      const { data } = result;
      const userArray = data as {email: string, authLevel:number}[];
      this.setState({
        displayedUsers: userArray, selectedUsers: [], isLoading: false, popoverKey: Date.now(),
      });
    });
  };

  doGetAllUsers = () => {
    this.getAllUsers({ email: auth.currentUser?.email }).then((result) => {
      const { data } = result;
      const userArray = data as {email: string, authLevel:number}[];
      this.setState({
        displayedUsers: userArray, selectedUsers: [], isLoading: false, popoverKey: Date.now(),
      });
    });
  };

  doUpdateUsersLevel = (authLevel: AuthLevel) => {
    const { selectedUsers, selectedIndex } = this.state;
    this.setState({ pendingUserModification: true }, () => {
      this.updateUsersLevel({ selectedUsers, authLevel }).then(() => {
        const { toast } = createStandaloneToast();
        toast({
          title: 'Comptes utilisateurs bien mis à jour.',
          description: 'Le niveau des comptes utilisateurs ont bien étés mis à jour.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        this.setState({ pendingUserModification: false });
        if (selectedIndex === 0) { this.doGetPendingUsers(); } else { this.doGetAllUsers(); }
      });
    });
  };

  doDeleteUsers = () => {
    const { selectedUsers, selectedIndex } = this.state;
    this.setState({ pendingUserModification: true }, () => {
      this.deleteUsers({ selectedUsers }).then(() => {
        const { toast } = createStandaloneToast();
        toast({
          title: 'Comptes utilisateurs supprimés.',
          description: 'Les comptes utilisateurs ont bien étés supprimés.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        this.setState({ pendingUserModification: false });
        if (selectedIndex === 0) { this.doGetPendingUsers(); } else { this.doGetAllUsers(); }
      });
    });
  };

  selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const { displayedUsers } = this.state;
    if (e.target.checked) {
      const newSelected: {email: string; authLevel: number; }[] = [];
      displayedUsers.forEach((b: {email: string; authLevel: number; }) => { newSelected.push(b); });
      this.setState({ selectedUsers: newSelected });
    } else {
      this.setState({ selectedUsers: [] });
    }
  };

  selectThis = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { displayedUsers, selectedUsers } = this.state;
    if (!e.target.checked) {
      const userToRemove = displayedUsers[index];
      const findUser = (
        user: {email: string, authLevel : number},
      ) => user.email === userToRemove.email;
      const indexToRemove = selectedUsers.findIndex(findUser);
      selectedUsers.splice(indexToRemove, 1);
      this.setState({ selectedUsers });
    } else {
      selectedUsers.push(displayedUsers[index]);
      this.setState({ selectedUsers });
    }
  };

  selectThisButton = (index: number) => {
    const { displayedUsers, selectedUsers } = this.state;
    const findUser = (
      user: {email: string, authLevel : number},
    ) => user.email === displayedUsers[index].email;
    if (selectedUsers.findIndex(findUser) === -1) {
      selectedUsers.push(displayedUsers[index]);
      this.setState({ selectedUsers });
    }
  };

  onChangeTabIndex = (newIndex: number) => {
    if (newIndex === 0) {
      this.setState({ isLoading: true, selectedIndex: newIndex }, () => {
        this.doGetPendingUsers();
      });
    } else {
      this.setState({ isLoading: true, selectedIndex: newIndex }, () => { this.doGetAllUsers(); });
    }
  };

  render() {
    const {
      displayedUsers, selectedUsers, isLoading, selectedIndex, pendingUserModification,
      popoverKey,
    } = this.state;

    const CommonHeader = (
      <Box>
        <Text fontSize="4xl" textAlign="left">  Gestion d&apos;utilisateurs </Text>

        <Text fontSize="xl" textAlign="left">  Il exite trois niveaux d&apos;autoristaion pour les utilisateurs </Text>
        <HStack>
          <Text fontSize="xl" textAlign="left" fontWeight="semibold">   Etudiant :</Text>
          <Text fontSize="xl" textAlign="left">   Auccun accès à la plateforme web. C&apos;est le niveau d&apos;autorisation par défault de tous les utilisateurs</Text>
        </HStack>
        <HStack>
          <Text fontSize="xl" textAlign="left" fontWeight="semibold">Proffesseur :</Text>
          <Text fontSize="xl" textAlign="left">
            Peut accéder à la plateforme web afin de créer et modifier des cours.
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="xl" textAlign="left" fontWeight="semibold">Administrateur :</Text>
          <Text fontSize="xl" textAlign="left">
            Peut accéder à la plateforme web, à accès a tous les cours des proffesseurs.
          </Text>
        </HStack>
        <Box padding="2%" />
      </Box>
    );

    const TableElemet = (
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <HStack>
                  <Checkbox
                    onChange={this.selectAll}
                    isChecked={displayedUsers.length === selectedUsers.length}
                  />
                  <Text as="em"> Selectionnez tous </Text>
                </HStack>
              </Th>
              <Th>Courriel de l&apos;utilisateur</Th>
              <Th>Niveau de compte</Th>
            </Tr>
          </Thead>
          <Tbody key={popoverKey}>
            {
          displayedUsers.map((user, index) => (
            <Tr key={user.email} backgroundColor={selectedUsers.includes(user) ? 'blue.200' : 'inherit'}>
              <Td>
                <Checkbox
                  onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    this.selectThis(e, index);
                  }}
                  isChecked={selectedUsers.includes(user)}
                />
              </Td>
              <Td>{user.email}</Td>
              <Td>{this.getAccountString(user.authLevel)}</Td>
              <Td>
                <Popover defaultIsOpen={false}>
                  <PopoverTrigger>
                    <Button onClick={() => {
                      this.selectThisButton(index);
                    }}
                    >
                      Changer

                    </Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent minW="lg">
                      <PopoverArrow />
                      <PopoverHeader>
                        <Text padding="2%">Changer le niveau du / des utilisateur selectionnés ou supprimer le/les comptes.</Text>
                      </PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        { !pendingUserModification ? <Button margin="2%" colorScheme="blue" onClick={() => { this.doUpdateUsersLevel(AuthLevel.STUDENT); }}>Étudiant</Button> : (
                          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                        )}
                        { !pendingUserModification ? <Button margin="2%" colorScheme="blue" onClick={() => { this.doUpdateUsersLevel(AuthLevel.TEACHER); }}>Professeur</Button> : (
                          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                        )}
                        { !pendingUserModification ? <Button margin="2%" colorScheme="blue" onClick={() => { this.doUpdateUsersLevel(AuthLevel.ADMIN); }}>Administrateur</Button> : (
                          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                        )}
                        { !pendingUserModification ? <Button margin="2%" colorScheme="blue" onClick={() => { this.doDeleteUsers(); }}>Supprimer</Button> : (
                          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                        )}
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Td>
            </Tr>
          ))
      }
            {displayedUsers.length < 1 ? <Text as="em"> Aucun utilisateur trouvé</Text> : null}
          </Tbody>
        </Table>

      </TableContainer>
    );

    if (isLoading) {
      return (
        <Box
          paddingLeft="calc(25%)"
          paddingTop="calc(5%)"
          w="100%"
        >
          { CommonHeader }

          <Box>
            <HStack paddingRight="calc(20%)" justifyContent="center">

              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Text as="em"> Chargement en cours</Text>

            </HStack>
          </Box>
        </Box>
      );
    }

    return (
      <Box paddingLeft="calc(25%)" paddingTop="calc(5%)" w="100%">
        {CommonHeader}
        <Tabs defaultIndex={selectedIndex} onChange={(index) => { this.onChangeTabIndex(index); }} size="md" variant="enclosed">
          <TabList>
            <Tab>Utilisateurs en attente</Tab>
            <Tab>Tous les utilisateurs</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {TableElemet}
            </TabPanel>
            <TabPanel>
              {TableElemet}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <VStack alignItems="start" spacing="25px" />
      </Box>
    );
  }
}

export default CourseArchive;
