import React, { useState } from 'react';
import { BaseCompletion, BaseChat, BaseMessage, OldBaseUser } from "../../../api";
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
  AddCommentOutlined, AddBox,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "../CompListElem";
import NewCompModal from "../NewCompModal";


