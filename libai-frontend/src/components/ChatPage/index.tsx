import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apios from "../../apios";
import {
  BaseMsg,
  DataCreateChat, DataCreateComp, DataMsgAdd,
  DBComp, DBMsg, DBUserWithToken, DBChat
} from "../../api";
import { useAuthContext } from "../../AuthContext";
import {
  Button,
  Container,
  Typography,
  List,
  Divider,
  Box,
  Grid,
} from "@mui/material";
import {
  AddCircleOutline, Chat, CommentOutlined, Comment, ExpandMore,
  ThreeP, AddBox
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "./CompListElem";
import NewCompModal from "./NewCompModal";
import ChatSidebar, {drawerWidth} from "../Sidebar";
import CompMsgElem from "./CompMsgElem";

const ChatPage = () => {
  const { user } = useAuthContext();
  const { chatId } = useParams<{ chatId: string }>();
  const [chat, setChat] = useState<DBChat | null>(null);
  const [completions, setCompletions] = useState<DBComp[]>([]);
  const [activeComp, setActiveComp] = useState<DBComp | null>(null);
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();
  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const addCompletion = (completion: DBComp) => {
    setCompletions([...completions, completion]);
  }

  useEffect(() => {
    apios.get(`/chat/${chatId}`).then((response) => {
      setChat(response.data);
      setCompletions(response.data.completions);
    });
  }, [user, chatId, setChat, setCompletions]);

  if (!chat) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xl" disableGutters>
      {user && user.id &&
        <Box>
            <ChatSidebar
              chat={chat}
              user={user}
              addCompletion={addCompletion}
              completions={completions}
              activeComp={activeComp}
              setActiveComp={setActiveComp}
            />

            <Box display='flex' alignItems='center'>
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

            </Box>

            <Box display='flex' alignItems='center' mb={0.5}>
              <CommentOutlined sx={{ mr: 0.5 }} />
              <Typography variant="body1">Messages</Typography>
              <Button
                variant="contained"
                startIcon={<AddBox />}
                sx={{ ml: 2 }}
                size="small"
              >
                Add
              </Button>
            </Box>
            <Divider />
            {
            activeComp && activeComp.messages &&
            activeComp.messages.map((msg) => (


                <CompMsgElem message={msg} />

            ))
          }
        </Box>
      }

    </Container>
  );
};

export default ChatPage;
