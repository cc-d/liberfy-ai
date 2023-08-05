import React from 'react';
import {
  BaseMessage, BaseChat, BaseUser,
  BaseCompletion
} from '../../api';
import {
  Box, Typography, Divider, List,
  Accordion, AccordionSummary, AccordionDetails, Button
} from '@mui/material';
import {
  Computer, Person, Assistant
} from '@mui/icons-material';
import {
  useTheme
} from '@mui/material/styles';

export const getIcon = (role: string) => {
  role = role.toLowerCase();
  if (role == 'user') {
    return <Person sx={{
      mr: 0.5, verticalAlign: "middle", height: '1rem', width: '1rem'
    }}/>;
  } else if (role == 'assistant') {
    return <Assistant sx={{
      mr: 0.5, verticalAlign: "middle", height: '1rem', width: '1rem'
    }}/>;
  } else {
    return <Computer sx={{
      mr: 0.5, verticalAlign: "middle", height: '1rem', width: '1rem'
    }}/>;
  }
}


export const MsgRoleElem: React.FC<{ role: string }> = ({ role }) => {
  role = role.toLowerCase();
  return (
    <Box display='flex' alignItems='center'>
      {getIcon(role)}
      <Typography variant='body1'
      >{role}</Typography>
    </Box>
  )
}


export const CompMsgElem: React.FC<{ message: BaseMessage }> = ({ message }) => {
  const theme = useTheme();
  return (
    <>
    <Box sx={{mt: 0.5}}
      display="flex"
      flexDirection="column"
    >
      <Typography
        variant="body1"
      >
        <MsgRoleElem
          role={message.role}
        />
      </Typography>
      <Typography variant="caption">{message.content}</Typography>
    </Box>
    </>
  )
}

export default CompMsgElem;