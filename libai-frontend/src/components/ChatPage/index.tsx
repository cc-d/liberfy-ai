import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apios from "../../apios";
import { BaseChat, BaseCompletion } from "../../api";
import { useAuthContext } from "../../AuthContext";
import { useChatContext } from "./ChatContext";
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
import ChatSidebar from "./Sidebar";
import CompMsgElem from "./CompMsgElem";

const ChatPage = () => {
  const { user } = useAuthContext();
  const { chatId } = useParams<{ chatId: string }>();
  const [chat, setChat] = useState<BaseChat | null>(null);
  const [completions, setCompletions] = useState<BaseCompletion[]>([]);
  const [activeComp, setActiveComp] = useState<BaseCompletion | null>(null);
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();
  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const addCompletion = (completion: BaseCompletion) => {
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
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <ChatSidebar
              chat={chat}
              user={user}
              addCompletion={addCompletion}
              completions={completions}
              activeComp={activeComp}
              setActiveComp={setActiveComp}
            />
          </Grid>
          <Grid item xs={8}>
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
            {activeComp && activeComp.messages && activeComp.messages.length > 0 &&
            activeComp.messages.map((msg) => (
              <CompMsgElem key={msg.id} message={msg} />
            ))
          }
          </Grid>
        </Grid>
      }
    </Container>
  );
};

export default ChatPage;
