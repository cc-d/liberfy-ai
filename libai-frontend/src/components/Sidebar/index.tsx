import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  Typography,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  List,
  IconButton,
} from "@mui/material";
import {
  ThreeP,
  ExpandMore,
  Menu

} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "./CompListElem";
import NewCompModal from "./NewCompModal";
import { DBComp, DBChat, DBUser } from "../../api";

interface ChatSidebarProps {
  chat: DBChat | null;
  user: DBUser;
  addCompletion: (completion: DBComp) => void;
  activeCompId: number | null;
  setActiveCompId;
  getCompFromId: (id: number) => DBComp | null;
  handleCompModalOpen: () => void;
  handleCompModalClose: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  showCompModal: boolean;
  setChat: (chat: DBChat | null) => void;
}

export const drawerWidth = 240;

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chat, user, addCompletion, activeCompId,
  setActiveCompId, handleCompModalOpen, handleCompModalClose,
  showCompModal, toggleSidebar, isSidebarOpen, setChat, getCompFromId,
}) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const loc = useLocation();

  const chatPageRE = /\/chat\/\d+\/?/;
  const chatListPageRE = /\/chats\/?$/;

  useEffect(() => {
    if (!chatPageRE.test(loc.pathname)) {
      setChat(null)
    }
  }, [loc.pathname])


  return (
    <>
      {chat && chat.id && (
        <NewCompModal
          open={showCompModal} // Control the modal open state
          handleClose={handleCompModalClose}
          addCompletion={addCompletion}
          chat_id={chat.id}
          user_id={user.id}
          temperature={1} // Or whatever temperature value you need
        />
      )
      }

      <Drawer
        variant="temporary"
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      > {user && chat && (
        <Box
          display="flex"
          flexDirection="row"
          sx={{ p: 0, width: '100%', alignItems: 'center', gap: 0.5 }}
        >
          <ThreeP
            sx={{
              fontSize: theme.typography.h5.fontSize,

            }}
          />
          <Typography
            fontSize={theme.typography.h5.fontSize}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block',
            }}
          >
            {chat?.name}
          </Typography>
        </Box>
      )}

        {chat && chat.completions ? (
          <Accordion disableGutters defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="body1">Completions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
                variant="contained"
                onClick={handleCompModalOpen} // Open the modal
                sx={{ mt: -1, mb: 1, width: '100%' }}
                size="small"
              >
                New
              </Button>
              <Divider />
              <List dense={true}>
                {chat.completions.length > 0 &&
                  chat.completions.map((completion) => (
                    <CompListElem
                      key={completion.id}
                      completion={completion}
                      theme={theme}
                      setActiveCompId={setActiveCompId}
                    />
                  ))
                }
              </List>
            </AccordionDetails>
          </Accordion>
        ) : (
          <Typography variant="body1">
            Select a chat to view completions
          </Typography>
        )
        }

      </Drawer>
    </>
  );
};

export default ChatSidebar;
