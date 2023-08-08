import React from 'react';
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
} from "@mui/material";
import {
  ThreeP,
  ExpandMore,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "./CompListElem";
import NewCompModal from "./NewCompModal";
import { DBComp, DBChat, DBUser } from "../../api";

interface ChatSidebarProps {
  chat: DBChat | null;
  user: DBUser;
  addCompletion: (completion: DBComp) => void;
  completions: DBComp[];
  activeComp: DBComp | null;
  setActiveComp: (completion: DBComp | null) => void;
  handleCompModalOpen: () => void;
  handleCompModalClose: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  showCompModal: boolean;
}

export const drawerWidth = 240;

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chat, user, addCompletion, completions, activeComp,
  setActiveComp, handleCompModalOpen, handleCompModalClose,
  showCompModal, toggleSidebar, isSidebarOpen,
}) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));



  return (
    <>
      { chat && chat.id && (
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
      variant={isSmallDevice ? "temporary" : "permanent"}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        sx={{ p: 0 }}
      >
        {user && (
          <Typography
            fontSize={theme.typography.h5.fontSize}
            display={'inline-block'}
          >
            <ThreeP
              sx={{
                fontSize: theme.typography.h5.fontSize,
                verticalAlign: "middle",
                mr: 0.5,
              }}
            />
            {user.email}
          </Typography>
        )}

        <Typography variant="h6">
          {chat ? chat.name : 'Select Chat'}
        </Typography>

        {chat && completions && (
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
            </AccordionDetails>
          </Accordion>
        )}
      </Box>
    </Drawer>
    </>
  );
};

export default ChatSidebar;
