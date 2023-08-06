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
import CompListElem from "../CompListElem";
import NewCompModal from "../NewCompModal";
import { DBComp, DBChat, DBUser } from "../../../api";

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
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(true); // Declare drawerOpen state

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen); // Toggle the drawer's open state
  };


  return (
    <Drawer
      variant={matches ? "temporary" : "permanent"}
      open={drawerOpen}
      onClose={toggleDrawer}
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
