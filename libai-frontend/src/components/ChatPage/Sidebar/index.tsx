import React, { useState } from 'react';
import { BaseCompletion, BaseChat, BaseMessage, BaseUser } from "../../../api";
import { useChatContext } from "../ChatContext";
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
import {
  AddCircleOutline, ExpandMore,
  QuestionAnswer, QuestionAnswerOutlined,
  ModeComment, AddComment, Comment, CommentOutlined,
  AddCommentOutlined, AddBox, Chat
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "../CompListElem";
import NewCompModal from "../NewCompModal";

interface ChatSidebarProps {
  chat: BaseChat;
  user: BaseUser;
  addCompletion: (completion: BaseCompletion) => void;
  completions: BaseCompletion[];
  activeComp: BaseCompletion | null;
  setActiveComp: (completion: BaseCompletion | null) => void;
}

const drawerWidth = 240;

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chat, user, addCompletion, completions, activeComp,
  setActiveComp,
}) => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  return (
    <Box>

      <Accordion defaultExpanded disableGutters={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="completions-content"
          id="completions-header"
        >

          <QuestionAnswerOutlined sx={{ mr: 0.5 }} />
          <Typography sx={{}} variant="body1">Completions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column">
            <Button
              variant="contained"
              startIcon={<AddBox />}
              onClick={handleModalOpen}
              sx={{ mt: -1, mb: 1 }}
              size="small"
            >
              New
            </Button>

            <Divider />

            <List dense={true}>
              {completions.length > 0 &&
                completions.map((completion) => (
                  <CompListElem
                    key={completion.id}
                    completion={completion}
                    theme={theme}
                    setActiveComp={setActiveComp}
                  />
                ))
                }
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>



      {chat && chat.id && user && user.id &&
        <NewCompModal
          open={showModal}
          handleClose={handleModalClose}
          addCompletion={addCompletion}
          chat_id={chat.id}
          user_id={user.id}
          temperature={1}
        />
      }
    </Box>
  );
};

export default ChatSidebar;
