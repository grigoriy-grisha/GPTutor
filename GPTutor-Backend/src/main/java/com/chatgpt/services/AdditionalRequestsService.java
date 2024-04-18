package com.chatgpt.services;

import com.chatgpt.entity.VkUser;
import com.chatgpt.entity.database.AdditionalRequests;
import com.chatgpt.entity.requests.CreateAdditionalRequest;
import com.chatgpt.entity.requests.UpdateAdditionalRequest;
import com.chatgpt.repositories.AdditionalRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class AdditionalRequestsService {
    @Autowired
    UserService userService;

    @Autowired
    AdditionalRequestRepository additionalRequestRepository;

    public AdditionalRequests createAdditionalRequest(String vkUserId, CreateAdditionalRequest createAdditionalRequest) {
        var user = userService.getOrCreateVkUser(vkUserId);
        return saveAdditionalRequest(
                user,
                createAdditionalRequest.getTitle(),
                createAdditionalRequest.getMessage(),
                createAdditionalRequest.getActive()
        );
    }


    public List<AdditionalRequests> getAdditionalRequest(String vkUserId) {
        var user = userService.getOrCreateVkUser(vkUserId);
        var additionalRequests = additionalRequestRepository.findAllByVkUserId(user.getId());

        if (additionalRequests.isEmpty()) {
            saveAdditionalRequest(user, "Eще", "Eще", true);
            saveAdditionalRequest(user, "Продолжи, где остановился", "Продолжи, где остановился", true);
            return additionalRequestRepository.findAllByVkUserId(user.getId());
        }

        return additionalRequests;
    }

    public void deleteAdditionalRequest(String vkUserId, UUID additionalRequestId) {
        var user = userService.getOrCreateVkUser(vkUserId);
        var foundAdditionalRequest = additionalRequestRepository.findById(additionalRequestId);

        foundAdditionalRequest.ifPresent(additionalRequest -> checkAccess(user, additionalRequest));

        additionalRequestRepository.deleteById(additionalRequestId);
    }

    public void updateAdditionalRequest(String vkUserId, UpdateAdditionalRequest updateAdditionalRequest) {
        var user = userService.getOrCreateVkUser(vkUserId);
        var foundAdditionalRequest = additionalRequestRepository.findById(updateAdditionalRequest.getId());

        foundAdditionalRequest.ifPresent(additionalRequest -> {
            checkAccess(user, additionalRequest);

            additionalRequest.setMessage(updateAdditionalRequest.getMessage());
            additionalRequest.setActive(updateAdditionalRequest.getActive());
            additionalRequest.setTitle(updateAdditionalRequest.getTitle());

            additionalRequestRepository.save(additionalRequest);
        });
    }


    private void checkAccess(VkUser user, AdditionalRequests additionalRequest) {
        if (user.getId() != additionalRequest.getVkUser().getId()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }


    private AdditionalRequests saveAdditionalRequest(VkUser user, String title, String message, Boolean isActive) {
        var additionalRequest = new AdditionalRequests();

        additionalRequest.setVkUser(user);
        additionalRequest.setMessage(message);
        additionalRequest.setActive(isActive);
        additionalRequest.setTitle(title);

        System.out.println(additionalRequest);

        additionalRequestRepository.save(additionalRequest);

        return additionalRequest;
    }

}
