import React, { useState } from 'react';
import { BaseCompletion } from "../../api";
import { useChatContext } from "./ChatContext";
import {
  Box,
  List,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { AddCircleOutline, ExpandMore } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "./CompListElem";
import NewCompModal from "./NewCompModal";

interface ChatSidebarProps {
  chat_id: number;
  user_id: number;
  addCompletion: (completion: BaseCompletion) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chat_id, user_id, addCompletion }) => {
  const theme = useTheme();
  const { completions } = useChatContext();
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="completions-content"
          id="completions-header"
        >
          <Typography>Completions:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" width="100%">
            <Button
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={handleModalOpen}
              sx={{ mb: 2 }}
              size="small"
            >
              New
            </Button>

            <Divider />

            <List dense={true}>
              {completions.length > 0 ? (
                completions.map((completion) => (
                  <CompListElem
                    key={completion.id}
                    completion={completion}
                    theme={theme}
                  />
                ))
              ) : (
                <Typography variant="body1">No completions yet.</Typography>
              )}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>
      <NewCompModal
        open={showModal}
        handleClose={handleModalClose}
        addCompletion={addCompletion}
        chat_id={chat_id}
        user_id={user_id}
        temperature={1}
      />
    </Box>
  );
};

export default ChatSidebar;
