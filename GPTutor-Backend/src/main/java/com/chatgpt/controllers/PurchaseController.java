package com.chatgpt.controllers;

import com.chatgpt.entity.responses.PurchaseResponse;
import com.chatgpt.services.PurchaseService;
import com.chatgpt.services.SubscriptionsImagesService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
public class PurchaseController {

    @Autowired
    SubscriptionsImagesService subscriptionsImagesService;

    @Autowired
    PurchaseService purchaseService;

    @PostMapping(path = "/purchase")
    public PurchaseResponse<?> getItem(HttpServletRequest request, @RequestParam Map<String, String> allRequestParams) throws Exception {

        for (String name : allRequestParams.keySet()) {
            String value = allRequestParams.get(name);
            System.out.println(name + " : " + value);
        }

        if (
                Objects.equals(allRequestParams.get("notification_type"), "get_subscription") ||
                        Objects.equals(allRequestParams.get("notification_type"), "get_subscription_test")
        ) {
            System.out.println("get_subscription");
            purchaseService.isAccessSig(allRequestParams);

            return new PurchaseResponse<>(purchaseService.getItem(allRequestParams.get("item")));
        }

        if (
                Objects.equals(allRequestParams.get("notification_type"), "get_item") ||
                        Objects.equals(allRequestParams.get("notification_type"), "get_item_test")
        ) {
            System.out.println("get_item");
            purchaseService.isAccessSig(allRequestParams);

            return new PurchaseResponse<>(purchaseService.getItem(allRequestParams.get("item")));
        }

        if (
                Objects.equals(allRequestParams.get("notification_type"), "subscription_status_change") ||
                        Objects.equals(allRequestParams.get("notification_type"), "subscription_status_change_test")
        ) {
            purchaseService.isAccessSig(allRequestParams);

            request.setAttribute("vkAppId", allRequestParams.get("app_id"));

            System.out.println(allRequestParams.get("app_id"));
            System.out.println("subscription_status_change");

            return new PurchaseResponse<>(subscriptionsImagesService.subscriptionStatusChange(allRequestParams));
        }

        if (
                Objects.equals(allRequestParams.get("notification_type"), "order_status_change") ||
                        Objects.equals(allRequestParams.get("notification_type"), "order_status_change_test")
        ) {
            purchaseService.isAccessSig(allRequestParams);

            request.setAttribute("vkAppId", allRequestParams.get("app_id"));
            request.setAttribute("isTG", false);
            request.setAttribute("vkUserId", allRequestParams.get("user_id"));

            return new PurchaseResponse<>(subscriptionsImagesService.orderStatusChange(allRequestParams));
        }

        return null;
    }

    @GetMapping(path = "/purchase/subscription/{subscriptionName}")
    public ResponseEntity<?> getSubscription(HttpServletRequest request, @PathVariable("subscriptionName") String subscriptionName) {
        return ResponseEntity.ok(subscriptionsImagesService.getSubscription(
                        (String) request.getAttribute("vkUserId"), subscriptionName
                )
        );
    }

    @PostMapping(path = "/purchase/update-subscriptions/{subscriptionName}")
    public ResponseEntity<?> updateSubscription(HttpServletRequest request, @PathVariable("subscriptionName") String subscriptionName) {
        return ResponseEntity.ok(subscriptionsImagesService.updateSubscription(
                        (String) request.getAttribute("vkUserId"), subscriptionName
                )
        );
    }

}
