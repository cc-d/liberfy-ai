import React, {useState} from 'react';
import {
  Box,
  Drawer,
  Button,
  Divider,
  List,
  useMediaQuery,
} from "@mui/material";
import {
  AddBox, Chat
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "../ChatPage/CompListElem";
import NewCompModal from "../ChatPage/NewCompModal";
import { DBComp, DBChat, DBUser } from "../../api";
import { useSidebarContext } from '../../App';

interface ChatSidebarProps {
  chat: DBChat;
  user: DBUser;
  addCompletion: (completion: DBComp) => void;
  completions: DBComp[];
  activeComp: DBComp | null;
  setActiveComp: (completion: DBComp | null) => void;
}

export const drawerWidth = 240;

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chat, user, addCompletion, completions, activeComp,
  setActiveComp,
}) => {
  const theme = useTheme();
  const { isSidebarOpen, toggleSidebar, isSmallDevice } = useSidebarContext();

  return (
    <Drawer
      variant={isSmallDevice ? "temporary" : "permanent"}
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
    >
      <Box
        display="flex"
        flexDirection="column"
        sx={{ p: 2 }}
      >
        <Button
          variant="contained"
          startIcon={<AddBox />}
          onClick={() => setActiveComp(null)}
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
    </Drawer>
  );
};

export default ChatSidebar;
