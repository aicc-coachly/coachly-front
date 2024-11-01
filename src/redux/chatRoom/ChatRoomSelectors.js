// 모든 채팅방 목록 선택자
export const SelectAllChatRooms = (state) => state.chatRoom.chatRoomList;

// 선택된 채팅방 선택자
export const SelectChatRoomById = (state) => state.chatRoom.selectedChatRoom;

// 채팅방 로딩 상태 선택자
export const SelectChatRoomStatus = (state) => state.chatRoom.status;

// 채팅방 관련 오류 선택자
export const SelectChatRoomError = (state) => state.chatRoom.error;
