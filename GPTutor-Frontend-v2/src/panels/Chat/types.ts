import { MessageModel } from "./models";
import { UserViewModel } from "../../viewModels/UserViewModel";

/**
 * Типы для компонентов чата
 */

export interface ChatHeaderProps {
  isTyping: boolean;
  onBack: () => void;
  currentModel: string;
}

export interface MessageListProps {
  messages: MessageModel[];
  userViewModel: UserViewModel;
  getUserName: () => string;
  onCopyMessage: (text: string) => void;
  onStartChat: () => void;
}

export interface MessageItemProps {
  message: MessageModel;
  userViewModel: UserViewModel;
  getUserName: () => string;
  onCopyMessage: (text: string) => void;
}

export interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  disabled?: boolean;
  currentModel: string;
  onModelSelect: () => void;
  onClearMessages: () => void;
}
