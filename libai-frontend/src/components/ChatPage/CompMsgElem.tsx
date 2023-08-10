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
  return (
    <Box
      sx={{
        m: 1, maxWidth: '98vw'
    }}>
      <Accordion
        disableGutters
        sx={{}}
      >
<AccordionSummary
  expandIcon={<ExpandMore />}
  sx={{
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  }}
>
  <Box
    display='flex'
    alignItems='center'
    sx={{
      flexGrow: 1,
      overflow: 'hidden',
      maxWidth: '80vw'  // Assuming expandIcon takes approx. 40px width
    }}
  >
    <MsgRoleElem role={message.role} />

    <Box
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
    >
      {message.content}
    </Box>
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