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
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './styles.css';

export const RoleIcon: React.FC<{ role: string }> = ({ role }) => {
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
      <RoleIcon role={role} />
      <Typography variant='body1'
      >{role}</Typography>
    </Box>
  )
}

export const MsgSummaryText: React.FC<{ message: DBMsg, }> = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ml: 1,
        opacity: 0.8,
        fontSize: '0.8rem',
        alignItems: 'center',
      }}
    >
      {message.content}
    </Box>
  )
}

export const CompMsgElem: React.FC<{ message: DBMsg, }> = ({ message }) => {

  return (
    <Box
      sx={{
        m: '4px',
      }}>
      <Accordion
        disableGutters
        sx={{

        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%', m: 0, p: '0px 4px',
            overflow: 'hidden',
          }}

        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              overflow: 'hidden',
              alignItems: 'center',
              maxWidth: 'calc(100vw - 300px)',
              alignContent: 'center',

            }}
          >
            <MsgRoleElem role={message.role} />
            <MsgSummaryText message={message} />
          </Box>
        </AccordionSummary>
        <AccordionDetails

          sx={{ m: 0, p: '0px 4px'}}
        >
          <ReactMarkdown
            className="markdown-body"
            remarkPlugins={[gfm]}>{message.content}</ReactMarkdown>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default CompMsgElem;