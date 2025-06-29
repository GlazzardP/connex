import React, { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useAgents } from '../../lib/api';

type Contact = {
  id: string;
  name: string;
};

type ContactItemProps = {
  contact: Contact;
};
const ContactItem = ({ contact }: ContactItemProps) => {
  return (
    <Tooltip title={contact.id} placement="right">
      <ListItem
        style={{ textAlign: 'left', gap: '1rem' }}
        key={contact.id}
        sx={{ pl: '0' }}
      >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={contact.name} secondary={contact.id} />
      </ListItem>
    </Tooltip>
  );
};

const ContactsLoading = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height={200}>
    <Typography variant="body1" color="text.secondary">
      Loading contacts...
    </Typography>
  </Box>
);

const ContactsEmpty = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height={200}>
    <Typography variant="body1" color="text.secondary">
      No contacts found
    </Typography>
  </Box>
);

export const ContactsList = () => {
  const { data, isLoading, error } = useAgents();
  const [search, setSearch] = useState('');

  const contacts = data?.data?.data || [];
  const hasContacts = contacts.length > 0;

  if (isLoading) {
    return (
      <Card>
        <CardHeader title="Contacts" />
        <ContactsLoading />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader title="Contacts" />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={200}
        >
          <Typography variant="body1" color="error">
            Failed to load contacts
          </Typography>
        </Box>
      </Card>
    );
  }

  if (!hasContacts) {
    return (
      <Card>
        <CardHeader title="Contacts" />
        <ContactsEmpty />
      </Card>
    );
  }

  const handleContactSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.id.toString().includes(search)
  );

  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardHeader title="Contacts" />
        <TextField
          label="Search"
          variant="standard"
          value={search}
          onChange={handleContactSearch}
          sx={{ width: '50%' }}
        />
      </Box>

      {filteredContacts.length === 0 ? (
        <ContactsEmpty />
      ) : (
        <Box
          sx={{
            height: { xs: '300px', lg: '65vh' },
            overflowY: 'auto',
            paddingX: 2,
            paddingBottom: 2,
          }}
        >
          <List disablePadding>
            {filteredContacts.map((con) => (
              <ContactItem key={con.id} contact={con} />
            ))}
          </List>
        </Box>
      )}
    </Card>
  );
};
