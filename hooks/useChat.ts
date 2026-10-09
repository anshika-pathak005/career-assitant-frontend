import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  getChatHistory,
  sendMessage,
  SendMessagePayload,
  ChatMessage,
} from "@/services/chatService";

export const CHAT_QUERY_KEY = (sessionId: string) =>
  ["chat", "history", sessionId] as const;

/**
 * useChat -manages chat session state, history fetching, and message sending.
 */
export const useChat = () => {
  const queryClient = useQueryClient();
  const [sessionId, setSessionId] = useState<string>("");

  /* Fetch chat history (only when sessionId is present) */
  const historyQuery = useQuery({
    queryKey: CHAT_QUERY_KEY(sessionId),
    queryFn: () => getChatHistory(sessionId),
    enabled: !!sessionId,
  });

  /* Send a message */
  const sendMutation = useMutation<
    Awaited<ReturnType<typeof sendMessage>>,
    Error,
    SendMessagePayload
  >({
    mutationFn: sendMessage,
    onSuccess: ({ reply, sessionId: newSessionId }) => {
      // Persist sessionId returned by the backend
      if (!sessionId) setSessionId(newSessionId);

      // Optimistically append reply to cache
      queryClient.setQueryData<ChatMessage[]>(
        CHAT_QUERY_KEY(newSessionId),
        (prev = []) => [...prev, reply],
      );
    },
    onError: () => toast.error("Failed to send message. Please try again."),
  });

  return {
    sessionId,
    messages: historyQuery.data ?? [],
    isLoading: historyQuery.isLoading,
    isSending: sendMutation.isPending,
    sendMessage: (message: string) =>
      sendMutation.mutate({ message, sessionId: sessionId || undefined }),
  };
};
