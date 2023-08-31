package com.chatgpt.services;

import com.chatgpt.entity.CreateMessageRequest;
import com.chatgpt.entity.History;
import com.chatgpt.entity.Message;
import com.chatgpt.repositories.HistoryRepository;
import com.chatgpt.repositories.MessageRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
public class MessageService {
    @Autowired
    UserService userService;

    @Autowired
    HistoryRepository historyRepository;

    @Autowired
    MessageRepository messageRepository;

   public Message createMessage(String vkUserId, CreateMessageRequest createMessageRequest) throws Exception {
        var history = historyRepository.findById(createMessageRequest.getHistoryId());
        if (history.isEmpty()) throw new Exception("Not a found");

       checkHistory(vkUserId, createMessageRequest.getHistoryId());

        var message = new Message(
                history.get(),
                createMessageRequest.getContent(),
                createMessageRequest.getRole(),
                createMessageRequest.isError(),
                createMessageRequest.isFailedModeration(),
                createMessageRequest.getLastUpdated(),
                createMessageRequest.isInLocal()

        );

        history.get().setLastMessage(message.getContent());
        history.get().setLastUpdated(createMessageRequest.getLastUpdated());


        messageRepository.save(message);

        return message;

    }

    public Iterable<Message> getMessagesByHistoryId(String vkUserId, UUID historyId) {
        checkHistory(vkUserId, historyId);

        return messageRepository.findAllByHistoryIdOrderByCreatedAtAsc(historyId);
    }


    public Pair<String, String> getJSONExportData(String vkUserId, UUID historyId) throws JsonProcessingException {
        var history = historyRepository.findById(historyId);
        if (history.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        var messages = getMessagesByHistoryId(vkUserId, historyId);

        ObjectMapper mapper = new ObjectMapper();
        String formattedJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(messages);

        return Pair.of(formattedJson, getFileName(history.get(), "json"));
    }


    public Pair<String, String> getTXTExportData(String vkUserId, UUID historyId) {
        var history = historyRepository.findById(historyId);
        if (history.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");

        var messages = getMessagesByHistoryId(vkUserId, historyId).iterator();

        StringBuilder text = new StringBuilder();

        while (messages.hasNext()) {
            var message = messages.next();
            text.append(message.getRole()).append("\n\n").append(message.getContent()).append("\n\n");
        }

        return Pair.of(text.toString(), getFileName(history.get(), "txt"));
    }

    private String getFileName(History history, String type) {
       return history.getType() + " " + history.getLastUpdated() + "." + type;
    }

    private void checkHistory(String vkUserId, UUID historyId) {
        var user = userService.getOrCreateVkUser(vkUserId);
        var foundHistory = historyRepository.findById(historyId);

        if (foundHistory.isPresent()) {
            if (user.getId() != foundHistory.get().getVkUser().getId()) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
        }
    }
}
