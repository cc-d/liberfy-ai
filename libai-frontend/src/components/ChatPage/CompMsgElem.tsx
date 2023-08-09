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



export const CompMsgElem: React.FC<{ message: DBMsg }> = ({ message }) => {
  const excerpt = message.content.slice(0, 20) + '...'; // Short excerpt of the content

  return (
    <Box sx={{m: 0.5, mt: 1}}>
      <Accordion
        disableGutters

        sx={{}}
      >
        <AccordionSummary
          sx={{p: 0, pl: 1, pr: 1 }}
          expandIcon={<ExpandMore />}
        >
          <Box display='flex' alignItems='center'>
            {getIcon(message.role)}
            <Typography variant='body1' noWrap>
              {message.role}: {excerpt}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{p:1, pt: 0}}
        >
          <TextField
            sx={{p: 0, m: 0 }}
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