import React from 'react';
import {
  DataCreateChat, DataCreateComp, DataMsgAdd,
  DBComp, DBMsg, DBUserWithToken, DBChat
} from "../../api";
import {
  Box, Typography, Divider, List,
  Accordion, AccordionSummary, AccordionDetails, Button, TextField
} from '@mui/material';
import {
  Computer, Person, Assistant, ExpandMore
} from '@mui/icons-material';

export const getIcon = (role: string) => {
  role = role.toLowerCase();
  if (role == 'user') {
    return <Person sx={{
      mr: 0.5, verticalAlign: "middle", height: '1rem', width: '1rem'
    }} />;
  } else if (role == 'assistant') {
    return <Assistant sx={{
      mr: 0.5, verticalAlign: "middle", height: '1rem', width: '1rem'
    }} />;
  } else {
    return <Computer sx={{
      mr: 0.5, verticalAlign: "middle", height: '1rem', width: '1rem'
    }} />;
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



export const CompMsgElem: React.FC<{ message: DBMsg,  }> = ({ message }) => {

  return (
    <Box
      sx={{
        m: 1,

      }}>
      <Accordion
        disableGutters
        sx={{}}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            display: 'flex',
            alignItems: 'left',
            width: '100%', m: 0, p: 0, pl: 1, pr: 1,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              overflow: 'hidden',
              alignItems: 'left',
              maxWidth: 'calc(100vw - 300px)'
            }}
          >
            <MsgRoleElem role={message.role} />

            <Box
              sx={{
                flexGrow: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                ml: 1,
                opacity: 0.8,
              }}
            >
              {message.content}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{ p: 1, pt: 0 }}
        >
          <TextField
            sx={{ p: 0, m: 0 }}
            fullWidth
            multiline
            disabled
            value={message.content}
            variant="outlined"
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default CompMsgElem;