import React, {useState} from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Drawer,
  Button,
  Divider,
  List,
  useMediaQuery,
  Typography,
} from "@mui/material";
import {
  AddBox, Chat, ThreeP, ThreePOutlined, ExpandMore
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "./CompListElem";
import NewCompModal from "./NewCompModal";
import { DBComp, DBChat, DBUser } from "../../../api";
import { useSidebarContext } from '../../../App/SidebarContext';


interface ChatSidebarProps {
  chat: DBChat;
  user: DBUser;
  addCompletion: (completion: DBComp) => void;
  completions: DBComp[];
  activeComp: DBComp | null;
  setActiveComp: (completion: DBComp | null) => void;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}

export const drawerWidth = 240;

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chat, user, addCompletion, completions, activeComp,
  setActiveComp, handleModalOpen, handleModalClose
}) => {
  const theme = useTheme();
  const { isSidebarOpen, toggleSidebar, isSmallDevice } = useSidebarContext();
  const [showNewCompModal, setShowNewCompModal] = useState(false);

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
        sx={{ p: 0 }}
      >
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
                {chat.name}
              </Typography>

              <Accordion disableGutters >
          <AccordionSummary
            expandIcon={<ExpandMore />}
          >
            <Typography variant="body1">Completions</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Button
              variant="contained"
              startIcon={<AddBox />}
              onClick={() => handleModalOpen()} // Open the modal
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
      </Box>
    </Drawer>
  );
};

export default ChatSidebar;
