import axiosInstance from "@/lib/axiosInstance";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface SendMessagePayload {
  message: string;
  sessionId?: string;
}

export interface SendMessageResponse {
  reply: ChatMessage;
  sessionId: string;
}

/* ─── Service functions ──────────────────────────────────────────── */

/** GET /api/chat/history?sessionId=... */
export const getChatHistory = async (
  sessionId: string,
): Promise<ChatMessage[]> => {
  const { data } = await axiosInstance.get<ChatMessage[]>("/api/chat/history", {
    params: { sessionId },
  });
  return data;
};

/** POST /api/chat/send */
export const sendMessage = async (
  payload: SendMessagePayload,
): Promise<SendMessageResponse> => {
  const { data } = await axiosInstance.post<SendMessageResponse>(
    "/api/chat/send",
    payload,
  );
  return data;
};
